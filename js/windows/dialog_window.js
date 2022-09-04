class DialogWindow {
  constructor(title, element) {
    this.title = title
    this.element = element
  }
  handleInput(e) {
    if(this["handle" + e.type.capitalize()])
      this["handle" + e.type.capitalize()](e)
  }
  handleMousedown(e) {
    let clicked = {
      dragWidget: e.target.closest(".drag-widget")
    }
  }
  dragBegin(e) {

  }
  dragUpdate(e) {

  }
  dragEnd(e) {

  }
}