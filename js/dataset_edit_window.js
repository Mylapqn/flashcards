class DatasetEditWindow extends ProgramWindow {
  constructor(element) {
    super("DatasetEditWindow", element)
  }
  handleMousedown(e) {
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
      editWindow.loadDataset(clicked.datasetCard.dataset.datasetname)
    }
    if(clicked.deleteIcon) {
      this.deleteDataset(clicked.datasetCard.dataset.datasetname)
    }
  }
  handleKeydown(e) {
    if(e.code === "KeyA")
      this.createDataset()
  }
  createDataset() {
    let datasetName = window.prompt("Enter dataset name", "Bob's Balls")
    let datasetDescription = window.prompt("Enter dataset description", "They're fluffy and soft, like a children's toy.")
    if(!datasetName) 
      datasetName = "DATASET" + Object.keys(data).length
    if(data[datasetName]) 
      return console.log("Dataset already exists")
    data[datasetName] = []
    this.createDatasetHTML(datasetName, datasetDescription) 
  }
  deleteDataset(datasetName) {
    if(window.confirm("Delete " + datasetName + "?")) {
      delete data[datasetName]
      Query.on(this.element, `.dataset-item[data-datasetname="${datasetName}"]`)
      .remove()
    }
  }
  createDatasetHTML(datasetName, datasetDescription) {
    let container   = HTML.Element("div", "dataset-item", "", [["tabindex", "0"]], [["datasetname", datasetName]])
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