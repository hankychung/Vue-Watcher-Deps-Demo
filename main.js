let man = {
  height: 180,
  weight: 70,
  wealth: 1000000
}

class Dep {
  constructor() {
    this.deps = []
  }
  getDeps() {
    if (!Dep.target || this.deps.includes(Dep.target)) return
    console.log('依赖添加', Dep.target)
    this.deps.push(Dep.target)
  }
  update() {
    this.deps.forEach(dep => {
      dep()
    })
  }
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
    let dep = new Dep()
    Object.defineProperty(obj, prop, {
      get() {
        console.log(`${prop} - 被读取！`)
        dep.getDeps()
        return val
      },
      set(newVal) {
        if (newVal == val) return
        val = newVal
        console.log(`${prop} - 被修改！`)
        dep.update()        
      }
    })
  }
}

new Observer(man)

class Watcher {
  constructor(obj, prop, computed, callback) {
    this.getVal(obj, prop, computed, callback)
  }

  getVal(obj, prop, computed, callback) {
    Object.defineProperty(obj, prop, {
      get() {
        Dep.target = callback
        console.log(`computed属性 - ${prop}被读取！`)
        return computed()
      },
      set() {
        console.error('计算属性不可被修改！')
      }
    })
  }
}

new Watcher(man, 'strength', () => {
  let {height, weight} = man
  if (height > 160 && weight > 70) return 'strong'
  return 'weak'
}, () => {
  alert(`i am so ${man.strength} !`)
})

new Watcher(man, 'isGreat', () => {
  let {height, weight, wealth} = man
  if (height > 180 && weight > 70 && wealth > 10000000) return 'Great!'
  return 'not good enough ...'
}, () => {
  alert(`they say i am ${man.isGreat}`)
})
