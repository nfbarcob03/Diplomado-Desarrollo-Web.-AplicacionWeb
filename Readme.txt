Desplegar supermarke_db
parado en el directorio del modulo
docker build -t supermarket_db .
docker run -d -t -i -p 3306:3306 --name supermarket_db supermarket_db
docker run --name phpmyadmin -d --link supermarket_db:db -p 8081:80 phpmyadmin

Desplegar supermarke_ms
parado en el directorio del modulo
docker build -t supermarket_ms .
docker run -p 4000:4000 -e DB_HOST=host.docker.internal -e DB_PORT=3306 -e DB_USER=supermarket -e DB_PASSWORD=2021 -e DB_NAME=supermarket_db -e URL=0.0.0.0:4000 supermarket_ms

Desplegar compras_ms
parado en el directorio del modulo
mvn clean package
mvnw package
docker build -t compras_ms .
docker run -p 8080:8080 compras_ms

Desplegar supermarket_api
parado en el directorio del modulo
docker build -t supermarket_api .
docker run -p 5000:5000 supermarket_api

Desplegar webApp
parado en el directorio del modulo
npm install
npm install --save axios
npm install --save vue-router
npm run start
