#!/bin/bash
# GCP Setup Script for The Chama Dispute Arbitrator

PROJECT_ID="chama-ai-cordinator"
REGION="europe-west1"
SQL_INSTANCE="chama-db-instance"
DB_NAME="chama_db"

echo "Setting project to $PROJECT_ID..."
gcloud config set project $PROJECT_ID

echo "Enabling necessary APIs..."
# We enable Cloud SQL, Cloud Run, Document AI, and Vertex AI
gcloud services enable \
  sqladmin.googleapis.com \
  run.googleapis.com \
  documentai.googleapis.com \
  aiplatform.googleapis.com \
  discoveryengine.googleapis.com

echo "Creating Cloud SQL PostgreSQL instance (this typically takes 5 - 10 minutes)..."
gcloud sql instances create $SQL_INSTANCE \
  --database-version=POSTGRES_15 \
  --cpu=1 \
  --memory=3840MB \
  --region=$REGION \
  --root-password="SuperSecretPassword!23" 

echo "Creating database in Cloud SQL..."
gcloud sql databases create $DB_NAME --instance=$SQL_INSTANCE

echo "Setup complete! Please apply schema/init.sql to your new database."
