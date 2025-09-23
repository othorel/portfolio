#!/bin/bash
set -e

BASE_URL="http://localhost:4000"
RAND=$(date +%s)

# Infos utilisateurs
USER1_LOGIN="chatuser1_$RAND"
USER1_EMAIL="chatuser1_$RAND@test.com"
USER1_PASSWORD="66ShireS@kura66!"

USER2_LOGIN="chatuser2_$RAND"
USER2_EMAIL="chatuser2_$RAND@test.com"
USER2_PASSWORD="66ShireS@kura66!"

echo "🚀 Démarrage du test chat box..."
echo "📍 Base URL: $BASE_URL"
echo "👥 Users: $USER1_LOGIN, $USER2_LOGIN"
echo "---"

# Fonction pour faire des requêtes
make_request() {
  local method=$1
  local url=$2
  local token=$3
  local data=$4

  echo "➡️  $method $url"
  local curl_cmd="curl -s -X $method '$BASE_URL$url'"

  if [ -n "$token" ]; then
    curl_cmd="$curl_cmd -H 'Authorization: Bearer $token'"
  fi

  if [ -n "$data" ]; then
    curl_cmd="$curl_cmd -H 'Content-Type: application/json' -d '$data'"
  fi

  local response=$(eval $curl_cmd)
  echo "📋 Response: $response"
  echo "---"
  echo $response
}

# 1️⃣ Création des utilisateurs
echo "1. 👤 Création des utilisateurs..."
USER1_JSON=$(make_request "POST" "/auth/signup" "" "{\"login\": \"$USER1_LOGIN\", \"email\": \"$USER1_EMAIL\", \"password\": \"$USER1_PASSWORD\"}")
USER2_JSON=$(make_request "POST" "/auth/signup" "" "{\"login\": \"$USER2_LOGIN\", \"email\": \"$USER2_EMAIL\", \"password\": \"$USER2_PASSWORD\"}")

# 2️⃣ Login pour récupérer les tokens et IDs
echo "2. 🔑 Login des utilisateurs..."
TOKEN1=$(make_request "POST" "/auth/login" "" "{\"email\": \"$USER1_EMAIL\", \"password\": \"$USER1_PASSWORD\"}" | jq -r '.token')
TOKEN2=$(make_request "POST" "/auth/login" "" "{\"email\": \"$USER2_EMAIL\", \"password\": \"$USER2_PASSWORD\"}" | jq -r '.token')

USER1_ID=$(echo $USER1_JSON | jq -r '.user.id')
USER2_ID=$(echo $USER2_JSON | jq -r '.user.id')

echo "✅ Tokens récupérés : User1=$TOKEN1, User2=$TOKEN2"
echo "✅ IDs : User1=$USER1_ID, User2=$USER2_ID"
echo "---"

# 3️⃣ Créer une conversation 1:1 avec participantIds
echo "3. 💬 Création d'une conversation 1:1..."
CREATE_CONV_JSON=$(make_request "POST" "/chat/conversation" "$TOKEN1" "{\"participantIds\": [$USER2_ID]}")
CONV_ID=$(echo $CREATE_CONV_JSON | jq -r '.conversation.id // empty')

if [ -z "$CONV_ID" ]; then
  echo "❌ Erreur: conversation non créée"
  exit 1
else
  echo "✅ Conversation créée avec id: $CONV_ID"
fi
echo "---"

# 4️⃣ Envoyer des messages
echo "4. 📝 Envoi de messages..."
make_request "POST" "/chat/message" "$TOKEN1" "{\"conversationId\": $CONV_ID, \"content\": \"Salut $USER2_LOGIN!\"}"
make_request "POST" "/chat/message" "$TOKEN2" "{\"conversationId\": $CONV_ID, \"content\": \"Salut $USER1_LOGIN!\"}"

# 5️⃣ Récupérer les messages
echo "5. 📥 Récupération des messages..."
make_request "GET" "/chat/messages?conversationId=$CONV_ID" "$TOKEN1"

echo "🎉 Test chat box terminé !"
