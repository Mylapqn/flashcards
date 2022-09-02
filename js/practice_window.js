class PracticeWindow extends ProgramWindow {
  constructor(element) {
    super("PracticeWindow", element)
  } 
  loadData(datasetName) {
    readTextFile("datasets/" + datasetName + ".json", function(rawData) {
      let data = JSON.parse(rawData)
    })
  }
  createCard() {
    
  }
  flipCard() {

  }
}