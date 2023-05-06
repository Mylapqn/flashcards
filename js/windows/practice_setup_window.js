class PracticeSetupWindow extends ProgramWindow {
  constructor(element) {
    super("PracticeSetupWindow", element)
    this.dragData = {}
    this.state = new State(
      "default",
      "dragging-slider"
    )
    this.dragTypes = [
      "slider"
    ]
    this.elements = {
      cardCountSlider: Query.on(this.element, "#question-number-slider")
    }
    this.practiceData = {
      cardCount: +this.elements.cardCountSlider.dataset.slidermin
    }
    this.dataset = null
  }
  handleClick(e) {
    let clicked = {
      startBtn: e.target.closest("button.start-practice"),
      customTrainingBtn: e.target.closest("button.set-custom-training-method"),
      changeDatasetBtn: e.target.closest("button.select-dataset-button"),
      card: e.target.closest(".training-preview-card"),
    }
    if(clicked.startBtn)
      practiceWindow.startPractice(this.dataset.id, this.trainingMethod)
    if(clicked.customTrainingBtn)
      customTrainingMethodWindow.show()
    if(clicked.card) 
      this.setTrainingMethod(
        clicked.card,
        {
          sideA: clicked.card.dataset.fieldsA.split(" "),
          sideB: clicked.card.dataset.fieldsB.split(" "),
        }
      )
    if(clicked.changeDatasetBtn)
      program.windows.setPrevious()      
  }
  handleMousedown(e) {
    let clicked = {
      questionNumberHandle: e.target.closest("#question-number-slider .slider-handle-wrapper")
    }
    if(clicked.questionNumberHandle) 
      this.startDragging(clicked.questionNumberHandle, "slider")
  }
  handleMousemove(e) {
    if(this.state.is("dragging-slider"))
    this.updateSlider(e)
  }
  handleMouseup(e) {
    if(this.state.is("dragging-slider"))
    this.stopDragging()
    this.state.revert()
  }
  startDragging(element, dragType) {
    this.element.style.userSelect = "none"
    this.dragData.element = element
    this.setDragData(element, dragType)
    this.state.set("dragging-slider")
  }
  stopDragging() {
    this.element.style.userSelect = "inherit"
    this.dragData = {}
    this.refreshView()
  }
  setDragData(element, dragType) {
    let type = this.dragTypes.find(t => t === dragType)
    if(!type) throw `no dragType ${dragType} found`;
    this.dragData.type = type
    if(type === "slider") {
      let slider = element.closest(".slider")
      this.dragData.slider = slider
      this.dragData.sliderLabel = Query.on(slider, (".slider-label"))
      this.dragData.sliderStep = +slider.dataset.sliderstep
      this.dragData.sliderMin = +slider.dataset.slidermin
      this.dragData.sliderMax = +slider.dataset.slidermax
      this.dragData.distanceFromLastStep = 0
    }
  }
  updateSlider(e) {
    this.dragData.distanceFromLastStep += mouse.moved.x
    let maxDistance = this.dragData.element.parentElement.offsetWidth
    let stepCount = (this.dragData.sliderMax - this.dragData.sliderMin) / this.dragData.sliderStep
    let stepPixelSize = maxDistance / stepCount
    // console.log(stepCount, stepPixelSize, maxDistance, this.dragData.distanceFromLastStep)
    let offset = 0
    while(this.dragData.distanceFromLastStep >= stepPixelSize) {
      this.dragData.distanceFromLastStep -= stepPixelSize
      offset += stepPixelSize
    }
    while(this.dragData.distanceFromLastStep <= -stepPixelSize) {
      this.dragData.distanceFromLastStep += stepPixelSize
      offset -= stepPixelSize
    }
    let offsetDistance = +(this.dragData.element.style.left.replaceAll("px", "").replaceAll(" ", "")) + offset
    offsetDistance = MathUtils.clamp(offsetDistance, 0, maxDistance)
    this.dragData.element.style.left = offsetDistance + "px"

    let finalValue = //basically, scale the total distance to be between slider's min and max value
    offsetDistance * (this.dragData.sliderMax / maxDistance) + (this.dragData.sliderMin * (1 - offsetDistance / maxDistance))
    finalValue = MathUtils.step(finalValue, this.dragData.sliderStep)
    this.dragData.sliderLabel.innerText = finalValue
    if(this.dragData.slider.id === "question-number-slider")
      this.practiceData.cardCount = finalValue
  }
  loadDataset(dataset) {
    this.dataset = dataset
    Query.on(this.element, "button.select-dataset-button").innerText = dataset.dataset_name
    Server.getDatasetData(dataset.id)
      .then((rows) => {
        this.rows = rows
        this.refreshView()
      })
  }
  refreshView() {
    let infoRow = Query.on(this.element, "*[data-show-on='more-cards-than-items-in-dataset'] .text")
    infoRow.innerText = `Training set only contains ${this.rows.length} entries. Some cards will repeat.`
    if(this.rows.length < this.practiceData.cardCount)
      infoRow.classList.remove("hidden")
    else
      infoRow.classList.add("hidden")
  }
  getDialogData(win, data) {
    if(win instanceof CustomTrainingMethodWindow) {
      this.setTrainingMethod("cardElement", data.trainingMethod)
    }
  }
  createTrainingMethodCardHTML(trainingMethod) {
    let card = HTML.Element("div", "training-preview-card")
    let sideA = HTML.Element("div", "side-a", trainingMethod.sideA.join(" "))
    let sideB = HTML.Element("div", "side-b", trainingMethod.sideB.join(" "))
    let cardDivider = HTML.Element("div", "card-divider")
  }
  setTrainingMethod(cardElement, trainingMethod) {
    this.trainingMethod = trainingMethod
    Query.allOn(this.element, ".training-preview-card").forEach(card => card.classList.remove("selected"))
    if(typeof cardElement === "object" && cardElement !== null) 
      cardElement.classList.add("selected")
    console.warn("cardElement needs to be created upon selecting a custom training method")
  }
}