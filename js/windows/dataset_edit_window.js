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
      editWindow.loadDataset(clicked.datasetCard.dataset.datasetname, clicked.datasetCard.dataset.id)
    }
    if(clicked.deleteIcon) {
      this.deleteDataset(clicked.datasetCard.dataset.datasetname)
    }
  }
  handleKeydown(e) {
    if(e.code === "KeyA")
      this.createDataset()
    if(e.code === "Backspace")
      this.deleteDataset(document.activeElement.dataset.datasetname)
  }
  createDataset() {
    let datasetName = window.prompt("Enter dataset name", "Marshmellows")
    let datasetDescription = window.prompt("Enter dataset description", "They're fluffy and soft.") || ""
    if(!datasetName)  
      return
    Server.insertDataset(datasetName, datasetDescription)
  }
  deleteDataset(datasetName) {
    if(window.confirm("Delete " + datasetName + "?")) {
      Server.deleteDataset(datasetName)
      Query.on(this.element, `.dataset-item[data-datasetname="${datasetName}"]`)
      .remove()
    }
  }
  loadDatasets() {
    //GET data from server and update the HTML
    Server.getDatasets(this)
  }
  receiveData(data) {
    console.log(data)
    for(let key in data) 
      if(data[key].dataset_name)
        this.createDatasetHTML(data[key].id, data[key].dataset_name, data[key].dataset_description)
  }
  createDatasetHTML(id, datasetName, datasetDescription) {
    let container   = HTML.Element("div", "dataset-item", "", [["tabindex", "0"]], [["datasetname", datasetName], ["id", id]])
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