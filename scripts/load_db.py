import json
import psycopg2
import os

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_NAME = os.getenv("DB_NAME", "chama_db")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASS = os.getenv("DB_PASS", "SuperSecretPassword!23")

def load_data():
    # Construct the path relative to the script location
    script_dir = os.path.dirname(os.path.abspath(__file__))
    mock_file = os.path.join(script_dir, 'mock_mpesa.json')
    
    with open(mock_file, 'r') as f:
        data = json.load(f)

    # Note: In a real GCP environment, you might use Cloud SQL Auth Proxy
    conn = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASS
    )
    cur = conn.cursor()

    # Pre-insert a dummy chama matching the mock transactions if not exists
    chama_id = data[0]['chama_id']
    cur.execute(
        """
        INSERT INTO chamas (chama_id, chama_name)
        VALUES (%s, %s)
        ON CONFLICT (chama_id) DO NOTHING;
        """,
        (chama_id, "Test Chama Alpha")
    )

    for row in data:
        cur.execute(
            """
            INSERT INTO mpesa_transactions 
            (transaction_id, chama_id, transaction_date, completed_against_name, amount, balance)
            VALUES (%s, %s, %s, %s, %s, %s)
            ON CONFLICT (transaction_id) DO NOTHING;
            """,
            (row['transaction_id'], row['chama_id'], row['transaction_date'],
             row['completed_against_name'], row['amount'], row['balance'])
        )

    conn.commit()
    cur.close()
    conn.close()
    print(f"Successfully loaded {len(data)} mock transactions into database.")

if __name__ == "__main__":
    load_data()
