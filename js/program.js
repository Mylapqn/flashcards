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
        this.history.unshift(this.active)
        this.active = win
        this.all.forEach(w => w.hide())
        this.active.show()
      },
      setPrevious() {
        if(this.history.length === 0) return console.log("nowhere to go; reached the end of history")
        let previous = this.history.shift()
        this.future.unshift(this.active)
        this.set(previous)
      },
      setNext() {
        if(this.future.length === 0) return console.log("nowhere to go ; reached the end of future")
        let next = this.future.shift()
        this.history.unshift(this.active)
        this.set(next)
      },
    }
    this.UI = new ProgramUI()
  }
  handleInput(e) {
    if(this["handle" + e.type.capitalize()])
      this["handle" + e.type.capitalize()](e)
    if(this.windows.active) 
      this.windows.active.handleInput(e)
    this.UI.handleInput(e)
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