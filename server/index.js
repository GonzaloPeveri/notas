/* eslint-env node */
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
    res.json({ message: "Hola desde el backend con Express 🚀" });
});

app.get("/", (req, res) => {
    res.send("Servidor Express funcionando correctamente 🚀");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});