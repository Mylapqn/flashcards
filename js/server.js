class Server {
  static createFormData(object) {
    let formData = new FormData()
    for(let key in object)
      formData.append(key, object[key])
    return formData
  }
  static async insertAuthor(data) {
    let formData = this.createFormData(data)
    const response = await fetch("http://127.0.0.1:5501/insert-author", {
      method: "POST",
      mode: "cors",
      body: formData
    })
    let rows = await this.getDatasetData(data.dataset_id)
    return rows
  }
  static async updateAuthor(data) {
    throw "not fully implemented"
    let formData = this.createFormData(data)
    const response = await fetch("http://127.0.0.1:5501/update-author", {
      method: "POST",
      mode: "cors",
      body: formData
    })
    let rows = await this.getDatasetData(data.dataset_id)
    return rows
  }
  static async deleteAuthor(author_name, dataset_id) {
    let formData = this.createFormData({author_name: author_name})
    const response = await fetch("http://127.0.0.1:5501/delete-author", {
      method: "POST",
      mode: "cors",
      body: formData
    })
    let rows = await this.getDatasetData(dataset_id)
    return rows
  }
  static sendFile(file, author) {
    throw "not fully implemented"
    // let formData = new FormData()
    // formData.append("file", file)
    // formData.append("author_name", author)
    // let xhr = new XMLHttpRequest()
    // xhr.open("POST", "http://127.0.0.1:5501/add-file", true)
    // xhr.send(formData)
  }
  static async getDatasetData(datasetId) {
    const response = await fetch("http://127.0.0.1:5501/get-dataset-data", {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dataset_id: datasetId
      })
    })
    return response.json()
  }
  static async getDatasets() {
    const response = await fetch("http://127.0.0.1:5501/get-datasets", {
      method: "GET",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
    })
    return response.json()
  }
  static async insertDataset(data) {
    console.log(data)
    let formData = this.createFormData(data)
    const response = await fetch("http://127.0.0.1:5501/insert-dataset", {
      method: "POST",
      mode: "cors",
      body: formData
    })
    let rows = await this.getDatasets()
    return rows
  }
  static async deleteDataset(datasetId) {
    const response = await fetch("http://127.0.0.1:5501/delete-dataset", {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dataset_id: datasetId
      })
    })
    let rows = await this.getDatasets()
    return rows
  }
}