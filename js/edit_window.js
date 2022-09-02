class EditWindow extends ProgramWindow {
  constructor(element) {
    super("EditWindow", element)
    this.elements = {
      datasetLabel: Query.Q("#editor-current-dataset-text-label")
    }
  }
  loadDataset(datasetName) {
    this.elements.datasetLabel.innerText = datasetName
    for(let author of data[datasetName])
      this.createAuthor(author)
  }
  createAuthorItem(author) {
    console.log(author)
  }
  createAuthor(itemData) {
    this.createAuthorItem(author)
  }
  //#region parse input
  parseAuthorName(input) {
    let words = input.split(" ")
    words = words.map(w => w.capitalize())
    let output = words.join(' ')
    return output
  }
  //#endregion
}