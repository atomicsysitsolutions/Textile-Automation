from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import re
from sklearn.preprocessing import OneHotEncoder, MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
from textblob import TextBlob
import pyodbc
from sqlalchemy import create_engine, MetaData, Table, select, update
from sqlalchemy.orm import scoped_session, sessionmaker
from connection import conn_str
app = Flask(__name__)
data = pd.read_excel(r"Clean_data.xlsx")


potential_numeric_columns = ['GSM(Gram/Sqmeter)', 'MinOrder', 'Price']


def extract_numeric(value):
    if not isinstance(value, str):
        return None
    numbers = re.findall(r'\d+\.?\d*', value)
    numbers = [float(num) for num in numbers]
    return np.mean(numbers) if numbers else None


for col in potential_numeric_columns:
    data[col + '_Numeric'] = data[col].apply(extract_numeric)

numeric_data = data[[col + '_Numeric' for col in potential_numeric_columns]]
numeric_data_filled = numeric_data.fillna(numeric_data.mean())


categorical_columns = ['MaterialComposition', 'Fabrictype', 'Weavetype', 'ExportMarket', 'DeliveryTime']
data[categorical_columns] = data[categorical_columns].astype(str)


one_hot_encoder = OneHotEncoder(handle_unknown='ignore')
encoded_data = one_hot_encoder.fit_transform(data[categorical_columns])


min_max_scaler = MinMaxScaler()
scaled_numeric_data = min_max_scaler.fit_transform(numeric_data_filled)


final_processed_data = np.hstack((encoded_data.toarray(), scaled_numeric_data))


def process_user_input_v2(user_input, one_hot_encoder, min_max_scaler, potential_numeric_columns):
    user_input_df = pd.DataFrame([user_input])
    for col in potential_numeric_columns:
        user_input_df[col + '_Numeric'] = extract_numeric(user_input.get(col, ""))

        user_input_df[col + '_Numeric'] = user_input_df[col + '_Numeric'].fillna(numeric_data_filled[col + '_Numeric'].mean())
    encoded_categorical_data = one_hot_encoder.transform(user_input_df[categorical_columns]).toarray()
    numeric_columns = [col + '_Numeric' for col in potential_numeric_columns]
    scaled_numeric_data = min_max_scaler.transform(user_input_df[numeric_columns])
    processed_input = np.hstack((encoded_categorical_data, scaled_numeric_data))
    return processed_input


def recommend_products(processed_input, dataset, top_n=10):
    similarity_scores = cosine_similarity(processed_input, dataset)
    top_indices = np.argsort(similarity_scores[0])[::-1][:top_n]
    return top_indices


def display_recommendation_details(top_indices, dataset, original_data):
    recommended_products_details = original_data.iloc[top_indices]
    columns_to_display = ['Fabrictype', 'GSM(Gram/Sqmeter)', 'MaterialComposition', 'Title', 'Weavetype']
    return recommended_products_details[columns_to_display]



# example_user_input = {
#     'MaterialComposition': '100%Polyester',
#     'Fabrictype': 'Dyed',
#     'Weavetype': 'Plain',
#     'MinOrder': '50000Meters',
#     'ExportMarket': 'Worldwide',
#     'DeliveryTime': '7-15WorkingDays',
#     'Price': '0.3USD/Meters.'
# }

@app.route('/recommend', methods=['POST'])
def recommend():
    user_input = request.json

    # Validate required fields
    required_fields = ['MaterialComposition', 'Fabrictype', 'Weavetype', 'MinOrder', 'ExportMarket', 'DeliveryTime',
                       'Price']
    missing_fields = [field for field in required_fields if field not in user_input]
    if missing_fields:
        return jsonify({'error': 'Missing required fields', 'missing_fields': missing_fields}), 400

    # Continue with processing if all required fields are present
    processed_user_input = process_user_input_v2(user_input, one_hot_encoder, min_max_scaler, potential_numeric_columns)
    top_recommendations = recommend_products(processed_user_input, final_processed_data)
    recommended_products_details = display_recommendation_details(top_recommendations, final_processed_data, data)

    response = jsonify(recommended_products_details.to_dict('records'))
    response.headers['Content-Type'] = 'application/json'
    return response


@app.route('/analyze-sentiments', methods=['POST'])
def analyze_sentiments():
    # Establish a connection to the database
    conn = pyodbc.connect(conn_str)
    cursor = conn.cursor()

    # Fetch reviews where the Outcome is NULL
    cursor.execute("SELECT ReviewId, ReviewText FROM Reviews WHERE ReviewSentiment IS NULL")
    reviews = cursor.fetchall()

    # Iterate over the fetched reviews
    for review in reviews:
        review_id, review_text = review

        # Perform sentiment analysis on the review text
        blob = TextBlob(review_text)
        sentiment = 'Positive' if blob.sentiment.polarity > 0 else 'Negative'

        # Update the Outcome column based on the sentiment analysis
        cursor.execute("UPDATE Reviews SET ReviewSentiment = ? WHERE ReviewId = ?", (sentiment, review_id))
        conn.commit()  # Commit the transaction

    # Close the cursor and connection
    cursor.close()
    conn.close()

    return jsonify({"message": "Sentiment analysis completed and outcomes updated."})






if __name__ == '__main__':
    app.run(debug=True)