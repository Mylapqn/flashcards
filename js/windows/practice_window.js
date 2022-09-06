class PracticeWindow extends ProgramWindow {
  constructor(element) {
    super("PracticeWindow", element)
    this.elements = {
      card: Query.on(this.element, ".card"),
      barTop: Query.on(this.element, ".practice-info-bar"),
      barBottom: Query.on(this.element, ".buttons"),
      nextButtons: Query.on(this.element, ".next-buttons"),
      zenButton: Query.on(this.element, "button.zen-mode-button"),
    }
    this.zenMode = false
  }
  handleClick(e) {
    let clicked = {
      card: e.target.closest(".card"),
      zenButton: e.target.closest("button.zen-mode-button")
    }
    if(clicked.card)
      this.flipCard()
    if(clicked.zenButton)
      this.toggleZenMode()
  } 
  loadData(datasetName) {

  }
  createCard(data) {
    
  }
  toggleZenMode() {
    console.log('f')
    Query.on(this.elements.zenButton, ".zen-icon").classList.toggle("active")
    this.zenMode = !this.zenMode
    Query.allOn(this.element, "*[data-zenhide='true']").forEach(element => element.classList.toggle("zen-hide"))
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