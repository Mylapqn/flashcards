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

/* Program windows */
const program =                     new Program()
const startWindow =                 new StartWindow(Query.first("#start-window"))
const practiceSetupWindow =         new PracticeSetupWindow(Query.first("#practice-setup-window"))
const practiceWindow =              new PracticeWindow(Query.first("#practice-window"))
const chapterSelectWindow =         new ChapterSelectWindow(Query.first("#chapter-select-window"))
const editWindow =                  new EditWindow(Query.first("#edit-window"))
const datasetEditWindow =           new DatasetEditWindow(Query.first("#dataset-edit-window"))

/* Dialog windows */
const customTrainingMethodWindow =  new CustomTrainingMethodWindow(Query.first("#custom-training-method-window"))

const mouse = new Mouse()

program.windows.add(
  startWindow, 
  practiceWindow,
  practiceSetupWindow,
  chapterSelectWindow,
  editWindow,
  datasetEditWindow,
)
practiceSetupWindow.addDialogWindow(customTrainingMethodWindow)
program.windows.set(startWindow)