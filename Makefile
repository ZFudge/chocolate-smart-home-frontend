TRASH_PATH := /tmp/null
NETWORK_NAME := chocolate-smart-home-network
ABSOLUTE_PATH := $(shell pwd)
PROJECT_ROOT := frontend
DEV_CONTAINER_NAME := csm-frontend

help:
	@echo "Usage: make TARGET"
	@echo ""
	@echo "Targets:"
	@echo "  help                         Print this help message"
	@echo ""
	@echo "  run                          Run the app in development mode, in container"
	@echo ""
	@echo "  dev                          Start development server"
	@echo "  storybook                    Start storybook"
	@echo "  shell                        Attach to shell session and container"
	@echo "  network                      Create externally managed network"
	@echo "  container                    Create container"
	@echo "  shell                        Attach to shell session and container"
	@echo "  install                      Installed node modules"
	@echo "  test                         Run tests"
	@echo "  build                        Build static files"
	@echo "  clean                        Stop and remove container"
	@echo ""

network:
	@echo "Creating smart home network..."
	@docker network create -d bridge ${NETWORK_NAME} || true

clean:
	@docker stop ${DEV_CONTAINER_NAME} 2> ${TRASH_PATH} || true
	@docker rm ${DEV_CONTAINER_NAME} 2> ${TRASH_PATH} || true

container: clean
	@echo "Starting ${DEV_CONTAINER_NAME} container..."
	@docker run -it -d \
		--name=${DEV_CONTAINER_NAME} \
		--network=${NETWORK_NAME} \
		-v ${ABSOLUTE_PATH}:/${PROJECT_ROOT} \
		-w /${PROJECT_ROOT} \
		-p 6006:6006 \
		-p 5173:5173 \
		node:22.13.0-alpine

shell:
	@docker exec -it ${DEV_CONTAINER_NAME} sh

install:
	@docker exec -it ${DEV_CONTAINER_NAME} sh -c "npm ci"

storybook:
	@docker exec -it ${DEV_CONTAINER_NAME} sh -c "npm run storybook"

dev:
	@docker exec -it ${DEV_CONTAINER_NAME} sh -c "npm run dev"

test:
	@docker exec -it ${DEV_CONTAINER_NAME} sh -c "npm run test"

build:
	@docker exec -it ${DEV_CONTAINER_NAME} sh -c "npm run build"

run: network container dev
