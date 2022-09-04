let listenedEvents = [
  "keydown",
  "keyup",
  "mousedown",
  "mousemove",
  "mouseup",
  "click",
  "wheel",
  "pointerdown",
  "pointermove",
  "contextmenu",
]
for(let ev of listenedEvents) 
  document.addEventListener(ev, function(e) {
    if(e.type === "contextmenu") 
      e.preventDefault()
    program.handleInput(e)
  })
  
const program = new Program()
const startWindow = new StartWindow(Query.first("#start-window"))
const practiceSetupWindow = new PracticeSetupWindow(Query.first("#practice-setup-window"))
const practiceWindow = new PracticeWindow(Query.first("#practice-window"))
const chapterSelectWindow = new ChapterSelectWindow(Query.first("#chapter-select-window"))
const editWindow = new EditWindow(Query.first("#edit-window"))
const datasetEditWindow = new DatasetEditWindow(Query.first("#dataset-edit-window"))

program.windows.add(
  startWindow, 
  practiceWindow,
  practiceSetupWindow,
  chapterSelectWindow,
  editWindow,
  datasetEditWindow,
)
program.windows.set(startWindow)
