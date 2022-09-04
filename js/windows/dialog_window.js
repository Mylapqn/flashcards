class DialogWindow {
  constructor(title, element) {
    this.title = title
    this.element = element
    this.genericState = new State(
      "default",
      "dragging-self"
    )
  }
  handleInput(e) {
    if(this["handle" + e.type.capitalize()])
      this["handle" + e.type.capitalize()](e)
    this.handleGenericInput(e)
  }
  handleGenericInput(e) {
    if(this["handleGeneric"+ e.type.capitalize()])
      this["handleGeneric"+ e.type.capitalize()](e)
  }
  handleGenericMousedown(e) {
    let clicked = {
      dragWidget: e.target.closest(".drag-widget")
    }
    if(clicked.dragWidget)
      this.dragSelfBegin(e)
  }
  handleGenericMousemove(e) {
    if(this.genericState.is("dragging-self"))
      this.dragSelfUpdate(e)
  }
  handleGenericMouseup(e) {
    if(this.genericState.is("dragging-self"))
      this.dragSelfEnd(e)
  }
  dragSelfBegin(e) {
    this.genericState.set("dragging-self")
  }
  dragSelfUpdate(e) {

  }
  dragSelfEnd(e) {
    this.genericState.revert()
  }
}