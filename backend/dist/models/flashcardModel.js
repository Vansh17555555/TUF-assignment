"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFlashcard = exports.updateFlashcard = exports.addFlashcard = exports.getFlashcards = void 0;
// src/models/flashcardModel.ts
const promise_1 = __importDefault(require("mysql2/promise"));
// Create a connection pool to the local MySQL server
const db = promise_1.default.createPool({
    host: 'localhost', // Use 'localhost' for a local server
    user: 'root', // Use the root user (or another user if needed)
    password: '12345678Rt.', // Your MySQL root password
    database: 'flashcards_db', // Replace with your actual database name
});
// Get all flashcards
const getFlashcards = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db.query('SELECT * FROM flashcards');
        return rows;
    }
    catch (error) {
        console.error('Error fetching flashcards:', error);
        throw new Error('Database error while fetching flashcards');
    }
});
exports.getFlashcards = getFlashcards;
// Add a flashcard
const addFlashcard = (flashcard) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [flashcard.question, flashcard.answer]);
        return Object.assign({ id: result.insertId }, flashcard); // Access insertId from result
    }
    catch (error) {
        console.error('Error adding flashcard:', error);
        throw new Error('Database error while adding flashcard');
    }
});
exports.addFlashcard = addFlashcard;
// Update a flashcard
const updateFlashcard = (id, flashcard) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?', [flashcard.question, flashcard.answer, id]);
        return Object.assign({ id }, flashcard);
    }
    catch (error) {
        console.error('Error updating flashcard:', error);
        throw new Error('Database error while updating flashcard');
    }
});
exports.updateFlashcard = updateFlashcard;
// Delete a flashcard
const deleteFlashcard = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.query('DELETE FROM flashcards WHERE id = ?', [id]);
    }
    catch (error) {
        console.error('Error deleting flashcard:', error);
        throw new Error('Database error while deleting flashcard');
    }
});
exports.deleteFlashcard = deleteFlashcard;
