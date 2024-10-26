import pyodbc
# Database connection

conn_str = (
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=DESKTOP-EQFEUM2\SQLEXPRESS;"
    "Database=Textile_Tech;"
    "Trusted_Connection=yes;"
    "TrustServerCertificate=yes;"  # Bypass SSL certificate verification
)

# connection = pyodbc.connect(conn_str)
# print("Connected successfully")
# connection.close()