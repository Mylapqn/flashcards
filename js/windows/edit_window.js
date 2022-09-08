class EditWindow extends ProgramWindow {
  constructor(element) {
    super("EditWindow", element)
    this.elements = {
      datasetLabel: Query.first("#editor-current-dataset-text-label")
    }
    this.selectedAuthorId = null
    this.datasetId =      null
    this.datasetName =    null
    this.mode = new State(
      "add",
      "edit",
    )
  }
  //#region input
  handleClick(e) {
    let clicked = {
      addWorkBtn: e.target.closest(".add-work-button"),
      addItemBtn: e.target.closest(".add-item-button"),
      item: e.target.closest(".item"),
      deleteItemBtn: e.target.closest(".item .delete-icon"),
      fillPreviousBtn: e.target.closest("button.fill-with-previous"),
      selectAllTextBtn: e.target.closest("button.select-all-text"),
    }
    if(clicked.addWorkBtn)
      this.createWorkHTML()
    if(clicked.item)
      this.selectAuthor(clicked.item.dataset.id, clicked.item)
    if(clicked.addItemBtn)
      this.createAuthor()
    if(clicked.deleteItemBtn) 
      this.deleteAuthor(clicked.item.dataset.author)
    if(clicked.fillPreviousBtn)
      this.fillPreviousValue(clicked.fillPreviousBtn)
    if(clicked.selectAllTextBtn)
      clicked.selectAllTextBtn.closest(".input-field").querySelector("input[type='text']").select()
  }
  handleKeydown(e) {
    let focused = document.activeElement
    if(focused.tagName === "INPUT" || focused.tagName === "TEXTAREA")
      return
    if(e.code === "KeyA") 
      this.createWork()
  }
  //#endregion
  loadDataset(datasetId, datasetName) {
    console.log(datasetId)
    this.datasetId = +datasetId
    this.datasetName = datasetName
    Server.getDatasetData(this.datasetId)
      .then((rows) => {
        this.refreshData(rows)
      })
  }
  refreshData(rows) {
    this.dataset = rows
    Query.allOn(this.element, ".item").forEach(item => item.remove())
    rows.forEach(row => this.createAuthorHTML(row))
  }
  createAuthor() {
    console.log("create author");
    let data = {}
    Query.allOn(this.element, "#edit-form input[type='text']").forEach(input => {
      data[input.name] = input.value
    })
    data["dataset_id"] = this.datasetId
    this.parseInputData(data)
    Server.insertAuthor(data)
      .then((rows) => this.refreshData(rows))
    this.updatePreviousValues()
    this.clearInputs()
  }
  createAuthorHTML(author) {
    console.log("created author item for", author.author_name)
    let item            = HTML.Element("div", "item", null, null, [["author", author.author_name], ["id", author.id]])
    let widgetSort      = HTML.Element("div", "item-sort-widget")
    let iconSort        = HTML.Element("div", "icon icon-4x sort-widget-icon")
    let iconDelete      = HTML.Element("div", "icon icon-3x delete-icon")
    let header          = HTML.Element("div", "item-header")
    let title          = HTML.Element("div", "item-title", author.author_name)
    let workTitles      = HTML.Element("div", "item-works-titles secondary-text", author.country)
    // let workTitles =  HTML.Element("div", "item-works-titles secondary-text", author.works.map(w => w.title).join(" | "))
    widgetSort.append(iconSort)
    header.append(title, iconDelete)
    item.append(widgetSort, header, workTitles)
    Query.on(this.element, ".item-list")
         .append(item)
  }
  selectAuthor(authorId, element) {
    this.selectedAuthorId = +authorId
    Query.allOn(this.element, ".item.active").forEach(item => item.classList.remove("active"))
    element.classList.add("active")
    this.setMode("edit")
  }
  deleteAuthor(authorName) {
    if(window.confirm("Erase " + authorName + " from history books?"))
      Server.deleteAuthor(authorName, this.datasetId)
        .then((rows) => this.refreshData(rows))
  }
  createWork() {
    // let params = ["Work1", "Description", this.selectedAuthor.name]
    // this.selectedAuthor.works.push(
    //   new Work(...params))
    // this.createWorkHTML(...params)
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
      throw "unfinished"
      // let author = this.selectedAuthorId || Query.on(this.element, `input[name='author_name']`).value
      // Server.sendFile(fileInput.files[0], )
    }
    Query.on(this.element, ".works").append(item)
    return item
  }
  deleteWork(work) {
    throw "unfinished"
  }
  setMode(mode) {
    if(!this.mode.set(mode)) 
      return
    let author = this.dataset.find(author => author.id === this.selectedAuthorId)
    if(this.mode.is("add")) {
      Query.on(this.element, ".main-heading h1").innerText = "Add new item"
      Query.on(this.element, "button.add-item-button").innerText = "Add item"
    }
    if(this.mode.is("edit")) {
      Query.on(this.element, ".main-heading h1").innerText = `Edit item: ${author.author_name}`
      Query.on(this.element, "button.add-item-button").innerText = "Edit item"
      Query
      .allOn(this.element, "input[type='text']")
      .forEach(input => {
        input.value = author[input.name]
      })
    }
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
  parseInputData(data) {
    console.log("before", data)
    for(let key in data) {
      data[key] = this["parse_" + key](data[key])
    }
    console.log("after", data)
  }
  parse_author_name(input) {
    let 
    output = input.toLocaleLowerCase()
    output = output.capitalizeEach()
    output = output.filterUnwantedChars("◘•○#-–—")
    return output
  }
  parse_country(input) {
    let output = input.capitalizeEnglishCountryName()
    return output      
  }
  parse_time_period(input) {
    let output = input.toLocaleLowerCase()
    let number = +output.replace(/[^0-9\.]+/g, '')
    //století range
    if(output.includes("-") || output.includes("–") || output.includes("—")) {
      let chars = "-–—"
      let words = []
      for(let char of chars) {
        words = output.split(char)
        if(words.length > 1) break
      }
      let count = 0
      words.forEach(w => {
        if(w === "") return
        let num = +w.replace(/[^0-9\.]+/g, '')
        if(num > 1 || num <= 1)
          count++
      })
      console.log(count, words[0], words[1])
      if(count > 1 && (words[0] <= 21 && words[1] <= 21))
        return words[0] + " - " + words[1] + ". století"
    }
    if(number <= 21)
      return number + ". století"
    output = output.replaceAll("–", "-").replaceAll("—", "-")
    return output    
  }
  parse_style_movement(input) {
    let output = input
    return output    
  }
  parse_note(input) {
    let output = input
    return output    
  }
  parse_dataset_id(input) {
    let output = input
    return output    
  }
  //#endregion
}