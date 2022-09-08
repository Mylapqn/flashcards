class ChapterSelectWindow extends ProgramWindow {
  constructor(element) {
    super("ChapterSelectWindow", element)
    this.loadDatasets()
    this.datasets = []
  }
  loadDatasets() {
    Server.getDatasets(this)
      .then((rows) => rows.forEach(row => {
        this.createDatasetButton(row)
        this.datasets = rows
      }))
  }
  handleClick(e) {
    let clicked = {
      chapter: e.target.closest(".chapter-container")
    }
    if(clicked.chapter) {
      program.windows.set(practiceSetupWindow)
      practiceSetupWindow.loadDataset(this.datasets.find(ds => ds.id === +clicked.chapter.dataset.datasetid))
    }
  }
  createDatasetButton(dataset) {
    let container = HTML.Element("div", "chapter-container", "", [], [
      ["datasetid", dataset.id],
      ["datasetname", dataset.dataset_name],
      ["datasetdescription", dataset.dataset_description]
    ])
    let chapter = HTML.Element("div", "chapter")
    let textContainer = HTML.Element("div", "chapter-text-container")
    let title = HTML.Element("div", "chapter-title", dataset.dataset_name)
    let desc = HTML.Element("div", "chapter-description", dataset.dataset_description)
    let imageContainer = HTML.Element("div", "chapter-cover-image")
    container.append(chapter)
    textContainer.append(title, desc)
    chapter.append(imageContainer, textContainer)
    Query.on(this.element, ".chapter-wrapper").append(container)
  }
}