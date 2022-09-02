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
      this.createDataset(
        window.prompt("Enter dataset name", "Bob's Balls"), 
        window.prompt("Enter dataset description", "They're fluffy and soft, like a children's toy.")
      )
    if(clicked.editIcon) {
      program.windows.set(editWindow)
      editWindow.loadDataset(clicked.datasetCard.dataset.datasetname)
    }
    if(clicked.deleteIcon) {
      this.deleteDataset(clicked.datasetCard.dataset.datasetname)
    }
  }
  createDataset(datasetName, datasetDescription) {
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
    let container = HTML.Element("div", "dataset-item")
    let buttons = HTML.Element("div", "buttons")
    let description = HTML.Element("div", "dataset-description")
    let header = HTML.Element("div", "dataset-header")
    let iconEdit= HTML.Element("div", "icon icon-3x edit-icon")
    let iconDelete = HTML.Element("div", "icon icon-3x delete-icon")

    let title = HTML.Element("span", "dataset-title")
    let itemCount = HTML.Element("span", "dataset-item-count")
    header.append(title, itemCount)
    buttons.append(iconEdit, iconDelete)
    container.append(buttons, header, description)

    title.innerText = datasetName
    description.innerText = datasetDescription
    itemCount.innerText = 0 + " items"
    container.dataset.datasetname = datasetName
    this.element.querySelector(".dataset-list").append(container)
  }
}