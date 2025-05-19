import express from "express";
import router from "./routes";
const cors = require('cors')


const app = express();

const PORT : number = 3000;


app.use(cors())
app.use(express.json())


app.use('/api/v1' , router)

app.listen(PORT , ()=>{
    console.log('App Started')
})



