class EditWindow extends ProgramWindow {
  constructor(element) {
    super("EditWindow", element)
    this.elements = {
      datasetLabel: Query.first("#editor-current-dataset-text-label")
    }
    this.selectedAuthor = null
  }
  handleMousedown(e) {
    let target = e.target
    let clicked = {
      addWorkBtn: target.closest(".add-work-button")
    }
    if(clicked.addWorkBtn)
      this.createWorkItem()
  }
  handleKeydown(e) {
    let focused = document.activeElement
    if(focused.tagName === "INPUT" || focused.tagName === "TEXTAREA")
      return
    if(e.code === "KeyA") this.createWork()
  }
  loadDataset(datasetName) {
    this.elements.datasetLabel.innerText = datasetName
    this.dataset = data[datasetName]
    for(let author of this.dataset)
      this.createAuthor(author)
  }
  selectAuthor(authorName) {
    this.selectedAuthor = this.dataset.find(item => item.name === authorName)
  }
  createAuthorItem(author) {
    console.log(author)
  }
  createAuthor(itemData) {
    this.createAuthorItem(author)
  }
  createWork() {
    let params = ["Work1", "Description", this.selectedAuthor.name]
    this.selectedAuthor.works.push(
      new Work(...params))
    this.createWorkItem(...params)
  }
  createWorkItem(workTitle, workDescription, authorName) {
    let item = HTML.Element("div", "work")
    let title = HTML.Element("div", "work-title", workTitle)
    let button = HTML.Element("div", "add-image-button")
    let iconPlus = HTML.Element("div", "icon-4x plus-sign")
    let iconDelete = HTML.Element("div", "icon icon-3x delete-icon")
    let barVertical = HTML.Element("div", "bar-vertical")
    let barhorizontal = HTML.Element("div", "bar-horizontal")
    let addImageText = HTML.Element("div", "add-image-text", "ADD IMAGE")
    let input = HTML.Element("input", "", "", [["type", "text"], ["placeholder", "Name"]])
    iconPlus.append(barVertical, barhorizontal)
    button.append(iconPlus, addImageText)
    title.append(input, iconDelete)
    item.append(title, button)
    Query.on(this.element, ".works")
         .append(item)
    return item
  }
  deleteWork(work) {

  }
  //#region parse input
  parseAuthorName(input) {
    let output = input.capitalizeEach()
    return output
  }
  //#endregion
}