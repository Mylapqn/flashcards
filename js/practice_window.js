class PracticeWindow extends ProgramWindow {
  constructor(element) {
    super("PracticeWindow", element)
  } 
  loadData(chapterNumber) {
    readTextFile("data/chapters/chapter" + (+chapterNumber) + ".json", function(rawData) {
      let data = JSON.parse(rawData)
    })
  }
  createCard() {
    
  }
  flipCard() {

  }
}