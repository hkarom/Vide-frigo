FROM node:9

USER node

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY ./wait-for-it.sh /home/node/app

COPY ./package.json /home/node/app

COPY ./package-lock.json /home/node/app

RUN cd /home/node/app && npm install

COPY . /home/node/app

EXPOSE 3000

CMD ["./wait-for-it.sh", "db:3306", "-t", "40", "--", "npm", "run", "docker-dev"]

EXPOSE 4200

FROM java:8

# Install maven
RUN apt-get update
RUN apt-get install -y maven

WORKDIR /peuplement_BD

# Prepare by downloading dependencies
ADD /initdb/peuplement_BD/pom.xml /peuplement_BD/pom.xml
CMD cat /peuplement_BD/pom.xml
RUN ["mvn", "dependency:resolve"]
RUN ["mvn", "verify"]

ADD /initdb/peuplement_BD/src/* /peuplement_BD/src/

RUN ["mvn", "package"]

EXPOSE 4567
CMD ["java", "-jar", "/peuplement_BD/target/peuplement_BD-0.0.1.jar"]
