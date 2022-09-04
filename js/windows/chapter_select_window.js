class ChapterSelectWindow extends ProgramWindow {
  constructor(element) {
    super("ChapterSelectWindow", element)
    this.createDatasetButton()
  }
  createDatasetButton() {
    for(let dataset in data) {
      let container = HTML.Element("div", "chapter-container", "", [], [["datasetname", dataset]] )
      let chapter = HTML.Element("div", "chapter")
      let title = HTML.Element("div", "chapter-title", dataset)
      let imageContainer = HTML.Element("div", "chapter-cover-image")
      container.append(chapter)
      chapter.append(imageContainer, title)
      Query.on(this.element, ".chapter-wrapper").append(container)
    }
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