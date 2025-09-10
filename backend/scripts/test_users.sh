#!/bin/bash
set -e

BASE_URL="http://localhost:4000"

# 1) Login pour récupérer le token
echo "🔑 Logging in..."
TOKEN=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "toto@test.com",
    "password": "1234"
  }' | jq -r '.token')

if [ "$TOKEN" == "null" ]; then
  echo "❌ Impossible de récupérer le token"
  exit 1
fi

echo "✅ Token récupéré: $TOKEN"

# 2) GET all users
echo -e "\n👥 Liste des utilisateurs:"
curl -s -X GET $BASE_URL/users \
  -H "Authorization: Bearer $TOKEN" | jq

# 3) GET user by email
echo -e "\n📧 Récupération de toto@test.com:"
curl -s -X GET "$BASE_URL/users/email/toto@test.com" \
  -H "Authorization: Bearer $TOKEN" | jq

# 4) Update avatar
echo -e "\n🖼️ Update avatar user 1:"
curl -s -X PUT $BASE_URL/users/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"avatar": "https://example.com/avatar.png"}' | jq

# 5) Delete user (⚠️ attention)
# echo -e "\n🗑️ Suppression user 1:"
# curl -s -X DELETE $BASE_URL/users/1 \
#   -H "Authorization: Bearer $TOKEN" | jq
