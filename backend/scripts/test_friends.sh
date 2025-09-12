#!/bin/bash
# scripts/test_friends.sh
# Test complet du système d'amis avec JWT

BASE_URL="http://localhost:4000"

# Infos utilisateurs
USER1_EMAIL="toto@test.com"
USER1_PASSWORD="66shireS@kura66"
USER1_LOGIN="toto"

USER2_EMAIL="tata@test.com"
USER2_PASSWORD="66shireS@kura66"
USER2_LOGIN="tata"

# --- Création / récupération des utilisateurs ---

echo "👤 Création ou récupération de l'utilisateur 1..."
CREATE_USER1=$(curl -s -X POST "$BASE_URL/users" \
  -H "Content-Type: application/json" \
  -d "{\"login\":\"$USER1_LOGIN\",\"email\":\"$USER1_EMAIL\",\"password\":\"$USER1_PASSWORD\"}")

USER1_ID=$(echo $CREATE_USER1 | jq -r '.user.id // empty')
if [ -z "$USER1_ID" ]; then
  USER1_ID=$(curl -s -X GET "$BASE_URL/users/email/$USER1_EMAIL" \
    -H "Content-Type: application/json" | jq -r '.user.id')
fi
echo "✅ User1 ID: $USER1_ID"

echo "👤 Création ou récupération de l'utilisateur 2..."
CREATE_USER2=$(curl -s -X POST "$BASE_URL/users" \
  -H "Content-Type: application/json" \
  -d "{\"login\":\"$USER2_LOGIN\",\"email\":\"$USER2_EMAIL\",\"password\":\"$USER2_PASSWORD\"}")

USER2_ID=$(echo $CREATE_USER2 | jq -r '.user.id // empty')
if [ -z "$USER2_ID" ]; then
  USER2_ID=$(curl -s -X GET "$BASE_URL/users/email/$USER2_EMAIL" \
    -H "Content-Type: application/json" | jq -r '.user.id')
fi
echo "✅ User2 ID: $USER2_ID"

# --- Login pour récupérer le token de l'utilisateur 1 ---
echo "🔑 Login de l'utilisateur 1 pour obtenir un token..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$USER1_EMAIL\",\"password\":\"$USER1_PASSWORD\"}")

TOKEN_USER1=$(echo $LOGIN_RESPONSE | jq -r '.token')
echo "✅ Token utilisateur 1: $TOKEN_USER1"

# --- Login pour récupérer le token de l'utilisateur 2 ---
echo "🔑 Login de l'utilisateur 2 pour obtenir un token..."
LOGIN_RESPONSE2=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$USER2_EMAIL\",\"password\":\"$USER2_PASSWORD\"}")

TOKEN_USER2=$(echo $LOGIN_RESPONSE2 | jq -r '.token')
echo "✅ Token utilisateur 2: $TOKEN_USER2"

# --- Test d'ajout d'amis ---
echo "➕ User1 ajoute User2 en ami..."
curl -s -X POST "$BASE_URL/friends/add" \
  -H "Authorization: Bearer $TOKEN_USER1" \
  -H "Content-Type: application/json" \
  -d "{\"friendLogin\":\"$USER2_LOGIN\"}" | jq

# --- Vérification des demandes en attente pour User2 ---
echo "📨 Demandes en attente pour User2..."
curl -s -X GET "$BASE_URL/friends/requests" \
  -H "Authorization: Bearer $TOKEN_USER2" | jq

# --- User2 accepte la demande ---
echo "✅ User2 accepte la demande..."
curl -s -X POST "$BASE_URL/friends/accept" \
  -H "Authorization: Bearer $TOKEN_USER2" \
  -H "Content-Type: application/json" \
  -d "{\"friendId\":$USER1_ID}" | jq

# --- Vérification des amis ---
echo "👥 Liste des amis de User1..."
curl -s -X GET "$BASE_URL/friends" \
  -H "Authorization: Bearer $TOKEN_USER1" | jq

echo "👥 Liste des amis de User2..."
curl -s -X GET "$BASE_URL/friends" \
  -H "Authorization: Bearer $TOKEN_USER2" | jq

# --- Suppression de l'ami ---
echo "➖ User1 supprime User2..."
curl -s -X POST "$BASE_URL/friends/remove" \
  -H "Authorization: Bearer $TOKEN_USER1" \
  -H "Content-Type: application/json" \
  -d "{\"friendId\":$USER2_ID}" | jq

# --- Vérification après suppression ---
echo "👥 Liste des amis de User1 après suppression..."
curl -s -X GET "$BASE_URL/friends" \
  -H "Authorization: Bearer $TOKEN_USER1" | jq
