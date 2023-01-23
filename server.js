const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const env = require('dotenv');
const SocketServer = require('./socketServer');
const {ExpressPeerServer} = require('peer');


const app = express();
env.config();
app.use(express.json());
app.use(cors());
app.use(cookieParser());


// Socket.io
const http = require('http').createServer(app)
const io = require('socket.io')(http)


io.on('connection', socket =>{
    SocketServer(socket);
})

//Create Peer Server
ExpressPeerServer(http, { path: '/'})




// Routes
app.use('/api', require('./routes/authRouter'));
app.use('/api', require('./routes/userRouter'));
app.use('/api', require('./routes/postRouter'));
app.use('/api', require('./routes/commentRouter'));
app.use('/api', require('./routes/notifyRouter'));
app.use('/api', require('./routes/messageRouter'));



const URL = process.env.MONGO_URI;
mongoose.connect(URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},err=>{
    if(err) throw err;
    console.log("Database connected successfully");
})

 if(process.env.NODE_ENV ==='production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


const port = process.env.PORT || 5000;

http.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
})