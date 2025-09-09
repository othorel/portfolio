COMPOSE_FILE = docker-compose.yml
COMPOSE = docker compose -f $(COMPOSE_FILE)
NETWORK = projectcollab-net

all: build

monitor:
	@watch -n1 docker ps -a

# Services de base : frontend, backend, db
build:
	@echo "🪛 Building base services..."
	@$(COMPOSE) up --build -d

up:
	@echo "🟩 Starting base services..."
	@$(COMPOSE) up -d

down:
	@echo "❌ Stopping base services..."
	@$(COMPOSE) down

stop:
	@echo "⭕️ Stopping base containers..."
	@$(COMPOSE) stop
	@echo "Base containers stopped."

start:
	@echo "✅ Starting base containers..."
	@$(COMPOSE) start
	@echo "Base containers started."

restart: stop start
	@echo "Base containers restarted."

fclean:
	@echo "🧹 Stopping and removing ALL containers, images, and volumes..."
	@$(COMPOSE) down --rmi local --volumes --remove-orphans
	@echo "✅ All services cleaned."

prune:
	@echo "🧼 Running full Docker system prune (containers, images, volumes, networks)..."
	@docker system prune -a --volumes -f
	@echo "✅ Docker system fully pruned."

re: fclean build
	@echo "Complete rebuild finished."

help:
	@echo "📖 Available commands:"
	@echo ""
	@echo "🏗️  BUILD COMMANDS:"
	@echo "  make build          - Build and start base services (frontend + backend + db)"
	@echo ""
	@echo "🚀 START/STOP COMMANDS:"
	@echo "  make up             - Start base services"
	@echo "  make down           - Stop base services"
	@echo "  make stop           - Stop base containers"
	@echo "  make start          - Start base containers"
	@echo "  make restart        - Restart base containers"
	@echo ""
	@echo "🧹 Cleaning:"
	@echo "  make fclean         - Remove ALL containers, images, and volumes"
	@echo "  make re             - Complete rebuild (fclean + build)"
	@echo "  make prune          - Remove all unused containers, networks, images and optionally volumes"
	@echo ""
	@echo "🔧 Utils:"
	@echo "  monitor             - Monitor the state of docker containers"

.PHONY : all up down re clean stop start restart fclean prune help monitor
