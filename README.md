# Server-sent events with Spring Boot (Kotlin) and React

Server-sent events are a feature of HTML5 that allows clients to subscribe to event streams. The client is notified by the server about new events, without the need for the client to regularly poll for new events.

This demo consists of two parts:

1. A backend application built with [Spring Boot](https://spring.io/projects/spring-boot), written in Kotlin, utilizing [Reactor](https://projectreactor.io/) for implementing SSE endpoints and [Spring Integration](https://spring.io/projects/spring-integration) for messaging within the backend application. The demo application mocks a job runner and outputs changes of job status. Job status includes new/running/finished, a progress value (percentage), as well as an exit code (success/error).
2. A frontend built with [React](https://reactjs.org/) that subscribes to the SSE endpoint and displays the status of the jobs sent by the backend.

**[Live Demo](https://sse-demo.7c8.de/)**

The process:

1. Within the backend application MockJobRunnerService creates a new job or updates an existing one. It then sends a message into a SubscribableChannel with the updated job data.
2. A client makes a request to the SSE endpoint. Reactor opens a reactive sequence (Flux), the client is subscribed.
3. The reactive sequence implements a message handler with which it subscribes to the job data channel within the backend application. Whenever this channel outputs a new message, the message handler builds a ServerSentEvent and sends it to the client.
4. The client receives the event and processes it.

### Building and running the backend

```
mvn clean install
java -jar target/*.jar
```

The backend is available on `http://localhost:8080/`.
The SSE endpoint for job data is available on `http://localhost:8080/api/event/jobstatus`.
Test with curl: `curl http://localhost:8080/api/event/jobstatus`.

### Building and running the frontend

```
npm install
npm start
```

The frontend is available on `http://localhost:3000/`.

Note: The frontend closes the event source when data of 100 jobs has been received, as to not crash the browser.

