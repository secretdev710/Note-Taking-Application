import express from "express";
import cors from "cors";

import connectDB from "./db.js";

import AuthRouter from "./routes/Auth.js";
import NotesRouter from "./routes/Notes.js";
const app = express();
const port = 5000;

app.use(cors(
  {
      origin: ["http://localhost:3000"],
      methods: ["POST", "GET", "PUT", "DELETE"],
      credentials: true
  }
));

// Available routes
app.use(express.json());

// Connect to MongoDB
connectDB(); // Assuming db.js exports a function for connecting to MongoDB

app.use("/api/auth", AuthRouter);
app.use("/api/notes", NotesRouter);

// Start the server
const server = app.listen(port, () => {
  console.log(`Notebox-backend listening on port ${port}`);
});

//shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});
