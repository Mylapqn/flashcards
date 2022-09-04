class ProgramWindow {
  constructor(title, element) {
    this.title = title
    this.element = element
    this.dialogWindows = []
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
    this.dialogWindows.forEach(
      win => win.handleInput(e)
    )
  }
  addDialogWindow(win) {
    this.dialogWindows.push(win)
  }
}