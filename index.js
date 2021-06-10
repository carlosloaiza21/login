const express = require('express'); 
const app = express();
const NodeTtl=require('node-ttl');
const port = 3000;

const bcrypt = require('bcrypt');
const saltRounds = 10;
const ttlDuration = 120;
const ttl = new NodeTtl();

ttl.on('get',(key,value)=>{
    ttl.push(key, value,null,ttlDuration);
});

const verify = async(req,res,next) =>{
    try {
        if(ttl.get('token')!==req.headers.authorization){
            res.json({"TOKEN":"TOKEN ERROR"});
            res.end();
        }
    } catch (error) {
        console.log(error)
    }
    next()
};

app.use('/create-token',async(req, res)=>{
    const token = await bcrypt.hash(req.query.token, saltRounds);
    ttl.push('token',token,null,ttlDuration);
    res.json({"token":token});
});

app.use('/delete-token',async(req, res)=>{
    ttl.del('token');
    res.json({"success":"token deleted"});
});

app.get("/*",verify,(req,res)=>{
    res.end();
});

app.use(function (req, res, next) {
    res.status(404).json({"TOKEN":"page no found"});
    next();
});

app.listen(port,()=>{
    console.log('express')
});