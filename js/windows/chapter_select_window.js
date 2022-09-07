class ChapterSelectWindow extends ProgramWindow {
  constructor(element) {
    super("ChapterSelectWindow", element)
    Server.getDatasets(this)
  }
  createDatasetButton(dataset) {
    let container = HTML.Element("div", "chapter-container", "", [], [["datasetname", dataset.dataset_name]] )
    let chapter = HTML.Element("div", "chapter")
    let title = HTML.Element("div", "chapter-title", dataset.dataset_name)
    let imageContainer = HTML.Element("div", "chapter-cover-image")
    container.append(chapter)
    chapter.append(imageContainer, title)
    Query.on(this.element, ".chapter-wrapper").append(container)
  }
  receiveData(datasets) {
    datasets.forEach(dataset => {
      this.createDatasetButton(dataset)
    })
  }
  handleClick(e) {
    let clicked = {
      chapter: e.target.closest(".chapter-container")
    }
    if(clicked.chapter) {
      console.log(e.target)
      program.windows.set(practiceSetupWindow)
      practiceSetupWindow.selectDataset(clicked.chapter.dataset.datasetname)
    }
  }
}