#!/bin/bash

# -------------------------------
# Script de test complet Signup/Login/API
# -------------------------------

# Variables
API_URL="http://localhost:4000"
EMAIL="test3@test.com"
LOGIN="test3"
PASSWORD="test3"

echo "=============================="
echo "1️⃣ Test Signup"
echo "=============================="
SIGNUP_RESPONSE=$(curl -s -X POST "$API_URL/auth/signup" \
-H "Content-Type: application/json" \
-d "{\"login\":\"$LOGIN\",\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

echo "Réponse Signup : $SIGNUP_RESPONSE"

# Extraire token du signup (optionnel)
SIGNUP_TOKEN=$(echo $SIGNUP_RESPONSE | jq -r '.token')
if [ "$SIGNUP_TOKEN" != "null" ]; then
    echo "Token généré lors du signup : $SIGNUP_TOKEN"
else
    echo "Signup échoué ou token non présent."
fi

echo "=============================="
echo "2️⃣ Test Login"
echo "=============================="
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
-H "Content-Type: application/json" \
-d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

echo "Réponse Login : $LOGIN_RESPONSE"

# Extraire token du login
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
if [ "$TOKEN" == "null" ]; then
    echo "Login échoué, arrêt du script."
    exit 1
fi
echo "Token JWT obtenu : $TOKEN"

echo "=============================="
echo "3️⃣ Test API protégée /users"
echo "=============================="
USERS_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" "$API_URL/users")
echo "Réponse /users : $USERS_RESPONSE"

echo "=============================="
echo "4️⃣ Test API protégée sans token (devrait échouer)"
echo "=============================="
USERS_RESPONSE_NO_TOKEN=$(curl -s "$API_URL/users")
echo "Réponse /users sans token : $USERS_RESPONSE_NO_TOKEN"
