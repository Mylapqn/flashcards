class EditWindow extends ProgramWindow {
  constructor(element) {
    super("EditWindow", element)
    this.elements = {
      datasetLabel: Query.first("#editor-current-dataset-text-label")
    }
    this.selectedAuthor = null
    this.dataset = null
  }
  handleClick(e) {
    let clicked = {
      addWorkBtn: e.target.closest(".add-work-button"),
      addItemBtn: e.target.closest(".add-item-button"),
      item: e.target.closest(".item"),
      deleteItemBtn: e.target.closest(".item .delete-icon"),
    }
    if(clicked.addWorkBtn)
      this.createWorkItem()
    if(clicked.item)
      this.selectAuthor(clicked.item.dataset.author, clicked.item)
    if(clicked.addItemBtn)
      this.createAuthor(this.selectedAuthor)
    if(clicked.deleteItemBtn) {
      this.deleteAuthor(clicked.item.dataset.author)
    }
  }
  handleKeydown(e) {
    let focused = document.activeElement
    if(focused.tagName === "INPUT" || focused.tagName === "TEXTAREA")
      return
    if(e.code === "KeyA") 
      this.createWork()
  }
  loadDataset(datasetName) {
    this.elements.datasetLabel.innerText = datasetName
    this.dataset = data[datasetName]
    for(let author of this.dataset)
      this.createAuthorItem(author)
    console.warn("use refreshView with database data", this.refreshView)
  }
  refreshView(databaseData) {

  }
  createAuthor(author) {
    if(this.dataset.find(auth => auth.name === author.name))
      return console.info("Author already exists.")
    this.createAuthorItem(author)
  }
  createAuthorItem(author) {
    console.log("created author item for", author.name)
    let item =        HTML.Element("div", "item", null, null, [["author", author.name]])
    let widgetSort =  HTML.Element("div", "item-sort-widget")
    let iconSort =    HTML.Element("div", "icon icon-4x sort-widget-icon")
    let iconDelete=   HTML.Element("div", "icon icon-3x delete-icon")
    let header =      HTML.Element("div", "item-header")
    let title =       HTML.Element("div", "item-title", author.name)
    let workTitles =  HTML.Element("div", "item-works-titles secondary-text", author.works.map(w => w.title).join(" | "))
    widgetSort.append(iconSort)
    header.append(title, iconDelete)
    item.append(widgetSort, header, workTitles)
    Query.on(this.element, ".item-list")
         .append(item)
  }
  selectAuthor(authorName, element) {
    this.selectedAuthor = this.dataset.find(author => author.name === authorName)
    Query.allOn(this.element, ".item")
         .forEach(
            item => 
            item.classList.remove("active")
         )
    element.classList.add("active")
    console.log(this.selectedAuthor)
  }
  deleteAuthor(authorName) {
    let author = this.dataset.find(author => author.name === authorName)
    this.dataset.remove(author)
    Query.on(this.element, 
      `.item[data-author="${authorName}"]`)
      .remove()

  }
  deleteAuthorItem(authorName) {

  }
  createWork() {
    console.warn("createWork() not finished")
    let params = ["Work1", "Description", this.selectedAuthor.name]
    this.selectedAuthor.works.push(
      new Work(...params))
    this.createWorkItem(...params)
  }
  createWorkItem(workTitle, workDescription, authorName) {
    let item =          HTML.Element("div", "work")
    let title =         HTML.Element("div", "work-title", workTitle)
    let button =        HTML.Element("div", "add-image-button")
    let iconPlus =      HTML.Element("div", "icon-4x plus-sign")
    let iconDelete =    HTML.Element("div", "icon icon-3x delete-icon")
    let barVertical =   HTML.Element("div", "bar-vertical")
    let barhorizontal = HTML.Element("div", "bar-horizontal")
    let addImageText =  HTML.Element("div", "add-image-text", "ADD IMAGE")
    let input =         HTML.Element("input", "", "", [["type", "text"], ["placeholder", "Name"]])
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