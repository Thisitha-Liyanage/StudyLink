"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const http_1 = require("http");
const UserRoutes_1 = __importDefault(require("./Routers/UserRoutes"));
const AIRoute_1 = __importDefault(require("./Routers/AIRoute"));
const NoteRoute_1 = __importDefault(require("./Routers/NoteRoute"));
const MessageRoute_1 = __importDefault(require("./Routers/MessageRoute"));
const AdminRoutes_1 = __importDefault(require("./Routers/AdminRoutes"));
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
const allowedOrigins = [
    "https://study-link-jwxa.vercel.app",
    process.env.CLIENT_URL,
].filter(Boolean);
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/users", UserRoutes_1.default);
app.use("/api/ai", AIRoute_1.default);
app.use("/api/notes", NoteRoute_1.default);
app.use("/api/messages", MessageRoute_1.default);
app.use("/api/admin", AdminRoutes_1.default);
app.get("/", (_req, res) => {
    res.json({ success: true, message: "Freelance-Fluxo API is running" });
});
const start = async () => {
    await (0, db_1.default)();
    const server = (0, http_1.createServer)(app);
    server.listen(PORT, () => {
        console.log(`Server is running on port : ${PORT}`);
    });
};
start();
