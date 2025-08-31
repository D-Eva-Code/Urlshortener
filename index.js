require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { urlencoded } = require('body-parser');
const app = express();

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


app.get('/api/shorturl/:id',(req, res)=>{
   const posturl= req.body.url;
   let url= req.params.id;
   
  
  if (posturl!==url){
    res.json({error: "No short URL found for the given input"});  }
    else{
    res.redirect(posturl);
  }

})
app.post('/api/shorturl/',(req, res)=>{
  const posturl= req.body.url;
  let counter=1;
  let short_url={};

function addcount(){
  if (short_url[posturl]!==undefined){//if posturl already has a short url
    return short_url[posturl]=counter;
  }
  else{
      short_url[posturl]=counter++;//if its a new url assign it the current counter value
      // counter++;
      return short_url[posturl];
  }

  }
  if (!posturl){
    res.json({error: "invalid url"});
  }

  else{
    res.json({"original_url":posturl, "short_url":addcount()});
  }
  req.params.id==counter;

});
 
  // let url= req.params.id;
  // let short_url=1;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

