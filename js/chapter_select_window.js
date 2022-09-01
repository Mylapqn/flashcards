class ChapterSelectWindow extends ProgramWindow {
  constructor(element) {
    super("ChapterSelectWindow", element)
  }
  handleMousedown(e) {
    let [target] = [e.target]
    let elements = {
      chapter: target.closest(".chapter")
    }
    if(elements.chapter) 
      program.startPractice(elements.chapter.dataset.chapter)
  }
}