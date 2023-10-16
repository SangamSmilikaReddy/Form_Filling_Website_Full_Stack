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
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const bodyParser = require("body-parser");
let cors = require("cors");
const app = (0, express_1.default)();
app.use(cors());
const PORT = process.env.PORT || 5000;
const db1 = database_1.default.db("Cluster0");
const collection = db1.collection("FormData");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allData = yield collection.find().toArray();
        res.status(200).json(allData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
}));
app.post("/postform", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield collection.insertOne(data);
        if (result) {
            res.status(200).json({ status: "success", message: "Form Posted" });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}....`);
});
