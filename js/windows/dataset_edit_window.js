class DatasetEditWindow extends ProgramWindow {
  constructor(element) {
    super("DatasetEditWindow", element)
    this.loadDatasets()
  }
  handleClick(e) {
    let clicked = {
      addDatasetBtn: e.target.closest(".add-dataset-button"),
      editIcon: e.target.closest(".edit-icon"),
      deleteIcon: e.target.closest(".delete-icon"),
      datasetCard: e.target.closest(".dataset-item")
    }
    if(clicked.addDatasetBtn)
      this.createDataset()
    if(clicked.editIcon) {
      program.windows.set(editWindow)
      editWindow.loadDataset(clicked.datasetCard.dataset.datasetid, clicked.datasetCard.dataset.datasetname)
    }
    if(clicked.deleteIcon) {
      this.deleteDataset(clicked.datasetCard.dataset.datasetid, document.activeElement.dataset.datasetname)
    }
    // let watched = [
    //   {
    //     element: e.target.closest(".add-dataset-button"),
    //     action() {
    //       this.createDataset()
    //     }
    //   },
    //   {
    //     element: e.target.closest(".edit-icon"),
    //     action() {
    //       program.windows.set(editWindow)
    //       editWindow.loadDataset(clicked.datasetCard.dataset.datasetid, clicked.datasetCard.dataset.datasetname)
    //     }
    //   },
    //   {
    //     element: e.target.closest(".delete-icon"),
    //     action() {
    //       this.deleteDataset(clicked.datasetCard.dataset.datasetid, document.activeElement.dataset.datasetname)
    //     }
    //   },
    // ]
    // //experiment- get the most specific element clicked
    // let clicked = []
    // for(let elem in watched)
    //   if(elem) clicked.push(elem)

  }
  handleKeydown(e) {
    if(e.code === "KeyA")
      this.createDataset()
    if(e.code === "Backspace")
      this.deleteDataset(document.activeElement.dataset.datasetid, document.activeElement.dataset.datasetname)
  }
  createDataset() {
    let data = {}
    data.dataset_name = window.prompt("Enter dataset name", "Bob")
    data.dataset_description = window.prompt("Enter dataset description", "Very cute and handsome.") || ""
    if(!data.dataset_name)  
      return
    Server.insertDataset(data)
      .then((rows) => this.refreshView(rows))
  }
  refreshView(rows) {
    console.log('refresh')
    Query.allOn(this.element, ".dataset-item").forEach(
      item => item.remove())
    rows.forEach(row => {
      this.createDatasetHTML(row.id, row.dataset_name, row.dataset_description)
    })
  }
  deleteDataset(datasetId, datasetName) {
    if(window.confirm("Delete " + datasetName + "?")) {
      Server.deleteDataset(datasetId)
        .then((rows) => this.refreshView(rows))
      Query.on(this.element, `.dataset-item[data-datasetid="${datasetId}"]`)
      .remove()
    }
  }
  loadDatasets() {
    Server.getDatasets()
      .then((rows) => this.refreshView(rows))
  }
  createDatasetHTML(datasetId, datasetName, datasetDescription) {
    let container   = HTML.Element("div", "dataset-item", "", [["tabindex", "0"]], [["datasetname", datasetName], ["datasetid", datasetId]])
    let buttons     = HTML.Element("div", "buttons")
    let description = HTML.Element("div", "dataset-description", datasetDescription)
    let header      = HTML.Element("div", "dataset-header")
    let iconEdit    = HTML.Element("div", "icon icon-3x edit-icon")
    let iconDelete  = HTML.Element("div", "icon icon-3x delete-icon")
    let title       = HTML.Element("span", "dataset-title", datasetName)
    let itemCount   = HTML.Element("span", "dataset-item-count", 0 + " items")
    header.append(title, itemCount)
    buttons.append(iconEdit, iconDelete)
    container.append(buttons, header, description)
    this.element.querySelector(".dataset-list").append(container)
  }
}