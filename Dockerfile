FROM mhart/alpine-node:6.9.1

RUN npm install -g gulp

RUN mkdir -p /top-drawer
WORKDIR /top-drawer
COPY . /top-drawer

CMD NODE_ENV=production gulp server --optimize_for_size --max_old_space_size=2048 --gc_interval=100 --stack_size=4096gc 2>&1 | tee /logs/storefront.log
