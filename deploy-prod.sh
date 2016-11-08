NODE_ENV=production gulp build
docker build -t td-storefront .
docker tag td-storefront td-docker.foxcommerce.com:5000/td-storefront
docker push td-docker.foxcommerce.com:5000/td-storefront
