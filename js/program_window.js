class ProgramWindow {
  constructor(title, element) {
    this.title = title
    this.element = element
  }
  hide() {
    this.element.classList.add("hidden")
  }
  show() {
    this.element.classList.remove("hidden")
  }
  handleInput(e) {
    if(this["handle" + e.type.capitalize()])
      this["handle" + e.type.capitalize()](e)
  }
}