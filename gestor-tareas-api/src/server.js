const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();

app.use(express.json());
// Middlewares
app.use(cors({
  origin: [
    'https://majestic-muffin-464472.netlify.app',
    'http://localhost:5173' // Desarrollo local
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get("/", (req, res) => {
  res.send("API del Gestor de Tareas está funcionando");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 3001; 

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => 
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    })
  )
  .catch((error) => console.log(error));
