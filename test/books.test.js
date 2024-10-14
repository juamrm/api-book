import request from "supertest";
import { app, server } from "../app.js";
import connectionDb from "../database/connectionDB.js";
import bookModel from "../models/bookModel.js";

describe("crud books", () => {
  test("should return a response with 200 and type json", async () => {
    const response = await request(app).get("/books");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toContain("application/json");
  });

  test("should create a new book", async () => {
    const bookData = {
      bookTitle: "The Lord of the Rings",
      authorName: "J.R.R. Tolkien",
      bookDescription: "A fantasy novel",
    };

    const response = await request(app).post("/books").send(bookData);
    expect(response.statusCode).toBe(201);
    expect(response.body.bookTitle).toBe(bookData.bookTitle);
    expect(response.body.authorName).toBe(bookData.authorName);
    expect(response.body.bookDescription).toBe(bookData.bookDescription);
  });

  test("should delete a book", async () => {
    const book = await bookModel.create({
      bookTitle: "The Lord of the Rings",
      authorName: "J.R.R. Tolkien",
      bookDescription: "A fantasy novel",
    });

    const response = await request(app).delete(`/books/${book.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Book deleted successfully");

    const deletedBook = await bookModel.findByPk(book.id);
    expect(deletedBook).toBeNull();
  });

  test("should update a book", async () => {
    const book = await bookModel.create({
      bookTitle: "The Lord of the Rings",
      authorName: "J.R.R. Tolkien",
      bookDescription: "A fantasy novel",
    });

    const updatedBookData = {
      bookTitle: "The Hobbit",
      authorName: "J.R.R. Tolkien",
      bookDescription: "A fantasy novel",
    };

    const response = await request(app)
      .put(`/books/${book.id}`)
      .send(updatedBookData);

    expect(response.statusCode).toBe(200);
    expect(response.body.bookTitle).toBe(updatedBookData.bookTitle);
    expect(response.body.authorName).toBe(updatedBookData.authorName);
    expect(response.body.bookDescription).toBe(updatedBookData.bookDescription);
  });

  afterEach(async () => {
    await bookModel.destroy({ where: { bookTitle: "The Lord of the Rings" } });
  });

  afterAll(async () => {
    await bookModel.destroy({ where: { bookTitle: "The Lord of the Rings" } });
    server.close();
    await connectionDb.close();
  });
});
