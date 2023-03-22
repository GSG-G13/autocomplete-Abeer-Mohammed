const fs = require('fs')
const path = require('path')

let contentType = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.txt': 'text/plain',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.ico': 'image/vnd.microsoft.icon',
}
const handlePublic = (url, response) => {
  const pathFile = path.join(__dirname, '..', '..', 'public', url)
  const extension = path.extname(pathFile)
  fs.readFile(pathFile, (err, file) => {
    if (err) {
      response.writeHead(500, { 'Content-Type': 'text/plain' })
      response.end('Server Error!')
    } else {
      response.writeHead(200, { 'Content-Type': contentType[extension] })
      response.end(file)
    }
  })
}

const handlePublicHome = (url, response, cb) => {
  const pathFile = path.join(__dirname, '..', url)
  const extension = path.extname(pathFile)
  fs.readFile(pathFile, 'utf8', (err, file) => {
    if (err) {
      response.writeHead(500, contentType['plain'])
      response.end('Server Error!')
    } else {
      response.writeHead(200, contentType[extension])
      cb(file)
      // response.end(file)
    }
  })
}



const filtered = (words, data) => {
  const filterWord = words.filter((word) => {
    let lowerCaseWord = word.toLowerCase()
    let lowerCaseData = data.toLowerCase()
    return lowerCaseWord.startsWith(lowerCaseData)
  })
  return filterWord
}
module.exports = { handlePublic, handlePublicHome, filtered }
