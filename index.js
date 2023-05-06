const express = require("express")
const fileUpload = require("express-fileupload")
const fs = require("fs")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const multiparty = require("multiparty")
const stringDecoder = require("string_decoder").StringDecoder
const mysql = require("mysql2")
const http = require("http")
const cors = require("cors")
const url = require("url")
const util = require("util")
const path = require("path")
const formidable = require("formidable")
const { StringDecoder } = require("string_decoder")
const multer = require("multer")
const { rejects } = require("assert")
const { response } = require("express")

let connection = mysql.createConnection({
  host: "localhost",
  user: "user",
  // password: "Motherfucker123456", //for the old laptop
  password: "prXb@ayj!66@i!Ak", //for the desktop PC
})

connection.query("USE flashcards", function(error, rows, fields) {
  if(error)
    console.log(error)
  else 
    console.log("Database connection successful")
})

let port = 5501
let app = express()
app.listen(port)

app.use(
  cors({
    origin: "*",
  })
)

//#region dataset
app.get("/get-datasets", (request, response) => {
  connection.query("SELECT * FROM datasets", function(error, rows, fields) {
    if(error)
      console.log(error)
    else 
      response.send(JSON.stringify(rows))
  })
})

app.post("/get-dataset-data", async (request, response) => {
  let [fields, files] = await Parser.parseForm(request)
  let id = +fields.dataset_id
  console.log(id)
  connection.query(
    `SELECT * FROM authors WHERE dataset_id = ?`, 
    [id], 
    function(error, rows, fields) {
      if(error)
        console.log(error)
      else {
        console.log("Success: Selected rows for dataset with id: " + id)
        response.send(JSON.stringify(rows))
      }
    }
  )
})

app.post("/insert-dataset", async (request, response) => {
  let [fields, files] = await Parser.parseForm(request)
  console.log(fields)
    connection.query(
  ` INSERT INTO datasets (dataset_name, dataset_description) 
    VALUES (?, ?)
  `,
  [fields.dataset_name, fields.dataset_description],
  function(error, rows, fields) {
    if(error)
      console.log("Query error: ", error.message)
    else {
      console.log("Success: Added dataset.")
      response.writeHead(200, "OK")
      response.send()
    }
  })
})

app.post("/update-dataset", async (request, response) => {
  let [fields, files] = await Parser.parseForm(request)
  console.log(fields)
  let id = +fields.dataset_id
  connection.query(
  ` UPDATE datasets SET dataset_name = ?, dataset_description = ?
    WHERE id = ?
  `,
  [fields.dataset_name, fields.dataset_description, id],
  function(error, rows, fields) {
    if(error)
      console.log("Query error: ", error.message)
    else {
      console.log("Success: Updated dataset.")
      response.writeHead(200, "OK")
      response.send()
    }
  })
})

app.post("/delete-dataset", async (request, response) => {
  let [fields, files] = await Parser.parseForm(request)
  let id = +fields.dataset_id
  console.log("dataset id: ", id)
  connection.query(
    ` DELETE FROM datasets WHERE id = ?
    `,
    [id],
    function(error, rows, fields) {
      if(error)
        console.log("Query error: ", error.message)
      else {
        console.log("Success: Dataset deleted.")
        response.writeHead(200, "OK")
        response.send()
      }
    }
  )
})

app.post("/count-dataset-items", async (request, response) => {
  let [fields, files] = await Parser.parseForm(request)
  let id = +fields.dataset_id
  console.log("dataset id: ", id)
  connection.query(
    ` SELECT COUNT(dataset_id)
      FROM authors
      WHERE dataset_id = ?
    `,
    [id],
    function(error, rows, fields) {
      if(error)
        console.log("Query error: ", error.message)
      else {
        console.log("Success: Dataset items counted.")
        response.send(JSON.stringify(rows))
      }
    }
  )
})
//#endregion

//#region author
app.post("/insert-author", async (request, response) => {
  let [fields, files] = await Parser.parseForm(request)
  connection.query(
  ` INSERT INTO authors (author_name, country, style_movement, time_period, note, dataset_id) 
    VALUES (?, ?, ?, ?, ?, ?)
  `,
  [fields.author_name, fields.country, fields.style_movement, fields.time_period, fields.note, fields.dataset_id]
  ,
  function(error, rows, fields) {
    if(error)
      console.log("Query error: ", error.message)
    else 
      {
        console.log("Success: Author added.")
        response.writeHead(200, "OK")
        response.send()
      }
  })
})

app.post("/update-author", async (request, response) => {
  let [fields, files] = await Parser.parseForm(request)
  let id = +fields.id
  connection.query(
    ` UPDATE authors SET author_name = ?, country = ?, style_movement = ?, time_period = ?, note = ?
      WHERE id = ?
    `,
    [fields.author_name, fields.country, fields.style_movement, fields.time_period, fields.note, id]
    ,
    function(error, rows, fields) {
      if(error)
        console.log("Query error: ", error.message)
      else {
        console.log("Success: Author updated.")
        response.writeHead(200, "OK")
        response.send()
      }
    }
  )
})

app.post("/delete-author", async (request, response) => {
  let [fields, files] = await Parser.parseForm(request)
  connection.query(
    `DELETE FROM authors WHERE author_name = ?`,
    [fields.author_name],
    function(error, rows, fields) {
      if(error)
        console.log("Query error: ", error.message)
      else {
        console.log("Success: Author deleted.")
        response.writeHead(200, "OK")
        response.send()
      }
    }
  )
})
//#endregion

app.post("/upload-file", async (request, response) => {
  let form = new multiparty.Form({uploadDir: "./uploads/", autoFiles: true})
  form.parse(request, function(err, fields, files) {
    let file = files.file[0]
    
    let ind = file.originalFilename.lastIndexOf(".")
    let extension = file.originalFilename.substring(ind)
    
    let fileName = fields.author_id + "_" + Math.random() * 1_000_000 + extension
    let newPath = "./uploads/" + fileName

    fs.rename(file.path, newPath, (err) => {
      if(err)
        console.log(err)
    })

    let returnFile = fs.readFile(newPath, 'binary', (error, data) => {
      if(error) 
        console.error(error)
      else
        console.log(data)
    })

    response.writeHead(200, {'Content-Type': `application/json`})
    response.write(JSON.stringify({newPath}))
    response.end()

  });
})

class Parser {
  static async parseForm(request) {
    let form = formidable({})
    let formData = await new Promise((resolve, reject) => {
      form.parse(request, function (error, fields, files) {
        if(error) {
          reject(error)
          return
        }
        resolve({fields: fields, files: files})
      })
    })
    return [formData.fields, formData.files]
  }
}