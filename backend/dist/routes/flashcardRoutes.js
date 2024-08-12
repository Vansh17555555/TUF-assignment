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
// src/routes/flashcardRoutes.ts
const express_1 = __importDefault(require("express"));
const flashcardModel_1 = require("../models/flashcardModel");
const router = express_1.default.Router();
// Get all flashcards
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flashcards = yield (0, flashcardModel_1.getFlashcards)();
        res.json(flashcards);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}));
// Add a flashcard
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flashcard = req.body;
        const newFlashcard = yield (0, flashcardModel_1.addFlashcard)(flashcard);
        res.status(201).json(newFlashcard);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}));
// Update a flashcard
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const flashcard = req.body;
        const updatedFlashcard = yield (0, flashcardModel_1.updateFlashcard)(parseInt(id), flashcard);
        res.json(updatedFlashcard);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating flashcard' });
    }
}));
// Delete a flashcard
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, flashcardModel_1.deleteFlashcard)(parseInt(id));
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting flashcard' });
    }
}));
exports.default = router;
