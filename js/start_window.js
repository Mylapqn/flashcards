class StartWindow extends ProgramWindow {
  constructor(element) {
    super("StartWindow", element)
  }
  handleMousedown(e) {
    let [target] = [e.target]
    let elements = {
      btnPractice: target.closest("button.mode.practice"),
      btnEdit: target.closest("button.mode.edit"),
    }
    if(elements.btnEdit)
      program.windows.set(editWindow)
    if(elements.btnPractice)
      program.windows.set(chapterSelectWindow)
  }
}