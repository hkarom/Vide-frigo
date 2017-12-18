FROM java:8

ENV JAVA_LIB_DIR=/peuplement_BD

# Install maven
RUN apt-get update
RUN apt-get install -y maven

WORKDIR /peuplement_BD

ADD wait-for-it.sh /peuplement_BD/wait-for-it.sh

ADD pom.xml /peuplement_BD/pom.xml
RUN ["mvn", "dependency:resolve"]
RUN ["mvn", "verify"]

ADD src /peuplement_BD/src

RUN ["mvn", "package"]

RUN chmod 777 /peuplement_BD/target/peuplement-0.0.1.jar

EXPOSE 4567

CMD ["tail", "-f", "/dev/null"]
