class PracticeSetupWindow extends ProgramWindow {
  constructor(element) {
    super("PracticeSetupWindow", element)
    this.draggedElement = null
    this.draggedData = null
    this.dragType = null
    this.state = new State(
      "default",
      "dragging-slider"
    )
  }
  handleClick(e) {
    let clicked = {
      startBtn: e.target.closest("button.start-practice")
    }
    if(clicked.startBtn)
      practiceWindow.startPractice(this.datasetName)
  }
  handleMousedown(e) {
    let clicked = {
      questionNumberHandle: e.target.closest("#question-number-slider .slider-handle-wrapper")
    }
    if(clicked.questionNumberHandle) 
    this.startDragging(clicked.questionNumberHandle)
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
    this.draggedElement = element
    this.dragType = dragType
    this.state.set("dragging-slider")
  }
  stopDragging() {
    this.element.style.userSelect = "inherit"
    this.draggedElement = null
  }
  updateSlider(e) {
    let maxDistance = this.draggedElement.parentElement.offsetWidth
    let offsetPercentage = +(this.draggedElement.style.left.replaceAll("px", "").replaceAll(" ", "")) + mouse.moved.x
    this.draggedElement.style.left = MathUtils.clamp(offsetPercentage, 0, maxDistance) + "px"
  }
  selectDataset(datasetName) {
    this.dataset = data[datasetName]
    this.datasetName = datasetName
  }
}