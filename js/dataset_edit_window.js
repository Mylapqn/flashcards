class DatasetEditWindow extends ProgramWindow {
  constructor(element) {
    super("DatasetEditWindow", element)
  }
  createDataset(datasetName) {
    if(data[datasetName]) return
    data[datasetName] = []
  }
}