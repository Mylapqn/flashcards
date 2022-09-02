class StartWindow extends ProgramWindow {
  constructor(element) {
    super("StartWindow", element)
  }
  handleClick(e) {
    let [target] = [e.target]
    let elements = {
      btnPractice: target.closest("button.mode.practice"),
      btnEdit: target.closest("button.mode.edit"),
    }
    if(elements.btnPractice)
      program.windows.set(chapterSelectWindow)
    if(elements.btnEdit)
      program.windows.set(datasetEditWindow)
  }
  handleKeydown(e) {
    if(e.code === "KeyP")
      program.windows.set(chapterSelectWindow)
    if(e.code === "KeyE")
      program.windows.set(datasetEditWindow)
  }
}