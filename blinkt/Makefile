docker-build:
	docker buildx build \
		--platform linux/arm/v7 \
		--output "type=image,push=true" \
		-t utsavanand2/blinkserver:0.0.1 \
		-t utsavanand2/blinktserver:latest .