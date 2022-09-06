const express = require("express")
const fileUpload = require("express-fileupload")
const bodyParser = require("body-parser")
const morgan = require("morgan")
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


let port = 5501
let app = express()
app.listen(port)

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
)
/* {
  //this makes the file upload work, but the form parsing breaks if you enable this
  //probably issue with bodyParser, according to internet research 🤓
  app.use(fileUpload({
    createParentPath: true
  }))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(morgan('dev'));
} */


app.get("/get-dataset-data", (request, response) => {
  let form = formidable({})
  let datasetName = 0
  form.parse(request, function (error, fields, files) {
    if(error) {
      console.log("form parsing error:", error.message)
    }
    datasetName = fields.datasetName
  })
  connection.query("SELECT * FROM authors", function(error, rows, fields) {
    if(error)
      console.log(error)
    else 
      response.send(JSON.stringify(rows))
  })
})

app.get("/get-datasets", (request, response) => {
  let form = formidable({})
  let datasetName = 0
  form.parse(request, function (error, fields, files) {
    if(error) {
      console.log("form parsing error:", error.message)
    }
    datasetName = fields.datasetName
  })
  connection.query("SELECT * FROM datasets", function(error, rows, fields) {
    if(error)
      console.log(error)
    else 
      response.send(JSON.stringify(rows))
  })
})

app.post("/add-author", (request, response) => {
  let form = formidable({})
  form.parse(request, function (error, fields, files) {
    if(error) {
      console.log(error.message)
      return
    }
    console.log("form fields: ", fields);
    connection.query(
    ` INSERT INTO authors (author_name, country, style_movement, time_period, note, dataset_id) 
      VALUES ('${fields.author_name}', '${fields.country}', '${fields.style_movement}', '${fields.time_period}', '${fields.note}', '${fields.dataset_id}')
    `,
    function(error, rows, fields) {
      if(error)
        console.log("Query error: ", error.message)
      else 
        console.log("Query successful")
    })
  })
})
app.post("/add-file", (request, response) => {
  try {
    if(!request.files) {
      response.send({
        status: false,
        message: "No file uploaded."
      })
      console.log('no files found')
      return
    }
    let form = formidable({})
    let author = ""
    form.parse(request, function (error, fields, files) {
      if(error) {
        console.log(error.message)
        return
      }
      author = fields.author_name
    })
    // console.log(request.files)
    let image = request.files.file
    let filename = Math.random()*1_000_000
    image.mv("./uploads/" + filename)

    response.writeHead(200, "OK")
    response.write(filename + "\n\n")
    response.end("End of message.")
  }
  catch (error) {
    // console.log(error.message)
    response.status(500).send(error);
  }
})

app.post("/add-dataset", (request, response) => {
  let form = formidable({})
  form.parse(request, function (error, fields, files) {
    if(error) {
      console.log(error.message)
      return
    }
    console.log("form fields: ", fields);
    //escape quotes
    let description = fields.dataset_description.replaceAll("'", "''").replaceAll('"', '""')
    let dataset_name = fields.dataset_name.replaceAll("'", "''").replaceAll('"', '""')
    connection.query(
    ` INSERT INTO datasets (dataset_name, dataset_description) 
      VALUES ('${dataset_name}','${description}')
    `,
    function(error, rows, fields) {
      if(error)
        console.log("Query error: ", error.message)
      else 
        console.log("Query successful")
    })
  })
})

let connection = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "prXb@ayj!66@i!Ak",
})
connection.query("USE flashcards", function(error, rows, fields) {
  if(error)
    console.log(error)
  else 
    console.log("Database connection successful")
})

class DB {
  static getDataset(index) {

  }
}