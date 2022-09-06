class Query {
  static on(element, query) {
    return element.querySelector(query)
  }
  static allOn(element, query) {
    return Array.from(element.querySelectorAll(query))
  }
  static first(query) {
    return document.querySelector(query)
  }
  static all(query) {
    return Array.from(document.querySelectorAll(query))
  }
}
class HTML {
  static Element(tagname, classes, innerText = "", attributes, dataset) {
    let element = document.createElement(tagname)
    let css = classes.split(' ')
    css.forEach(cls => {
      if(cls === "") return
      element.classList.add(cls)
    })
    if(attributes)
      attributes.forEach(attr => {
        if(attr[0])
          element.setAttribute(attr[0], attr[1] || "")
      })
    if(dataset)
      dataset.forEach(set => {
        element.dataset[set[0]] = set[1]
      })
    element.innerText = innerText || ""
    return element
  }
  static SVGElement() {
    
  }
  static hasClasses(...classes) {
    let predicate = true
    classes.forEach(cls => {
      if(element.classList.contains(cls) === false) 
        predicate = false 
    })
    return predicate
  }
}

function getChildIndex(HTMLNode) {
  return Array.prototype.indexOf.call(HTMLNode.parentNode.childNodes, HTMLNode)
}
