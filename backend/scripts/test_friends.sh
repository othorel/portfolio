#!/bin/bash
# scripts/test_friends.sh

BASE_URL="http://localhost:4000"
EMAIL="toto@test.com"
PASSWORD="1234"

echo "🔑 Login pour récupérer un token..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
echo "✅ Token: $TOKEN"

# Crée un deuxième utilisateur pour tester l'amitié
echo "👤 Création de l'utilisateur 2 (tata)..."
CREATE_RESPONSE=$(curl -s -X POST "$BASE_URL/users" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"login":"tata","email":"tata@test.com","password":"1234"}')

USER2_ID=$(echo $CREATE_RESPONSE | jq -r '.user.id // empty')

# Si l'utilisateur existe déjà, récupère l'ID depuis l'API
if [ -z "$USER2_ID" ]; then
  USER2_ID=$(curl -s -X GET "$BASE_URL/users/email/tata@test.com" \
    -H "Authorization: Bearer $TOKEN" | jq -r '.user.id')
fi

echo "✅ User2 ID: $USER2_ID"

# Ajouter l'ami
echo "➕ Ajout d'un ami (user 1 ajoute user 2)..."
curl -s -X POST "$BASE_URL/friends/add" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"userId\":1,\"friendId\":$USER2_ID}" | jq

# Récupérer la liste des amis
echo "👥 Liste des amis de user 1..."
curl -s -X GET "$BASE_URL/friends/1" \
  -H "Authorization: Bearer $TOKEN" | jq

# Supprimer l'ami
echo "➖ Suppression de l'ami (user 1 supprime user 2)..."
curl -s -X POST "$BASE_URL/friends/remove" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"userId\":1,\"friendId\":$USER2_ID}" | jq
