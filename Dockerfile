FROM ubuntu:16.04

RUN apt-get update && apt-get install -y build-essential curl git nodejs npm && rm -rf /var/lib/apt/lists/*
RUN npm install -g n
RUN n 6.9.1
RUN npm install -g gulp

RUN mkdir -p /top-drawer
WORKDIR /top-drawer
COPY . /top-drawer

EXPOSE 4045
CMD gulp server 2>&1 | tee /logs/storefront.log
