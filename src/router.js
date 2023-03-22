const fs = require('fs');
const path = require('path');
const values = require('./values.json');
const {handlePublic,handlePublicHome} = require("./handler/handlerPublic");

const router = (req, res) => {
  const endpoint = req.url;

  console.log('URL: ', endpoint);

  if (endpoint === '/') {
    handlePublic('index.html',res);
  } else if(endpoint === '/favicon.ico') {
     handlePublic(endpoint,res)
  } else if (endpoint === '/style.css') {
    handlePublic(endpoint,res)
  } else if (endpoint === '/js/xhr.js') {
    handlePublic(endpoint,res)
  } else if (endpoint === '/js/dom.js') {
    handlePublic(endpoint,res);
  }else if(endpoint === '/api/word/filtered') {
    console.log("hhhhhhhhhhhhhhhhhhh");
    for(let wordData in words) {
    
        let val = words[Object.values(wordData)];
        console.log(val);

    }
    // chunkHandler(res,(data) => {
    //     const filteredArr = filtered(word,data)
    //     res.writeHead(200,JSON.stringify(filteredArr), { 'Content-Type': 'application/json' });
    //     res.end(data);
    // })

  }else if(endpoint === '/values.json') {
    handlePublicHome(endpoint,res)
  } 
  
   else {
    res.writeHead(404, {'content-type': 'text/plain'});
    res.end('404 server error');
  }
}

module.exports = router;