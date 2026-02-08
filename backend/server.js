import express from "express";
import cors from "cors";

import pool from "./config/db.js";

const PORT= process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

pool.query("SELECT NOW()")
.then(()=> console.log("Database connected successfully"));

app.get("/",(req,res)=>{
    res.send("Job tracker app running...")
})

app.listen(PORT,()=>{
    console.log(`Serving running in port ${PORT}`)
})
