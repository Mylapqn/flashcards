class DatasetEditWindow extends ProgramWindow {
  constructor(element) {
    super("DatasetEditWindow", element)
    this.loadDatasets()
  }
  //#region input
  handleClick(e) {
    let clicked = {
      addDatasetBtn: e.target.closest(".add-dataset-button"),
      editIcon: e.target.closest(".edit-icon"),
      deleteIcon: e.target.closest(".delete-icon"),
      datasetCard: e.target.closest(".dataset-item"),
    }
    if(clicked.addDatasetBtn) {
      this.createDataset()
      return
    }
    if(clicked.editIcon) {
      this.updateDataset(clicked.datasetCard)
      return
    }
    if(clicked.deleteIcon) {
      this.deleteDataset(clicked.datasetCard.dataset.datasetid, document.activeElement.dataset.datasetname)
      return
    }
    if(clicked.datasetCard) {
      program.windows.set(editWindow)
      editWindow.loadDataset(clicked.datasetCard.dataset.datasetid, clicked.datasetCard.dataset.datasetname)
      return
    }
  }
  handleKeydown(e) {
    if(e.code === "KeyA")
      this.createDataset()
    if(e.code === "Backspace")
      this.deleteDataset(document.activeElement.dataset.datasetid, document.activeElement.dataset.datasetname)
  }
  //#endregion
  refreshView(rows) {
    Query.allOn(this.element, ".dataset-item").forEach(
      item => item.remove())
    rows.forEach(async row => {
      let count = await Server.countDatasetItems(row.id)
      this.createDatasetHTML(row.id, row.dataset_name, row.dataset_description, count)
    })
  }
  createDataset() {
    let data = {}
    data.dataset_name = window.prompt("Enter dataset name", "Bob")
    if(!data.dataset_name)  
      return
    data.dataset_description = window.prompt("Enter dataset description", "Very cute and handsome.") || ""
    Server.insertDataset(data)
      .then((rows) => this.refreshView(rows))
  }
  updateDataset(datasetItem) {
    let data = {}
    data.dataset_id = +datasetItem.dataset.datasetid
    data.dataset_name = window.prompt("Edit dataset name",  datasetItem.dataset.datasetname)
    if(!data.dataset_name)
      return
    data.dataset_description = window.prompt("Edit dataset description", datasetItem.dataset.datasetdescription) || ""
    Server.updateDataset(data)
      .then((rows) => this.refreshView(rows))
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
  createDatasetHTML(datasetId, datasetName, datasetDescription, count) {
    let container   = HTML.Element("div", "dataset-item", "", [["tabindex", "0"]], [["datasetname", datasetName], ["datasetid", datasetId], ["datasetdescription", datasetDescription]])
    let buttons     = HTML.Element("div", "buttons")
    let description = HTML.Element("div", "dataset-description", datasetDescription)
    let header      = HTML.Element("div", "dataset-header")
    let iconEdit    = HTML.Element("div", "icon icon-3x edit-icon")
    let iconDelete  = HTML.Element("div", "icon icon-3x delete-icon")
    let title       = HTML.Element("span", "dataset-title", datasetName)
    let itemCount   = HTML.Element("span", "dataset-item-count")
    header.append(title, itemCount)
    buttons.append(iconEdit, iconDelete)
    container.append(buttons, header, description)

    count === 1 ? itemCount.innerText = count + " item" : itemCount.innerText = count + " items"
    this.element.querySelector(".dataset-list").append(container)
  }
}