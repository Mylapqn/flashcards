class PracticeSetupWindow extends ProgramWindow {
  constructor(element) {
    super("PracticeSetupWindow", element)
  }
  handleClick(e) {
    practiceWindow.startPractice(this.datasetName)
  }
  selectDataset(datasetName) {
    this.dataset = data[datasetName]
    this.datasetName = datasetName
  }
}