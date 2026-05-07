const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const bodyParser=require('body-parser');
const sessionInfo=require('./config/session');
const adminroute=require('./Route/adminroute');
const userroute=require('./Route/userroute');
const feesroute=require('./Route/feesroute');
const myDB=require('./config/db');
const cors=require('cors');
myDB();
const app=express();
app.set('trust proxy',1);
app.use(express.json());
app.use(sessionInfo);
app.use(bodyParser.json());
app.use(cors({
  origin: "https://smart-tuition-management-website.onrender.com",
  credentials: true
}));


app.use('/admin',adminroute);
app.use('/user',userroute);
app.use('/fees',feesroute);

app.listen(process.env.PORT,()=>{
    console.log(`server is working on web ${process.env.PORT}`)
});