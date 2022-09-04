class CustomTrainingMethodWindow extends DialogWindow {
  constructor(element) {
    super("CustomTrainingMethodWindow", element)
    this.sideA = Query.on(this.element, ".card-side-a")
    this.sideB = Query.on(this.element, ".card-side-b")
  }
  handleClick(e) {
    console.log("f");
    let clicked = {
      cardRow: e.target.closest(".card-row")
    }
    if(clicked.cardRow) {
      if(clicked.cardRow.closest(".side-b"))
        this.sideA.append(clicked.cardRow)
      else 
        this.sideB.append(clicked.cardRow)
    }
  }
}