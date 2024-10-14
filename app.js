import connection_db from "./database/connectionDB.js";
import bookModel from "./models/bookModel.js";
import express from "express";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

const port = 4000;
export const app = express(); // common.js no exporta al final

// middleware
app.get("/hola", (req, res) => {
  res.send("Hola primera api");
});
app.use(cors());
app.use(express.json());
app.use("/books", bookRoutes);

try {
  await connection_db.authenticate();
  console.log("Conexión a la base de datos establecida correctamente.");

  // Sincroniza el modelo con la base de datos
  await bookModel.sync({ force: false });
  console.log('La tabla "books" ha sido sincronizada.');
} catch (error) {
  console.error(
    "Error al conectar a la base de datos o al agregar libros:",
    error
  );
}
export const server = app.listen(4000, () => {
  console.log(`Server is running on http://localhost:4000 🚀🚀`);
});
