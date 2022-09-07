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
  }
  handleClick(e) {
    let clicked = {
      startBtn: e.target.closest("button.start-practice"),
      customTrainingBtn: e.target.closest("button.set-custom-training-method"),
      card: e.target.closest(".training-preview-card")
    }
    if(clicked.startBtn)
      practiceWindow.startPractice(this.datasetName)
    if(clicked.customTrainingBtn)
      customTrainingMethodWindow.show()
    if(clicked.card) 
      this.setTrainingMethod(
        {
          sideA: clicked.card.dataset.fieldsA.split(" "),
          sideB: clicked.card.dataset.fieldsB.split(" "),
        }
      )
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

    let sliderValue = //basically, scale the total distance to be between slider's min and max value
    offsetDistance * (this.dragData.sliderMax / maxDistance) + (this.dragData.sliderMin * (1 - offsetDistance / maxDistance))
    sliderValue = MathUtils.step(sliderValue, this.dragData.sliderStep)
    this.dragData.sliderLabel.innerText = sliderValue
  }
  selectDataset(datasetName) {
    throw "selectDataset not implemented"
  }
  getDialogData(win, data) {
    if(win instanceof CustomTrainingMethodWindow) {
      this.setTrainingMethod(data.trainingMethod)
    }
  }
  setTrainingMethod(trainingMethod) {
    this.trainingMethod = trainingMethod
    console.log(trainingMethod)
  }
}