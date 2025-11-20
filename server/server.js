import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

await connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // all the requests will be parsed using json method
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send("Hieee"))
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`)
});

export default app;