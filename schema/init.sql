CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE chamas (
    chama_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chama_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mpesa_transactions (
    transaction_id VARCHAR(50) PRIMARY KEY,
    chama_id UUID REFERENCES chamas(chama_id),
    transaction_date TIMESTAMP NOT NULL,
    completed_against_name VARCHAR(255),
    amount DECIMAL(10, 2) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL
);
