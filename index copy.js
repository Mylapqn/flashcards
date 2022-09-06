const express = require("express")
const stringDecoder = require("string_decoder").StringDecoder
const mysql = require("mysql2")
const http = require("http")
const url = require("url")
const util = require("util")
const cors = require("cors")
const formidable = require("formidable")
const { StringDecoder } = require("string_decoder")

let app = express()
let port = 6969

const server = http.createServer(function(request, response) {
  // console.log(http.METHODS)
  // console.log(http.STATUS_CODES)
  // console.log(request.headers)
  // console.log(request.url)
  let path = url.parse(request.url, true)
  // console.log(request.headers)
  // path.pathname path.search path.query - path, querystring, qs object
  // path.port path.protocol path.origin - all return null in the request
  let decoder = new StringDecoder("utf-8")
  let buffer = ""
  request.on("data", function (chunk) {
    buffer += decoder.write(chunk)
  })
  request.on("end", function() {
    buffer += decoder.end()
    response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
    response.write("The response.\n\n")
    response.write(util.inspect(path.query) + "\n\n")
    response.write(buffer + "\n\n")
    response.end("End of message.")
  })
})
server.listen(port, "127.0.0.1", function() {
  console.log(`Listening on port ${port}`)
})

app.use(
  cors({
    origin: "*",
  })
)

app.listen(port)

app.get("/", (request, response) => {

})

app.post("/", (request, response) => {
  let path = url.parse(request.url, true)
  let decoder = new StringDecoder("utf-8")
  let buffer = ""
  request.on("data", function (chunk) {
    buffer += decoder.write(chunk)
  })
  request.on("end", function() {
    buffer += decoder.end()
    response.writeHead(200, "OK", {'Content-Type': 'text/plain'})
    response.write("The response.\n\n")
    response.write(util.inspect(path.query) + "\n\n")
    response.write(buffer + "\n\n")
    response.end("End of message.")
  })
})

//#region mysql bullshit here

let connection = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "user",
  password: "prXb@ayj!66@i!Ak",
})

// connection.connect(function(error) {
//   if(error) 
//     console.log(error)
//   else
//     console.log('connection successful')
// })

// connection.query("USE flashcards", function(error, rows, fields) {
//   if(error)
//     console.log(error)
//   else
//     console.log("success")
// })

// connection.query("INSERT INTO authors(author_name, country) values ('bob', 'belgium')", function(error, rows, fields) {
//   if(error)
//     console.log(error)
//   else
//     console.log(rows)
// })
//basic query
// connection.query("SELECT author_name FROM authors", function(error, rows, fields) {
//   if(error) {
//     console.log(error)
//     return
//   }
//   let names = rows.map(r => r.author_name)
//   console.log(names)
// })
//query when you visit localhost:port
// expressApp.get("/", function(request, response) {
//   connection.query("SELECT author_name FROM authors", function(error, rows, fields) {
//     if(error) {
//       console.log(error)
//       return
//     }
//     let names = rows.map(r => r.author_name)
//     console.log(names)
//     response.status(200).send("Authors: ", names.join(", "))
//   })
// })
//pooled connection when you visit localhost:port

//this uses a different syntax from the simple createConnection
// expressApp.get("/", function(request, response) {
//   connection.getConnection(function(error, tempConnection) {
//     if(error) {
//       tempConnection.release()
//       console.log(error)
//     }
//     else {
//       console.log("connected")
//       tempConnection.query("SELECT author_name FROM authors", function(error, rows, fields) {
//         tempConnection.release()
//         if(error)
//           console.log(error)
//         else
//           response.json(rows)
//       })  
//     }
//   })
// })
// expressApp.listen(port)