FROM mhart/alpine-node:6.9.1

RUN npm install -g gulp

RUN mkdir -p /top-drawer
WORKDIR /top-drawer
COPY . /top-drawer

CMD gulp server 2>&1 | tee /logs/storefront.log
