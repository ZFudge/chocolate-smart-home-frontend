TRASH_PATH := /tmp/null
NETWORK_NAME := chocolate-smart-home-network

help:
	@echo "Usage: make TARGET"
	@echo ""
	@echo "Targets:"
	@echo "  help                         Print this help message"
	@echo "  network                      Create externally managed network"
	@echo "  dev                          Run the app in development mode"
	@echo "  clean                        Stop container"
	@echo ""

network:
	@echo "Creating smart home network..."
	@docker network create -d bridge ${NETWORK_NAME} || true

clean:
	@docker stop dev 2> ${TRASH_PATH} || true
	@docker rm dev 2> ${TRASH_PATH} || true

dev: clean
	@echo "Starting dev container..."
	@docker run -it \
		--name=dev \
		--network=${NETWORK_NAME} \
		-v $(PWD):/csm_frontend \
		-p 6006:6006 \
		-p 5173:5173 \
		node:22.13.0-alpine \
		sh
