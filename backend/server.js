const express = require("express");
const dotenv = require('dotenv').config({ path:"./.env"});
const goalsRouter = require('./routes/goalsRouter');
const userRouter = require('./routes/userRoutes');
const { errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require('./config/db');
const cors = require("cors");

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors({
    origin:['http://localhost:3000','https://mern-tutorial-server-3yug.onrender.com/api/user'],
    credentials: true
}));

app.use('/api/goals', goalsRouter);
app.use('/api/user', userRouter);

app.use(errorHandler);

const startServer = async () => {
    try {
        await connectDB();

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();