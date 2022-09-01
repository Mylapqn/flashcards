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
]
for(let ev of listenedEvents) 
  document.addEventListener(ev, function(e) {
    program.handleInput(e)
  })
  
const program = new Program()
const startWindow = new StartWindow(Query.Q("#start-window"))
const practiceWindow = new PracticeWindow(Query.Q("#practice-window"))
const chapterSelectWindow = new ChapterSelectWindow(Query.Q("#chapter-select-window"))
const editWindow = new EditWindow(Query.Q("#edit-window"))
const datasetEditWindow = new DatasetEditWindow(Query.Q("#dataset-edit-window"))

program.windows.add(
  startWindow, 
  practiceWindow,
  chapterSelectWindow,
  editWindow,
  datasetEditWindow,
)
program.windows.set(startWindow)