class PracticeWindow extends ProgramWindow {
  constructor(element) {
    super("PracticeWindow", element)
    this.elements = {
      cardA: Query.on(this.element, ".practice-card.side-a"),
      cardB: Query.on(this.element, ".practice-card.side-b"),
      cardContainer: Query.on(this.element, ".practice-card-container"),
      barTop: Query.on(this.element, ".practice-info-bar"),
      barBottom: Query.on(this.element, ".buttons"),
      nextButtons: Query.on(this.element, ".next-buttons"),
      zenButton: Query.on(this.element, "button.zen-mode-button"),
    }
    this.zenMode = false
    this.dataset = null
    this.datasetName
    this.cardIndex = 0
    this.currentAuthor = null
    this.visibleSide = "A"
    this.animatingCard = false
  }
  handleClick(e) {
    let clicked = {
      card: e.target.closest(".practice-card"),
      zenButton: e.target.closest("button.zen-mode-button"),
      editButton: e.target.closest("button.edit-item-button"),
      passButton: e.target.closest("button.pass-button")
    }
    if(clicked.card)
      this.flipCard()
    if(clicked.zenButton)
      this.toggleZenMode()
    if(clicked.editButton)
      this.editAuthorItem()
    if(clicked.passButton)
      this.nextCard()
  }
  async loadDataset(datasetId) {
    await Server.getDatasetData(datasetId)
      .then(rows => {
        this.cardIndex = 0
        this.dataset = rows
        this.datasetId = datasetId
        this.shuffleData()
        this.nextCard()
      })
    return {loaded: true}
  }
  toggleZenMode() {
    Query.on(this.elements.zenButton, ".zen-icon").classList.toggle("active")
    this.zenMode = !this.zenMode
    Query.allOn(this.element, "*[data-zenhide='true']").forEach(element => element.classList.toggle("zen-hide"))
  }
  async editAuthorItem() {
    program.windows.set(editWindow)
    await editWindow.loadDataset(this.datasetId)
    console.log(this.currentAuthor.id)
    let element = Query.on(editWindow.element, `.item[data-id='${this.currentAuthor.id}']`)
    console.log(editWindow.dataset)
    editWindow.selectAuthor(this.currentAuthor.id, element)
  }
  showNextButtons() {

  }
  hideNextButtons() {

  }
  shuffleData() {
    this.dataset = this.dataset.randomSort()
  }
  async startPractice(datasetId, trainingMethod) {
    this.trainingMethod = trainingMethod
    program.windows.set(this)
    await this.loadDataset(datasetId)
  }
  nextCard() {
    let data = this.dataset[this.cardIndex]
    this.currentAuthor = data
    this.card = {}
    this.elements.cardA.remove()
    this.elements.cardB.remove()
    this.elements.cardA = this.createCardHTML("a", this.trainingMethod.sideA, data)
    this.elements.cardB = this.createCardHTML("b", this.trainingMethod.sideB, data)
    this.elements.cardContainer.append(this.elements.cardA, this.elements.cardB)
    this.updateCompletedCards()
    this.cardIndex++
  }
  createCardHTML(side, datatypes, data) {
    let card = HTML.Element("div", `practice-card side-${side}`)
    if(side === "a") 
      card.style.zIndex = 1
    for(let type of datatypes) {
      let row = HTML.Element("div", "practice-card-row", data[type])
      card.append(row)
    }
    return card
  }
  flipCard() {
    if(this.animatingCard) return
    if(this.visibleSide == "A")
      this.showSideB()
    else
      this.showSideA()
  }
  updateCompletedCards() {
    Query.on(this.element, ".questions-completed").innerText = this.cardIndex + "/" + this.dataset.length 
    Query.on(this.element, ".practice-progress-slider-inner").style.width = (this.cardIndex / this.dataset.length) * 100 + "%"
  }
  //#region terrible animation code
  showSideA() {
    this.animatingCard = true
    console.log('show side A')
    this.visibleSide = "A"
    let duration = 250
    let easing1 = "cubic-bezier(0.6, 0.0, 1.0, 1.0)"
    let easing2 = "cubic-bezier(0.0, 0.0, 0.4, 1.0)"
    let perspective = 2000
    this.elements.cardA.animate([
      {transform: "perspective(2000px) rotate3d(0, 1, 0, 180deg)"},
      {transform: "perspective(2000px) rotate3d(0, 1, 0, 90deg)"},
    ], {
      duration: duration,
      iterations: 1,
      easing: easing1
    })
    this.elements.cardB.animate([
      {transform: "perspective(2000px) rotate3d(0, 1, 0, 180deg) scaleX(-1)"},
      {transform: "perspective(2000px) rotate3d(0, 1, 0, 90deg) scaleX(-1)"},
    ], {
      duration: duration,
      iterations: 1,
      easing: easing1
    })
    //finish the second half of the flipping animation
    setTimeout(() => {
      this.elements.cardA.style.zIndex = 1
      this.elements.cardB.style.zIndex = 0
      this.elements.cardA.animate([
        {transform: "perspective(2000px) rotate3d(0, 1, 0, 90deg)"},
        {transform: "perspective(2000px) rotate3d(0, 1, 0, 0deg)"},
      ], {
        duration: duration,
        iterations: 1,
        easing: easing2
      })
      this.elements.cardB.animate([
        {transform: "perspective(2000px) rotate3d(0, 1, 0, 90deg) scaleX(-1)"},
        {transform: "perspective(2000px) rotate3d(0, 1, 0, 0deg) scaleX(-1)"},
      ], {
        duration: duration,
        iterations: 1,
        easing: easing2
      })
    },
    duration)
    this.elements.cardA.style.transform = "perspective(2000px) rotate3d(0, 1, 0, 0deg)"
    this.elements.cardB.style.transform = "perspective(2000px) rotate3d(0, 1, 0, 0deg) scaleX(1)"
    setTimeout(() => {
      this.animatingCard = false
      this.showNextButtons()
    }, duration * 2);
  }
  showSideB() {
    this.animatingCard = true
    console.log('show side B')
    this.visibleSide = "B"
    let duration = 250
    let easing1 = "cubic-bezier(0.6, 0.0, 1.0, 1.0)"
    let easing2 = "cubic-bezier(0.0, 0.0, 0.4, 1.0)"
    let perspective = 2000
    this.elements.cardA.animate([
      {transform: "perspective(2000px) rotate3d(0, 1, 0, 0deg)"},
      {transform: "perspective(2000px) rotate3d(0, 1, 0, 90deg)"},
    ], {
      duration: duration,
      iterations: 1,
      easing: easing1
    })
    this.elements.cardB.animate([
      {transform: "perspective(2000px) rotate3d(0, 1, 0, 0deg) scaleX(1)"},
      {transform: "perspective(2000px) rotate3d(0, 1, 0, 90deg) scaleX(1)"},
    ], {
      duration: duration,
      iterations: 1,
      easing: easing1
    })
    //finish the second half of the flipping animation
    setTimeout(() => {
      this.elements.cardA.style.zIndex = 0
      this.elements.cardB.style.zIndex = 1
      this.elements.cardA.animate([
        {transform: "perspective(2000px) rotate3d(0, 1, 0, 90deg)"},
        {transform: "perspective(2000px) rotate3d(0, 1, 0, 180deg)"},
      ], {
        duration: duration,
        iterations: 1,
        easing: easing2
      })
      this.elements.cardB.animate([
        {transform: "perspective(2000px) rotate3d(0, 1, 0, 90deg) scaleX(-1)"},
        {transform: "perspective(2000px) rotate3d(0, 1, 0, 180deg) scaleX(-1)"},
      ], {
        duration: duration,
        iterations: 1,
        easing: easing2
      })
    },
    duration)
    this.elements.cardA.style.transform = "perspective(2000px) rotate3d(0, 1, 0, 180deg)"
    this.elements.cardB.style.transform = "perspective(2000px) rotate3d(0, 1, 0, 180deg) scaleX(-1)"
    setTimeout(() => {
      this.animatingCard = false
      this.showNextButtons()
    }, duration * 2);
  }
  //#endregion
}
