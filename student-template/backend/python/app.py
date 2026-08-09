from flask import Flask, jsonify
import os
# TODO: Import your database connector here
import psycopg2

app = Flask(__name__)

# TODO: Configure database connection using os.getenv('DATABASE_URL')
def get_db_connection(): 
    return psycopg2.connect(os.getenv("DATABASE_URL"))

@app.route('/api/inventory/alerts', methods=['GET'])
def get_alerts():
    """
    TODO: Implement this function.
    1. Connect to the database.
    2. Query 'inventory' table where quantity <= reorder_level.
    3. Return JSON list of products.
    """
    # REMOVE THIS LINE AND IMPLEMENT LOGIC
    
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id, product_name, quantity, reorder_level
        FROM inventory
        WHERE quantity <= reorder_level
    """)

    rows = cursor.fetchall()

    alerts = [
        {
            "id": str(row[0]),
            "product_name": row[1],
            "quantity": row[2],
            "reorder_level": row[3]
        }
        for row in rows
    ]

    cursor.close()
    conn.close()
    return jsonify(alerts)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
