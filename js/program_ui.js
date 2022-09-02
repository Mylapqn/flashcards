class ProgramUI {
  constructor() {
    this.tooltip = Query.first("#mouse-tooltip")
    this.draggedElement = null
  }
  handleInput(e) {
    if(this["handle" + e.type.capitalize()])
      this["handle" + e.type.capitalize()](e)
  }
  handleMousemove(e){
    if(e.target.closest(".tooltip")) 
      this.updateTooltip(e)
    else
      this.hideTooltip()
  }
  updateTooltip(e) {
    this.showTooltip()
    let offset = 12
    this.tooltip.style.left = offset + e.clientX + "px"
    this.tooltip.style.top = offset + e.clientY + "px"
  }
  showTooltip() {
    this.tooltip.classList.remove("hidden")
  }
  hideTooltip() {
    this.tooltip.classList.add("hidden")
  }
}