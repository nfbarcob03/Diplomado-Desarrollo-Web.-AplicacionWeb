FROM openjdk:17-jdk-alpine

COPY /target/accounts_ms-0.0.1-SNAPSHOT.jar accounts_ms-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/accounts_ms-0.0.1-SNAPSHOT.jar"]

CMD gunicorn --bind 0.0.0.0:$PORT wsgi

