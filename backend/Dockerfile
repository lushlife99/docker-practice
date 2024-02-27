FROM openjdk:17-jdk
RUN microdnf install findutils
WORKDIR /app
COPY . .
RUN sed -i 's/\r//' gradlew
RUN chmod +x ./gradlew
RUN ./gradlew clean build
RUN apk add tzdata
ENV JAR_PATH=/app/build/libs
RUN find ${JAR_PATH} -name "*.jar" -exec cp {} /app/app.jar \;
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod", "app.jar"]