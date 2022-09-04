class PracticeWindow extends ProgramWindow {
  constructor(element) {
    super("PracticeWindow", element)
    this.elements = {
      card: Query.on(this.element, ".card"),
      barTop: Query.on(this.element, ".practice-info-bar"),
      barBottom: Query.on(this.element, ".buttons"),
      nextButtons: Query.on(this.element, ".next-buttons"),
    }
  }
  handleClick(e) {
    let clicked = {
      card: e.target.closest(".card")
    }
    if(clicked.card)
      this.flipCard()
  } 
  loadData(datasetName) {

  }
  createCard(data) {
    
  }
  toggleZenMode() {

  }
  flipCard() {
    this.elements.card.classList.toggle('flipped')
    this.showNextButtons()
  }
  showNextButtons() {

  }
  hideNextButtons() {

  }
  startPractice(datasetName) {
    program.windows.set(this)
    this.loadData(datasetName)
  }
}