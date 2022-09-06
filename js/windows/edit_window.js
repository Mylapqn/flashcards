class EditWindow extends ProgramWindow {
  constructor(element) {
    super("EditWindow", element)
    this.elements = {
      datasetLabel: Query.first("#editor-current-dataset-text-label")
    }
    this.selectedAuthor = null
    this.dataset =        null
    this.datasetId =      null
    this.datasetName =    null
  }
  handleClick(e) {
    let clicked = {
      addWorkBtn: e.target.closest(".add-work-button"),
      addItemBtn: e.target.closest(".add-item-button"),
      item: e.target.closest(".item"),
      deleteItemBtn: e.target.closest(".item .delete-icon"),
      fillPreviousBtn: e.target.closest("button.fill-with-previous"),
    }
    if(clicked.addWorkBtn)
      this.createWorkHTML()
    if(clicked.item)
      this.selectAuthor(clicked.item.dataset.author, clicked.item)
    if(clicked.addItemBtn)
      this.createAuthor()
    if(clicked.deleteItemBtn) 
      this.deleteAuthor(clicked.item.dataset.author)
    if(clicked.fillPreviousBtn)
      this.fillPreviousValue(clicked.fillPreviousBtn)
  }
  handleKeydown(e) {
    let focused = document.activeElement
    if(focused.tagName === "INPUT" || focused.tagName === "TEXTAREA")
      return
    if(e.code === "KeyA") 
      this.createWork()
  }
  loadDataset(datasetName, id) {
    this.datasetName = datasetName
    this.datasetId = +id
    Server.getDatasetData(datasetName, this)
    // this.elements.datasetLabel.innerText = datasetName
    // this.dataset = data[datasetName]
    // for(let author of this.dataset)
    //   this.createAuthorItem(author)
    // console.warn("use refreshView with database data", this.refreshView)
  }
  receiveData(rows) {
    rows.forEach(row => {
      this.createAuthorHTML(row)
    })
  }
  refreshView(databaseData) {

  }
  createAuthor() {
    console.log("create author");
    let formData = new FormData()
    Query.allOn(this.element, "#edit-form input[type='text']").forEach(input => {
      formData.append(input.name, input.value)
    })
    formData.append("dataset_id", this.datasetId)
    Server.insertAuthor(formData)
    this.updatePreviousValues()
    this.clearInputs()
  }
  createAuthorHTML(author) {
    console.log("created author item for", author.author_name)
    let item =        HTML.Element("div", "item", null, null, [["author", author.author_name], /* ["draggable", "true"], ["dragtype", "item"] */])
    let widgetSort =  HTML.Element("div", "item-sort-widget")
    let iconSort =    HTML.Element("div", "icon icon-4x sort-widget-icon")
    let iconDelete=   HTML.Element("div", "icon icon-3x delete-icon")
    let header =      HTML.Element("div", "item-header")
    let title =       HTML.Element("div", "item-title", author.author_name)
    let workTitles =  HTML.Element("div", "item-works-titles secondary-text", "!!!temporary text!!!")
    // let workTitles =  HTML.Element("div", "item-works-titles secondary-text", author.works.map(w => w.title).join(" | "))
    widgetSort.append(iconSort)
    header.append(title, iconDelete)
    item.append(widgetSort, header, workTitles)
    Query.on(this.element, ".item-list")
         .append(item)
  }
  selectAuthor(authorName, element) {
    // this.selectedAuthor = this.dataset.find(author => author.author_name === authorName)
    // Query.allOn(this.element, ".item")
    //      .forEach(
    //         item => 
    //         item.classList.remove("active")
    //      )
    // element.classList.add("active")
    // console.log(this.selectedAuthor)
  }
  deleteAuthor(authorName) {
    // let author = this.dataset.find(author => author.name === authorName)
    // this.dataset.remove(author)
    // Query.on(this.element, 
    //   `.item[data-author="${authorName}"]`)
    //   .remove()
  }
  deleteAuthorItem(authorName) {

  }
  createWork() {
    console.warn("createWork() not finished")
    let params = ["Work1", "Description", this.selectedAuthor.name]
    this.selectedAuthor.works.push(
      new Work(...params))
    this.createWorkHTML(...params)
  }
  createWorkHTML(workTitle, workDescription, authorName) {
    let item =          HTML.Element("div", "work")
    let title =         HTML.Element("div", "work-title", workTitle)
    let button =        HTML.Element("div", "add-image-button")
    let iconPlus =      HTML.Element("div", "icon-4x plus-sign")
    let iconDelete =    HTML.Element("div", "icon icon-3x delete-icon")
    let barVertical =   HTML.Element("div", "bar-vertical")
    let barhorizontal = HTML.Element("div", "bar-horizontal")
    let addImageText =  HTML.Element("div", "add-image-text", "ADD IMAGE")
    let input =         HTML.Element("input", "", "", [["type", "text"], ["placeholder", "Name"]])
    let fileInput =     HTML.Element("input", "add-work-image-input", "", [["type", "file"], ["name", "image"], ["id", "image"]])
    iconPlus.append(barVertical, barhorizontal)
    button.append(fileInput, iconPlus, addImageText)
    title.append(input, iconDelete)
    item.append(title, button)
    fileInput.onchange = () => {
      let author = this.selectedAuthor || Query.on(this.element, `input[name='author_name']`).value
      Server.sendFile(fileInput.files[0], )
    }
    Query.on(this.element, ".works").append(item)
    return item
  }
  deleteWork(work) {

  }
  fillPreviousValue(button) {
    let previousValue = Query.on(this.element, `.previous-value[data-forinput='${button.dataset.forinput}']`).innerText
    Query.on(this.element, `input[name='${button.dataset.forinput}']`).value = previousValue
  }
  updatePreviousValues() {
    Query
    .allOn(this.element, ".fill-with-previous-wrapper .previous-value")
    .forEach(val => {
      let prevValue = Query.on(this.element, "input[type='text'][name='" + val.dataset.forinput + "'").value
      if(prevValue)
        val.innerText = prevValue
    })
  }
  clearInputs() {
    Query
    .allOn(this.element, "input[type='text']")
    .forEach(input => {
      input.value = ""
    })
  }
  //#region parse input
  parseAuthorName(input) {
    let output = input.capitalizeEach()
    return output
  }
  //#endregion
}