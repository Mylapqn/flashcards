class CustomTrainingMethodWindow extends DialogWindow {
  constructor(element, programWindow) {
    super("CustomTrainingMethodWindow", element)
    this.sideA = Query.on(this.element, ".card-side-a")
    this.sideB = Query.on(this.element, ".card-side-b")
    this.hiddenFields = []
    this.window = programWindow
  }
  handleClick(e) {
    let clicked = {
      confirmBtn: e.target.closest("button.confirm-training-method"),
      cancelBtn: e.target.closest("button.cancel-training-method"),
      hideBtn: e.target.closest("button.hide-in-practice-mode"),
    }
    if(clicked.confirmBtn)
      this.confirmTrainingMethod()
    if(clicked.cancelBtn)
      this.dismiss()
    if(clicked.hideBtn)
      this.toggleFieldVisibility(clicked.hideBtn)
  }
  toggleFieldVisibility(button) {
    let field_name = button.closest(".card-row").dataset.datatype
    Query.on(button, ".icon").classList.toggle("active")
    if(this.hiddenFields.findChild(field_name))
      this.hiddenFields.remove(field_name)
    else
      this.hiddenFields.push(field_name)
  }
  confirmTrainingMethod() {
    let allData = {
      sideA: Query.allOn(this.element, ".card-side-a .card-row").map(element => element.dataset.datatype),
      sideB: Query.allOn(this.element, ".card-side-b .card-row").map(element => element.dataset.datatype),
    }
    let data = {
      trainingMethod: {
        sideA: [],
        sideB: []
      }
    }
    //remove fields from the data which are found inside this.hiddenFields[]
    for(let side in allData) 
      for(let field of allData[side])
        if(this.hiddenFields.findChild(field))
          continue
        else
          data.trainingMethod[side].push(field)
    this.window.getDialogData(this, data)
    this.hide()
  }
  dismiss() {
    this.hide()
  }
}