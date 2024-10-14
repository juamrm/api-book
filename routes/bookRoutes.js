import express from "express";
import {
  getAllBooks,
  createBook,
  deleteBook,
  updateBook,
} from "../controllers/bookController.js";

const router = express.Router();
// Accede a la función dentro del objeto `bookController`

router.get("/", getAllBooks);
router.post("/", createBook);
router.delete("/:id", deleteBook);
router.put("/:id", updateBook);
export default router;
