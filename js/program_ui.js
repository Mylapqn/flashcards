class ProgramUI {
  constructor() {
    this.tooltip = Query.first("#mouse-tooltip")
    this.dragOrigin = null
    this.dragIndex = null
    this.draggedElement = null
    this.draggedCopy = null
    this.state = new State(
      "idle",
      "dragging-element",
      "sorting-element",
    )
  }
  handleInput(e) {
    if(this["handle" + e.type.capitalize()])
      this["handle" + e.type.capitalize()](e)
  }
  handleMousedown(e) {
    let clicked = {
      draggable: e.target.closest("*[data-draggable='true'")
    }
    if(clicked.draggable)
      this.dragBegin(clicked.draggable)
  }
  handleMousemove(e) {
    this.updateTooltip(e)
    if(this.state.is("dragging-element"))
      this.dragUpdate(e)
  }
  handleMouseup(e) {
    if(this.state.is("dragging-element"))
      this.dragEnd(e)
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
  dragBegin(element) {
    element.closest(".program-window").style.userSelect = "none"
    this.draggedCopy = element.cloneNode(true)
    element.before(this.draggedCopy)
    this.dragOrigin = element.parentElement
    this.dragIndex = getChildIndex(element)
    element.style.position = "absolute"
    element.style.left = mouse.client.x + "px"
    element.style.top = mouse.client.y + "px"
    document.body.append(element)
    this.draggedElement = element
    Query.all(
    `*[data-dragaccept='${this.draggedElement.dataset.dragtype}'`)
    .forEach(element => {
      element.classList.add("can-drop")
    })
    this.state.set("dragging-element")
  }
  dragUpdate(e) {
    this.draggedElement.style.left = mouse.client.x + "px"
    this.draggedElement.style.top = mouse.client.y + "px"
  }
  dragEnd(e) {
    let target = e.target.closest(`*[data-dragaccept='${this.draggedElement.dataset.dragtype}'`)
    if(target && target !== this.dragOrigin)
      target.append(this.draggedCopy)
    else if(target === this.dragOrigin && this.dragOrigin.childNodes.length > this.dragIndex)
      this.dragOrigin.childNodes[this.dragIndex].before(this.draggedCopy)
    else if(this.dragOrigin.childNodes.length > this.dragIndex)
      this.dragOrigin.childNodes[this.dragIndex].before(this.draggedCopy)
    else
      this.dragOrigin.append(this.draggedCopy)
    Query.all(
      `*[data-dragaccept='${this.draggedElement.dataset.dragtype}'`)
      .forEach(element => {
        element.classList.remove("can-drop")
    })
    this.draggedCopy.closest(".program-window").style.userSelect = ""
    this.draggedCopy = null
    this.draggedElement.remove()
    this.draggedElement = null
    this.state.revert()
  }
}