
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
import express from "express";
import cors from "cors";
// const { urlencoded } = require('body-parser');
import bodyParser from "body-parser";
const { urlencoded } = bodyParser;
const app = express();
import dns from "dns";
import dotenv from "dotenv";
dotenv.config();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.use(express.urlencoded({extended:false}));

 let counter=1;
  let short_url={};
  let idtourl={};
  
app.get('/api/shorturl/:id',(req, res)=>{
   let id= req.params.id;
   const url= idtourl[id];
  
  if (!url){
    res.json({error: "No short URL found for the given input"});  }
    else{
    res.redirect(url);
  }

})
app.post('/api/shorturl/',(req, res)=>{
  const posturl= req.body.url;
 // if (short_url[posturl]){//if posturl already has a short url
//   short_url[posturl]=counter;
// }
//   else{
    const id= counter;
    short_url[posturl]=id;
    idtourl[id]=posturl;//mapping id to url
    counter++;
  // }

if (!posturl){
  
      res.json({error: "invalid url"});
    }

    let hostname;
    try{
      hostname= new URL(posturl).hostname;
    }
    catch(e){
      res.json({error: "invalid url"});
    }

    dns.lookup(hostname, (err, address)=>{
      if (err){
        res.json({"error": "invalid url"});
      }
    else{
       res.json({"original_url":posturl, "short_url":short_url[posturl]});
    }
      });
  });
    
 
  // let url= req.params.id;
  // let short_url=1;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

