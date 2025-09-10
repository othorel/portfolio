#!/bin/bash

API_URL="http://localhost:4000"

echo "🔑 Test login..."
curl -s -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"toto@test.com","password":"1234"}' | jq .

echo ""
echo "📧 Vérification email existe..."
curl -s -X GET $API_URL/auth/email/toto@test.com | jq .

echo ""
echo "👤 Vérification login existe..."
curl -s -X GET $API_URL/auth/login/toto | jq .
