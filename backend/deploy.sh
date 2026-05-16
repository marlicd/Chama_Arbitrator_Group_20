#!/bin/bash
# Deployment script for the Chama Arbitrator extension backend

PROJECT_ID="chama-ai-cordinator"
REGION="europe-west1"
SERVICE_NAME="chama-auditor-api"

echo "Building and pushing docker image to GCR..."
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME

echo "Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars DB_HOST="34.53.190.29",DB_NAME="chama_db",DB_USER="postgres",DB_PASS="SuperSecretPassword!23" \
  --project $PROJECT_ID

echo "Deployment finished. Copy the deployed Service URL to use as your Agent extension."
