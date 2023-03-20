import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from './DB/connectDB.js';
import userRouter from './routes/user.routes.js';
import toolRouter from './routes/tool.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tools", toolRouter);

const startServer = async () => {
    try {
        connectDB(process.env.MONGO_URI);
        
        app.listen(8080, () =>
            console.log("Server started on port http://localhost:8080"),
        );
    } catch (error) {
        console.log(error);
    }
};

startServer();