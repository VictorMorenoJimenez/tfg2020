ALL := help

INTELLIGENIA_REGISTRY = tfg-registry.intelligenia.com
DOCKER_IMAGE_NAME = django-project
TAG = frontend
GROUP = victor

runner=$(shell whoami)
gitver=$(shell git log -1 --pretty=format:"%H")

help: ## This help.
				@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
				@echo

build:
				docker build -f Dockerfile -t $(DOCKER_IMAGE_NAME):$(gitver) .
				docker tag $(DOCKER_IMAGE_NAME):$(gitver) $(INTELLIGENIA_REGISTRY)/$(GROUP)/$(DOCKER_IMAGE_NAME)/$(TAG):latest
				docker tag $(DOCKER_IMAGE_NAME):$(gitver) $(INTELLIGENIA_REGISTRY)/$(GROUP)/$(DOCKER_IMAGE_NAME)/$(TAG):$(gitver)


push: build
				docker login $(INTELLIGENIA_REGISTRY)
				docker push $(INTELLIGENIA_REGISTRY)/$(GROUP)/$(DOCKER_IMAGE_NAME)/$(TAG):$(gitver)
				docker push $(INTELLIGENIA_REGISTRY)/$(GROUP)/$(DOCKER_IMAGE_NAME)/$(TAG):latest

