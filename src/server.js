import express from "express";

const server = express();
const port = 3333;

server.get("/", (request, response) => {
  const param = request.query;

  console.log(param);

  response.json([
    {
      id: param.page,
      name: "Bruno S Velho",
      email: "bruno@email.com",
    },
    {
      id: 2,
      name: "Bruno S Velho",
      email: "bruno@email.com",
    },
    {
      id: 3,
      name: "Bruno S Velho",
      email: "bruno@email.com",
    },
    {
      id: 4,
      name: "Bruno S Velho",
      email: "bruno@email.com",
    },
    {
      id: 5,
      name: "Bruno S Velho",
      email: "bruno@email.com",
    },
  ]);
});

server.listen(port, () => {
  console.log(`🚀 Servidor em funcionamento!!! - http://localhost:${port}`);
});
