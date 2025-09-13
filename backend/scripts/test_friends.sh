#!/bin/bash
# scripts/test_friends_clean.sh
# Test complet du système d'amis sur une base propre

BASE_URL="http://localhost:4000"

# Infos utilisateurs
USER1_EMAIL="toto@test.com"
USER1_PASSWORD="66shireS@kura66"
USER1_LOGIN="toto"

USER2_EMAIL="tata@test.com"
USER2_PASSWORD="66shireS@kura66"
USER2_LOGIN="tata"

# --- Création des utilisateurs ---
echo "👤 Création de User1..."
curl -s -X POST "$BASE_URL/users" \
  -H "Content-Type: application/json" \
  -d "{\"login\":\"$USER1_LOGIN\",\"email\":\"$USER1_EMAIL\",\"password\":\"$USER1_PASSWORD\"}" | jq

echo "👤 Création de User2..."
curl -s -X POST "$BASE_URL/users" \
  -H "Content-Type: application/json" \
  -d "{\"login\":\"$USER2_LOGIN\",\"email\":\"$USER2_EMAIL\",\"password\":\"$USER2_PASSWORD\"}" | jq

# --- Login pour récupérer le token ---
echo "🔑 Login User1..."
TOKEN_USER1=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$USER1_EMAIL\",\"password\":\"$USER1_PASSWORD\"}" | jq -r '.token')
echo "Token User1: $TOKEN_USER1"

echo "🔑 Login User2..."
TOKEN_USER2=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$USER2_EMAIL\",\"password\":\"$USER2_PASSWORD\"}" | jq -r '.token')
echo "Token User2: $TOKEN_USER2"

# --- CAS TEST: demande, refus, renvoi ---
echo "➕ User1 ajoute User2 en ami (1ère demande)..."
curl -s -X POST "$BASE_URL/friends/add" \
  -H "Authorization: Bearer $TOKEN_USER1" \
  -H "Content-Type: application/json" \
  -d "{\"friendLogin\":\"$USER2_LOGIN\"}" | jq

echo "❌ User2 refuse la demande..."
curl -s -X PATCH "$BASE_URL/friends/reject" \
  -H "Authorization: Bearer $TOKEN_USER2" \
  -H "Content-Type: application/json" \
  -d "{\"friendLogin\":\"$USER1_LOGIN\"}" | jq

echo "➕ User1 ajoute User2 en ami (après refus)..."
curl -s -X POST "$BASE_URL/friends/add" \
  -H "Authorization: Bearer $TOKEN_USER1" \
  -H "Content-Type: application/json" \
  -d "{\"friendLogin\":\"$USER2_LOGIN\"}" | jq

# --- Vérification des amis pour les deux ---
echo "👥 Liste des amis de User1..."
curl -s -X GET "$BASE_URL/friends" \
  -H "Authorization: Bearer $TOKEN_USER1" | jq

echo "👥 Liste des amis de User2..."
curl -s -X GET "$BASE_URL/friends" \
  -H "Authorization: Bearer $TOKEN_USER2" | jq

# --- Nettoyage final ---
echo "➖ User1 supprime User2..."
curl -s -X DELETE "$BASE_URL/friends/remove" \
  -H "Authorization: Bearer $TOKEN_USER1" \
  -H "Content-Type: application/json" \
  -d "{\"friendLogin\":\"$USER2_LOGIN\"}" | jq

echo "👥 Liste des amis de User1 après suppression..."
curl -s -X GET "$BASE_URL/friends" \
  -H "Authorization: Bearer $TOKEN_USER1" | jq
