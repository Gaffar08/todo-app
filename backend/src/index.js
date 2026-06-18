const express = require("express");
const cors = require("cors");
const todosRouter = require("./routes/todos");
require("dotenv").config();

const client = require("prom-client");

const app = express();

app.use(cors());
app.use(express.json());

/*
Prometheus Metrics
*/
const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({
  register: client.register,
});

const httpRequests = new client.Counter({
  name: "todo_app_requests_total",
  help: "Total number of requests",
});

app.use((req, res, next) => {
  httpRequests.inc();
  next();
});

app.use("/api/todos", todosRouter);

app.get("/", (req, res) => {
  res.send("Backend API Running");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
  });
});

/*
Prometheus Endpoint
*/
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});