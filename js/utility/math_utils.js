class MathUtils {
  static clamp(value, min, max) {
    let val = value
    if(val <= min) val = min
    if(val >= max) val = max
    return val
  }
  static sum(...values) {
    let result = 0
    values.forEach(val => result += val)
    return result
  }
  static avg(...numbers) {
    let sum = 0
    numbers.map(num => sum += num)
    return sum / numbers.length
  }
  static median(...numbers) {
    return numbers[Math.floor(numbers.length / 2)]
  }
}

function stringToBool(string) {
  if(string === "true") return true
  if(string === "false") return false
  else throw `not "false" or "true"`;
}

function mode(arr) {
  return arr.sort((a,b) =>
        arr.filter(v => v === a).length
      - arr.filter(v => v === b).length
  ).pop();
}

const reducer = (accumulator, curr) => accumulator + curr;

// usage: [].reduce(reducer()) or something

function rgb_to_hex(rgb) {
  let a = rgb.split("(")[1].split(")")[0]
  a = a.split(",")
  let b = a.map((x) => {              //For each array element
    x = parseInt(x).toString(16)      //Convert to a base16 string
    return (x.length==1) ? "0"+x : x  //Add zero if we get only one character
  })
  return "#" + b[0] + b[1] + b[2]
}
