import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './configs/db.js';
import 'dotenv/config'
import userRouter from './routes/user.js';

const app = express();
const PORT = process.env.PORT || 4000;

await connectDB()


const allOrigins = ['http://localhost:5173', ]

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allOrigins, credentials: true}));

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});
app.use('/api/user', userRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




