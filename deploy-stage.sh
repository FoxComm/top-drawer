docker build -t td-storefront .
docker tag td-storefront docker-stage.foxcommerce.com:5000/td-storefront
docker push docker-stage.foxcommerce.com:5000/td-storefront
