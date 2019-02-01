let man = {
  height: 180,
  weight: 70,
  wealth: 1000000
}

class Observer {
  constructor(obj) {
    this.walk(obj)
  }
  walk(obj) {
    Object.keys(obj).forEach(prop => {
      this[prop] = obj[prop]
      this.proxyData(obj, prop)
      this.defineReactive(this, prop, obj[prop])      
    })
  }
  proxyData(obj, prop) {
    let _this = this
    Object.defineProperty(obj, prop, {
      get() {
        return _this[prop]
      },
      set(newVal) {
        console.log(this)
        console.log('_this', _this)
        _this[prop] = newVal
      }
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

let ins = new Observer(man)
// console.dir(ins)