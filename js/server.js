class Server {
  static insertAuthor(formData) {
    console.log("Request to 5501")
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "http://127.0.0.1:5501/add-author", true)
    xhr.send(formData)
  }
  static alterAuthor(formData) {
    console.log("Request to 5501")
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "http://127.0.0.1:5501/add-author", true)
    xhr.send(formData)
  }
  static sendFile(file, author) {
    console.log("Request to 5501")
    let formData = new FormData()
    formData.append("file", file)
    formData.append("author_name", author)
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "http://127.0.0.1:5501/add-file", true)
    xhr.send(formData)
    xhr.onreadystatechange = (event) => {
      console.log(event)
    }
  }
  static getDatasetData(datasetName, returnTo) {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", "http://127.0.0.1:5501/get-dataset-data", true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(
      JSON.stringify(
        {datasetName: datasetName}
      )
    )
    xhr.onreadystatechange = (event) => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        const status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          // The request has been completed successfully
          console.log(JSON.parse(xhr.responseText));
          returnTo.receiveData(JSON.parse(xhr.responseText))
        } else {
          console.log("Error with request.")
        }
      }
    }
  }
  static getDatasets(returnTo) {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", "http://127.0.0.1:5501/get-datasets", true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send()
    xhr.onreadystatechange = (event) => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        const status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          // The request has been completed successfully
          console.log(JSON.parse(xhr.responseText));
          returnTo.receiveData(JSON.parse(xhr.responseText))
        } else {
          console.log("Error with request.")
        }
      }
    }
  }
  static insertDataset(datasetName, datasetDescription) {
    let formData = new FormData()
    formData.append("dataset_name", datasetName)
    formData.append("dataset_description", datasetDescription)
    console.log("Request to 5501")
    let xhr = new XMLHttpRequest()
    xhr.open("POST", "http://127.0.0.1:5501/add-dataset", true)
    xhr.send(formData)
    xhr.onreadystatechange = (event) => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        const status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          // The request has been completed successfully
          console.log(JSON.parse(xhr.responseText));
        } else {
          console.log("Error with request.")
        }
      }
    }
  }
  static deleteDataset(datasetName) {

  }
}