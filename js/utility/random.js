class Random {
  static float(from = 0, to = 1) {
    return Math.random()*to + from
  }
  static int(from = 0, to = 1) {
    return Math.round(Math.random()*to + from)
  }
  static from(...array) {
    return array[Math.round(Math.random()*(array.length - 1))]
  }
  static dataFrom(...array) {
    let i = randR(0, array.length - 1)
    return array[i]
  }
  static weighted(values = {apple: 1, orange: 2}) {
    let weights = []
    let keys = Object.keys(values)
  
    for (let i = 0; i < keys.length; i++) {
      weights.push(values[keys[i]])
    }
  
    let thresholds = []
    let value = 0;
    let prevValue = 0;
    for (let i = 0; i < keys.length; i++) {
      value = weights[i] + prevValue
      thresholds.push(value)
      prevValue = value
    }
    let pick;
    let random = randR(0,thresholds[thresholds.length - 1])
  
    for (let i = 0; i < thresholds.length; i++) {
      if(i === 0) {
        if(random < thresholds[i]) {
          pick = keys[i]
          break
        }
      }
      if(i > 0 && i < (thresholds.length - 1)) {
        if(random > thresholds[i - 1] && random <= thresholds[i]) {
          pick = keys[i]
          break
        }
      }
      if(i == thresholds.length - 1) {
        if(random <= thresholds[i]) {
          pick = keys[i]
          break
        }
      }
    }
    return pick
  }
  static id(length = 10) {
    let num = Math.random() * 1_000_000_000
    return num.toFixed(length)
  }
  static idFor(objects) {
    let id = this.id()
    let isUnique = false
    while(!isUnique) {
      isUnique = true
      objects.forEach(item => {
        if(item.id === id) {
          isUnique = false
          id = this.id()
        }
      })
    }
    return id
  }
}
