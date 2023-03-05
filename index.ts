import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import 'express-async-errors';
import {handleError} from "./utils/errors";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());
// app.get('/', (req,res)=>{
//     throw new ValidationError('ups')
// } )
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});
app.use(limiter);
app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001')
})
