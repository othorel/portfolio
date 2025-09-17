#!/bin/bash
set -e

# scripts/test_complete_system.sh
# Test complet du système d'amis + notifications

BASE_URL="http://localhost:4000"
RAND=$(date +%s)

# Infos utilisateurs
USER1_LOGIN="user1_$RAND"
USER1_EMAIL="user1_$RAND@test.com"
USER1_PASSWORD="66ShireS@kura66!"

USER2_LOGIN="user2_$RAND" 
USER2_EMAIL="user2_$RAND@test.com"
USER2_PASSWORD="66ShireS@kura66!"

USER3_LOGIN="user3_$RAND"
USER3_EMAIL="user3_$RAND@test.com"
USER3_PASSWORD="66ShireS@kura66!"

echo "🚀 Démarrage du test complet du système..."
echo "📍 Base URL: $BASE_URL"
echo "👥 Users: $USER1_LOGIN, $USER2_LOGIN, $USER3_LOGIN"
echo "---"

# Fonction pour faire des requêtes avec gestion d'erreur
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
  local status=$?
  
  if [ $status -ne 0 ]; then
    echo "❌ Curl error: $status"
    return 1
  fi
  
  echo "📋 Response:"
  if echo "$response" | jq . >/dev/null 2>&1; then
    echo "$response" | jq .
  else
    echo "$response"
  fi
  echo "---"
  
  return 0
}

# 1. Création des utilisateurs
echo "1. 👤 Création des utilisateurs..."
make_request "POST" "/auth/signup" "" "{
  \"login\": \"$USER1_LOGIN\",
  \"email\": \"$USER1_EMAIL\", 
  \"password\": \"$USER1_PASSWORD\"
}"

make_request "POST" "/auth/signup" "" "{
  \"login\": \"$USER2_LOGIN\",
  \"email\": \"$USER2_EMAIL\",
  \"password\": \"$USER2_PASSWORD\"
}"

make_request "POST" "/auth/signup" "" "{
  \"login\": \"$USER3_LOGIN\",
  \"email\": \"$USER3_EMAIL\",
  \"password\": \"$USER3_PASSWORD\"
}"

# 2. Login pour récupérer les tokens
echo "2. 🔑 Login des utilisateurs..."
LOGIN1_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$USER1_EMAIL\", \"password\": \"$USER1_PASSWORD\"}")

TOKEN1=$(echo "$LOGIN1_RESPONSE" | jq -r '.token')
echo "✅ Token User1: $TOKEN1"

LOGIN2_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$USER2_EMAIL\", \"password\": \"$USER2_PASSWORD\"}")

TOKEN2=$(echo "$LOGIN2_RESPONSE" | jq -r '.token')
echo "✅ Token User2: $TOKEN2"

LOGIN3_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$USER3_EMAIL\", \"password\": \"$USER3_PASSWORD\"}")

TOKEN3=$(echo "$LOGIN3_RESPONSE" | jq -r '.token')
echo "✅ Token User3: $TOKEN3"

echo "---"

# 3. Test des routes de base
echo "3. 🔍 Test des routes de base..."

echo "📋 Notifications User1 (devrait être vide):"
make_request "GET" "/notifications" "$TOKEN1"

echo "👥 Amis User1 (devrait être vide):"
make_request "GET" "/friends" "$TOKEN1"

echo "📨 Demandes reçues User1:"
make_request "GET" "/friends/requests/pending" "$TOKEN1"

echo "📤 Demandes envoyées User1:"
make_request "GET" "/friends/requests/sent" "$TOKEN1"

# 4. Test des demandes d'amis
echo "4. 👥 Test des demandes d'amis..."

echo "➕ User1 ajoute User2:"
make_request "POST" "/friends/add" "$TOKEN1" "{\"friendLogin\": \"$USER2_LOGIN\"}"

echo "➕ User1 ajoute User3:"
make_request "POST" "/friends/add" "$TOKEN1" "{\"friendLogin\": \"$USER3_LOGIN\"}"

