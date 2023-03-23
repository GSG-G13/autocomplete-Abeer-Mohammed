const fs = require('fs')
const path = require('path')
const querystring = require('querystring')
const values = require('./values.json')
const {
  handlePublic,
  handlePublicHome,
  filtered,
} = require('./handler/handlerPublic')

const router = (req, res) => {
  const endpoint = req.url

  if (endpoint === '/') {
    handlePublic('index.html', res)
  } else if (endpoint === '/favicon.ico') {
    handlePublic(endpoint, res)
  } else if (endpoint === '/logo.png') {
    handlePublic(endpoint, res)
  } else if (endpoint === '/style.css') {
    handlePublic(endpoint, res)
  } else if (endpoint === '/js/xhr.js') {
    handlePublic(endpoint, res)
  } else if (endpoint === '/js/dom.js') {
    handlePublic(endpoint, res)
  } else if (endpoint.includes('/api/word/filtered?q=')) {
    handlePublicHome('/values.json', res, (e) => {
      const searchWord = endpoint.split('q=')[1]
      const filteredArr = filtered(JSON.parse(e), searchWord)
      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      res.end(JSON.stringify(filteredArr))
    })
  } else {
    res.writeHead(404, { 'content-type': 'text/plain' })
    res.end('404 server error')
  }
}

module.exports = router;
