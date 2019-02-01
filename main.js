let man = {
  height: 180,
  weight: 70,
  wealth: 1000
}

class Observer {
  constructor(obj) {
    Object.keys(obj).forEach(prop => {
      this[prop] = obj[prop]
    })
    this.init()
  }
  init() {
    this.walk(this)
  }
  walk(obj) {
    Object.keys(obj).forEach(prop => {
      this.defineReactive(obj, prop, obj[prop])
    })
  }
  defineReactive(obj, prop, val) {
    Object.defineProperty(obj, prop, {
      get() {
        console.log(`${prop} - 被读取！`)
        return val
      },
      set(newVal) {
        if (newVal == val) return
        val = newVal
        console.log(`${prop} - 被修改！`)
      }
    })  
  }
}

let observer = new Observer(man)
console.dir(observer)
