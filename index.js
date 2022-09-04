// const { EventEmitter } = require("events");
// const { readFile, readFileSync } = require("fs");
// const { readFile } = require("fs").promises;

// const text = readFile("./hello.txt", "utf8", function(error, text) {
//   console.log(text)
// })
// async function readText() {
//   // text file doesn't exist anymore
//   const text = await readFile("./hello.txt", "utf8")
//   console.log(text)
// }
// readText()

// let eventEmitter = new EventEmitter();

// eventEmitter.on("bob", () => {
//   console.log('bob')
// })
// eventEmitter.emit("bob")


//run the epic database code

let express = require("express")
let mysql = require("mysql")

let expressApp = express()

let connection = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "?xrrpio?G5?tT6cY",
})

connection.connect(function(error) {
  if(!!error) 
    console.log(error)
  else
    console.log('connection successful')
})

expressApp.get("/", function(request, response) {
  connection.query("SELECT * FROM db", function(error, rows, fields) {
    if(!!error)
      console.log('error in query')
    else
      console.log("success")
  })
})

expressApp.listen()