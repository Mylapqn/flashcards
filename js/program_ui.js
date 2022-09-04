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
    this.updateTooltip(e)
  }
  updateTooltip(e) {
    let tooltip = e.target.closest(".tooltip")
    if(!tooltip) {
      this.hideTooltip()
      return}
    else
      this.showTooltip()
    let offset = 12
    this.tooltip.style.left = offset + e.clientX + "px"
    this.tooltip.style.top = offset + e.clientY + "px"
    Query.on(this.tooltip, ".tooltip-title").innerText = tooltip.dataset.tooltiptitle
    Query.on(this.tooltip, ".tooltip-description").innerText = tooltip.dataset.tooltipdescription || ""
  }
  showTooltip() {
    this.tooltip.classList.remove("hidden")
  }
  hideTooltip() {
    this.tooltip.classList.add("hidden")
  }
}