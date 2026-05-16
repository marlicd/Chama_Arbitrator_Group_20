from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import asyncpg

app = FastAPI(title="Chama Arbitrator API")

class TransactionVerificationRequest(BaseModel):
    chama_id: str
    transaction_code: str

DB_HOST = os.environ.get("DB_HOST", "localhost")
DB_NAME = os.environ.get("DB_NAME", "chama_db")
DB_USER = os.environ.get("DB_USER", "postgres")
DB_PASS = os.environ.get("DB_PASS", "SuperSecretPassword!23")

async def get_db_pool():
    return await asyncpg.create_pool(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASS
    )

@app.post("/api/v1/audit/verify-transaction")
async def verify_transaction(req: TransactionVerificationRequest):
    try:
        pool = await get_db_pool()
        async with pool.acquire() as conn:
            row = await conn.fetchrow(
                """
                SELECT transaction_id, transaction_date, completed_against_name, amount 
                FROM mpesa_transactions 
                WHERE transaction_id = $1 AND chama_id = $2::uuid
                """,
                req.transaction_code, req.chama_id
            )
        await pool.close()
        
        if row:
            return {
                "status": "found",
                "data": {
                    "transaction_id": row['transaction_id'],
                    "date": str(row['transaction_date']),
                    "sender": row['completed_against_name'],
                    "amount": float(row['amount'])
                }
            }
        
        return {"status": "not_found", "message": "Transaction code not found in records."}
        
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
