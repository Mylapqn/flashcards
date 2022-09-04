class Mouse {
  constructor() {
    this.client = new Vector()
    this.clientPrevious = new Vector()
    this.moved = new Vector()
    this.buttons = {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
    }
  }
  handleInput(e) {
    if(e.type === "mousedown")
      this.buttons[e.button] = true
    if(e.type === "mouseup")
      this.buttons[e.button] = false
    if(e.type === "mousemove") 
      this.updatePosition(e)
  }
  updatePosition(e) {
    this.clientPrevious.setFrom(this.client)
    this.client.set(
      e.clientX, 
      e.clientY
    )
    this.moved.set(
      this.client.x - this.clientPrevious.x, 
      this.client.y - this.clientPrevious.y
    )
  }
}