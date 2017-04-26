DOCKER_REPO ?= docker-stage.foxcommerce.com:5000
DOCKER_IMAGE ?= td-storefront
DOCKER_TAG ?= master

dev d:
	test -f .env && export eval `cat .env` || true && yarn dev

setup: clean
	yarn --pure-lockfile

check: ;

build: setup check
	test -f .env && export eval `cat .env` || true && NODE_ENV=production ./node_modules/.bin/gulp build

docker:
	docker build -t $(DOCKER_IMAGE) .

docker-push:
	docker tag $(DOCKER_IMAGE) $(DOCKER_REPO)/$(DOCKER_IMAGE):$(DOCKER_TAG)
	docker push $(DOCKER_REPO)/$(DOCKER_IMAGE):$(DOCKER_TAG)

clean: clean-build
	rm -rf ./node_modules

clean-build:
	rm -rf ./build/* ./lib/* ./public/app-*.css ./public/app-*.js

test:
	yarn test

.PHONY: dev d setup check build docker docker-push clean test
