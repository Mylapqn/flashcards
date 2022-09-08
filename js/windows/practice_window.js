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
    this.dataset = null
    this.cardNumber = 0
    this.currentAuthor = null
  }
  handleClick(e) {
    let clicked = {
      card: e.target.closest(".card"),
      zenButton: e.target.closest("button.zen-mode-button"),
      editButton: e.target.closest("button.edit-item-button"),
    }
    if(clicked.card)
      this.flipCard()
    if(clicked.zenButton)
      this.toggleZenMode()
    if(clicked.editButton)
      this.editAuthorItem()
  }
  loadData(datasetId) {
    Server.getDatasetData(datasetId)
      .then(rows => {
        this.cardNumber = 0
        this.dataset = rows
        this.shuffleData()
        this.nextCard()
      })
  }
  toggleZenMode() {
    Query.on(this.elements.zenButton, ".zen-icon").classList.toggle("active")
    this.zenMode = !this.zenMode
    Query.allOn(this.element, "*[data-zenhide='true']").forEach(element => element.classList.toggle("zen-hide"))
  }
  editAuthorItem() {
    program.windows.set(editWindow)
    editWindow.loadDataset(this.currentAuthor.dataset_id, this.currentAuthor.dataset_name)
  }
  showNextButtons() {

  }
  hideNextButtons() {

  }
  shuffleData() {
    this.dataset = this.dataset.randomSort()
  }
  startPractice(datasetId, trainingMethod) {
    this.trainingMethod = trainingMethod
    program.windows.set(this)
    this.loadData(datasetId)
  }
  nextCard(author) {
    this.cardNumber++
    let data = this.dataset[this.cardNumber]
    this.card = {}
    this.card.sideA = this.createCardHTML(this.trainingMethod.sideA)
    this.card.sideB = this.createCardHTML(this.trainingMethod.sideB)
  }
  createCardHTML(datatypes) {
    
  }
  flipCard() {
    this.elements.card.classList.toggle('flipped')
    this.showNextButtons()
  }
}