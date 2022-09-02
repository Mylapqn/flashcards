//#region string
String.prototype.capitalize = function() {
  return this.charAt(0).toLocaleUpperCase() + this.slice(1)
}
String.prototype.capitalizeEach = function() {
  let words = this.split(" ")
  words = words.map(w => w.charAt(0).toLocaleUpperCase() + w.slice(1))
  return words.join(" ")
}
String.prototype.reverse = function() {
  let array = this.split('')
  let string = array.reverse().join('')
  return string
}
String.prototype.bool = function() {
  if(this.includes("false")) return false
  if(this.includes("true")) return true
}
//#endregion

//#region array
Array.prototype.remove = function(...children) {
  children.forEach(child => {
    this.splice(this.indexOf(child), 1)
  })
}
Array.prototype.findChild = function(child) {
  return this.find(obj => obj === child)
}
//#endregion