#!/bin/bash
set -e

BASE_URL="http://localhost:4000"
RAND=$(date +%s)
LOGIN="toto$RAND"
EMAIL="toto$RAND@test.com"
PASSWORD="66shireS@kura66"

# 1) Création de l'utilisateur
echo "🆕 Création de l'utilisateur..."
SIGNUP_RESPONSE=$(curl -s -X POST $BASE_URL/auth/signup \
  -H "Content-Type: application/json" \
  -d "{
    \"login\": \"$LOGIN\",
    \"email\": \"$EMAIL\",
    \"password\": \"$PASSWORD\"
  }")

echo "Raw signup response:"
echo "$SIGNUP_RESPONSE" | jq || echo "⚠️ Signup response not JSON, maybe user exists"

# 2) Login pour récupérer le token
echo -e "\n🔑 Logging in..."
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL\",
    \"password\": \"$PASSWORD\"
  }")

echo "Raw login response:"
echo "$LOGIN_RESPONSE" | jq || echo "⚠️ Login response not JSON"

TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token')

if [ "$TOKEN" == "null" ] || [ -z "$TOKEN" ]; then
  echo "❌ Impossible de récupérer le token"
  exit 1
fi

echo "✅ Token récupéré: $TOKEN"

# 3) GET notifications
echo -e "\n🔔 Liste des notifications:"
NOTIF_RESPONSE=$(curl -s -X GET $BASE_URL/notifications \
  -H "Authorization: Bearer $TOKEN")

echo "Raw notifications response:"
echo "$NOTIF_RESPONSE"
echo "$NOTIF_RESPONSE" | jq || echo "⚠️ Notifications response not JSON"

# 4) Exemple: marquer une notification comme lue (si au moins une existe)
NOTIF_ID=$(echo "$NOTIF_RESPONSE" | jq -r '.[0]?.id // empty')
if [ -n "$NOTIF_ID" ]; then
  echo -e "\n📖 Marquer la notification $NOTIF_ID comme lue"
  MARK_READ_RESPONSE=$(curl -s -X PATCH $BASE_URL/notifications/read/$NOTIF_ID \
    -H "Authorization: Bearer $TOKEN")
  echo "$MARK_READ_RESPONSE" | jq || echo "⚠️ Response not JSON"
else
  echo "⚠️ Pas de notifications à marquer comme lues"
fi

# 5) Exemple: supprimer une notification (si au moins une existe)
if [ -n "$NOTIF_ID" ]; then
  echo -e "\n🗑️ Supprimer la notification $NOTIF_ID"
  DELETE_RESPONSE=$(curl -s -X DELETE $BASE_URL/notifications/$NOTIF_ID \
    -H "Authorization: Bearer $TOKEN")
  echo "$DELETE_RESPONSE" | jq || echo "⚠️ Response not JSON"
else
  echo "⚠️ Pas de notifications à supprimer"
fi
