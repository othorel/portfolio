#!/bin/bash
# scripts/test_notifications_quick.sh

BASE_URL="http://localhost:4000"
RAND=$(date +%s)
LOGIN="notif_test_$RAND"
EMAIL="notif_test_$RAND@test.com"
PASSWORD="66ShireS@kura66!"

echo "🔔 Test rapide des notifications..."
echo "👤 User: $LOGIN"
echo "---"

# Création utilisateur
echo "👤 Création de l'utilisateur..."
curl -s -X POST "$BASE_URL/auth/signup" \
  -H "Content-Type: application/json" \
  -d "{\"login\":\"$LOGIN\",\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}" | jq

# Login
echo "🔑 Login..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token')
echo "✅ Token: $TOKEN"

# Test de toutes les routes notifications
echo "---"
echo "📋 Toutes les notifications:"
curl -s -X GET "$BASE_URL/notifications" \
  -H "Authorization: Bearer $TOKEN" | jq

echo "🔢 Nombre de non lues:"
curl -s -X GET "$BASE_URL/notifications/unread-count" \
  -H "Authorization: Bearer $TOKEN" | jq

# Essayer de marquer une notification comme lue (si existante)
NOTIFS=$(curl -s -X GET "$BASE_URL/notifications" \
  -H "Authorization: Bearer $TOKEN")
NOTIF_ID=$(echo "$NOTIFS" | jq -r '.[0]?.id')

if [ -n "$NOTIF_ID" ] && [ "$NOTIF_ID" != "null" ]; then
  echo "📖 Marquer notification $NOTIF_ID comme lue:"
  curl -s -X PATCH "$BASE_URL/notifications/read/$NOTIF_ID" \
    -H "Authorization: Bearer $TOKEN" | jq
    
  echo "🔢 Nombre de non lues après:"
  curl -s -X GET "$BASE_URL/notifications/unread-count" \
    -H "Authorization: Bearer $TOKEN" | jq
else
  echo "⚠️ Aucune notification à marquer"
fi

echo "✅ Test notifications terminé"