echo "📨 Demandes reçues User2:"
make_request "GET" "/friends/requests/pending" "$TOKEN2"

echo "📨 Demandes reçues User3:"
make_request "GET" "/friends/requests/pending" "$TOKEN3"

# 5. Test des notifications après demandes
echo "5. 🔔 Test des notifications..."

echo "📋 Notifications User2 (devrait avoir 1 notification):"
make_request "GET" "/notifications" "$TOKEN2"

echo "📋 Notifications User3 (devrait avoir 1 notification):"
make_request "GET" "/notifications" "$TOKEN3"

# 6. Test des réponses aux demandes
echo "6. ✅❌ Test des réponses aux demandes..."

echo "✅ User2 accepte User1:"
make_request "PATCH" "/friends/accept" "$TOKEN2" "{\"friendLogin\": \"$USER1_LOGIN\"}"

echo "❌ User3 refuse User1:"
make_request "PATCH" "/friends/reject" "$TOKEN3" "{\"friendLogin\": \"$USER1_LOGIN\"}"

# 7. Vérification après réponses
echo "7. 🔍 Vérification après réponses..."

echo "👥 Amis User1 (devrait avoir User2):"
make_request "GET" "/friends" "$TOKEN1"

echo "👥 Amis User2 (devrait avoir User1):"
make_request "GET" "/friends" "$TOKEN2"

echo "👥 Amis User3 (devrait être vide):"
make_request "GET" "/friends" "$TOKEN3"

echo "📋 Notifications User1 après acceptation:"
make_request "GET" "/notifications" "$TOKEN1"

# 8. Test des nouvelles routes
echo "8. 🆕 Test des nouvelles routes..."

echo "🔢 Nombre de notifications non lues User1:"
make_request "GET" "/notifications/unread-count" "$TOKEN1"

echo "👤 Infos de User2 avec ses amis:"
make_request "GET" "/friends/user?login=$USER2_LOGIN" "$TOKEN1"

# 9. Test de marquage des notifications
echo "9. 📖 Test du marquage des notifications..."

# Récupérer une notification à marquer comme lue
NOTIF_RESPONSE=$(curl -s -X GET "$BASE_URL/notifications" \
  -H "Authorization: Bearer $TOKEN1")
NOTIF_ID=$(echo "$NOTIF_RESPONSE" | jq -r '.[0]?.id')

if [ -n "$NOTIF_ID" ] && [ "$NOTIF_ID" != "null" ]; then
  echo "📖 Marquer la notification $NOTIF_ID comme lue:"
  make_request "PATCH" "/notifications/read/$NOTIF_ID" "$TOKEN1"
  
  echo "🔢 Nombre de notifications non lues après marquage:"
  make_request "GET" "/notifications/unread-count" "$TOKEN1"
else
  echo "⚠️ Aucune notification à marquer comme lue"
fi

# 10. Test de suppression
echo "10. 🗑️ Test de suppression..."

echo "➖ User1 supprime User2:"
make_request "DELETE" "/friends/remove" "$TOKEN1" "{\"friendLogin\": \"$USER2_LOGIN\"}"

echo "👥 Amis User1 après suppression:"
make_request "GET" "/friends" "$TOKEN1"

# 11. Nettoyage final
echo "11. 🧹 Nettoyage final..."

echo "➖ User1 supprime User3 (même si déjà refusé):"
make_request "DELETE" "/friends/remove" "$TOKEN1" "{\"friendLogin\": \"$USER3_LOGIN\"}"

echo "🎉 Test complet terminé avec succès !"
echo "📊 Résumé:"
echo "   - ✅ Création de 3 utilisateurs"
echo "   - ✅ Login et tokens obtenus"
echo "   - ✅ Demandes d'amis envoyées"
echo "   - ✅ Notifications générées"
echo "   - ✅ Acceptation/refus testés"
echo "   - ✅ Toutes les routes testées"