"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserRoutes_1 = __importDefault(require("./Routers/UserRoutes"));
const cors_1 = __importDefault(require("cors"));
const AIRoute_1 = __importDefault(require("./Routers/AIRoute"));
const NoteRoute_1 = __importDefault(require("./Routers/NoteRoute"));
const MessageRoute_1 = __importDefault(require("./Routers/MessageRoute"));
const AdminRoutes_1 = __importDefault(require("./Routers/AdminRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        "https://study-link-git-master-thisitha.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/users", UserRoutes_1.default);
app.use("/api/ai", AIRoute_1.default);
app.use("/api/notes", NoteRoute_1.default);
app.use("/api/messages", MessageRoute_1.default);
app.use("/api/admin", AdminRoutes_1.default);
// DB CONNECT
mongoose_1.default
    .connect(process.env.DB_URL)
    .then(() => {
    console.log("MongoDB Connected");
    // start server ONLY after DB connects
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error("MongoDB connection failed:", err);
});
app.get("/", (req, res) => {
    res.send("StudyLink Backend Running");
});
