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
        let previous = this.history.shift()
        this.future.unshift(this.active)
        this.set(previous)
      },
      setNext() {
        let next = this.future.shift()
        this.history.unshift(this.active)
        this.set(next)
      },
    }
  }
  handleInput(e) {
    if(this.windows.active) 
      this.windows.active.handleInput(e)
  }
  startPractice(chapterNumber) {
    this.windows.set(practiceWindow)
    practiceWindow.loadData(chapterNumber)
  }
}