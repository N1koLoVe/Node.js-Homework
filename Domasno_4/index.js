import http from "http";

const server = http.createServer((request, response) => {
  const url = request.url;
  const method = request.method;

  if (url === "/") {
    response.setHeader("Content-Type", "text/html");
    response.write("<h1>Hi this is me Jordan</h1>");
    response.end();
  }
  if (url === "/student") {
    response.setHeader("Content-Type", "text/html");
    response.write(`
        <h1>Student Info</h1>
        <h2>Student name: "your name"</h2>
        <h2>Student lastname: "your lastname"</h2>
        <h2>Academy: "the academy you are at"</h2>
        <h2>Subject: "the current subject we are learning"</h2>
        `);
    response.end();
  }
});

server.listen(3000, () => {
  console.log("Server is up and running...");
});
