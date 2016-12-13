
dev d:
	source .env && npm run dev

setup:
	npm install

build: setup
	test -f .env && export eval `cat .env` || true && NODE_ENV=production ./node_modules/.bin/gulp build
	touch firebrand.tar.bz2
	tar --exclude 'firebrand.tar.bz2' -jcf firebrand.tar.bz2 ./

docker: build
	docker build -t firebrand .

clean:
	rm -rf ./node_modules

test: setup
	npm test

.PHONY: dev d setup build docker docker-push clean test
