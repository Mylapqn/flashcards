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

const customTrainingMethodWindow = new CustomTrainingMethodWindow(Query.first("#custom-training-method-window"))

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

// const http = new XMLHttpRequest()
// http.open("GET", "http://127.0.0.1:5501")
// http.send()
// http.onreadystatechange = (response) => {
//   console.log(response)
// }
// fetch("http://127.0.0.1:5501")
//   .then((response) => response.json())
//   .then(json => console.log(json))
// const xhr = new XMLHttpRequest()
// xhr.open("POST", "http://127.0.0.1:5501", true)
// xhr.setRequestHeader("Content-Type", "application/json")
// xhr.send(
//   JSON.stringify(
//     {
//       name: "Štěpán Trvaj",
//       country: "Česká republika",
//       timePeriod: "",
//       style: "",
//       notes: "",
//       works: [
//         {
//           title: "Lamentation over the death of Bob.",
//           description: "",
//           images: [
//             "./images/img.webp",
//           ],
//         },
//       ],
//     }
//   )
// )