class Program {
  constructor() {
    this.windows = {
      active: null,
      all: [],
      history: [],
      future: [],
      historyIndex: 0,
      add(...windows) {
        for(let win of windows)
          if(win instanceof ProgramWindow) 
            this.all.push(win)
      },
      set(win) {
        if(!this.all.findChild(win)) return
        if(this.active instanceof ProgramWindow) 
          this.history.unshift(this.active)
        this.future = []
        this.active = win
        this.showActive()
      },
      showActive() {
        this.active.show()
        this.all.forEach(w => {
          if(w !== this.active) 
            w.hide()
        })
      },
      setPrevious() {
        if(this.history.length === 0) 
          return console.log("nowhere to go, reached the end of history")
        let previous = this.history.shift()
        this.future.unshift(this.active)
        this.active = previous
        this.showActive()
        this.log()
      },
      setNext() {
        if(this.future.length === 0) 
          return console.log("nowhere to go, reached the end of future")
        let next = this.future.shift()
        this.history.unshift(this.active)
        this.active = next
        this.showActive()
        this.log()
      },
      log() {
        console.log(
          "history: ",this.history, 
          "active: ",this.active, 
          "future: ",this.future);
      }
    }
    this.UI = new ProgramUI()
  }
  handleInput(e) {
    if(this["handle" + e.type.capitalize()])
      this["handle" + e.type.capitalize()](e)
    if(this.windows.active) 
      if(this.passEvent(e))
        this.windows.active.handleInput(e)
    this.UI.handleInput(e)
  }
  passEvent(e) {
    if(e.button === 3 || e.button === 4)
      return false
    else
      return true
  }
  handleMousedown(e) {
    if(e.button === 4) this.windows.setNext()
    if(e.button === 3) this.windows.setPrevious()
  }
  startPractice(datasetName) {
    this.windows.set(practiceWindow)
    practiceWindow.loadData(datasetName)
  }
}