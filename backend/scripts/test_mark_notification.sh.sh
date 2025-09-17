#!/bin/bash
# scripts/test_mark_notification.sh

BASE_URL="http://localhost:4000"

# Login avec un utilisateur existant qui a des notifications
LOGIN="user1_1758106967"
EMAIL="user1_1758106967@test.com"
PASSWORD="66ShireS@kura66!"

echo "🔔 Test du marquage des notifications..."
echo "👤 User: $LOGIN"
echo "---"

# Login
echo "🔑 Login..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token')
echo "✅ Token obtenu"

# Voir les notifications
echo "📋 Notifications:"
NOTIFS=$(curl -s -X GET "$BASE_URL/notifications" \
  -H "Authorization: Bearer $TOKEN")
echo "$NOTIFS" | jq

# Marquer une notification comme lue
NOTIF_ID=$(echo "$NOTIFS" | jq -r '.notifications[0]?.id')
if [ -n "$NOTIF_ID" ] && [ "$NOTIF_ID" != "null" ]; then
  echo "📖 Marquer la notification $NOTIF_ID comme lue..."
  curl -s -X PATCH "$BASE_URL/notifications/read/$NOTIF_ID" \
    -H "Authorization: Bearer $TOKEN" | jq
    
  echo "🔢 Nombre de non lues après:"
  curl -s -X GET "$BASE_URL/notifications/unread-count" \
    -H "Authorization: Bearer $TOKEN" | jq
else
  echo "⚠️ Aucune notification à marquer"
fi