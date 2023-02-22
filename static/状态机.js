/**
 * 红灯3s后亮黄灯
 * 黄灯2s后亮红灯
 * 红灯1s后亮绿灯
 * 绿灯5s后亮黄灯
 */

/**
 * 状态机由上下文和多个状态类组成
 * 上下文负责 1. 保存当前状态 2. 委托状态执行操作
 * 状态类职责 1. 根据自身状态操作 2. 修改上下文中下一个状态
 */

// 状态类
function RedLightState(light) {
  this.light = light
}
RedLightState.prototype.next = function() {
  console.log("red")
  setTimeout(() => {
    this.light.setState(this.light.yellowRightState)
  }, 3000)
}

function YellowLightState(light) {
  this.light = light
}
YellowLightState.prototype.next = function() {
  console.log("yellow")
  setTimeout(() => {
    this.light.setState(this.light.greenRightState)
  }, 1000)
}

function GreenLightState(light) {
  this.light = light
}
GreenLightState.prototype.next = function() {
  console.log("grenn")
  setTimeout(() => {
    this.light.setState(this.light.redLightState)
  }, 5000)
}

// 上下文类
function Light() {
  this.redLightState = new RedLightState(this)
  this.yellowRightState = new YellowLightState(this)
  this.greenRightState = new GreenLightState(this)
  this.state = null
}

Light.prototype.setState = function(state) {
  this.state = state
  this.state.next()
}

Light.prototype.init = function() {
  this.state = this.redLightState
  this.state.next()
}

const light = new Light()

// light.init()

// js版本的状态机
var state = {
  red: {
    next() {
      console.log("red")
      this.state = state.yellow
      setTimeout(() => {
        this.next()
      }, 1000)
    }
  },
  yellow: {
    next() {
      console.log("yellow")
      this.state = state.green
      setTimeout(() => {
        this.next()
      }, 1000)
    }
  },
  green: {
    next() {
      console.log("green")
      this.state = state.red
      // 这个部分是 帮上下文调用了next方法，核心思想是上一步
      setTimeout(() => {
        this.next()
      }, 1000)
    }
  }
}

var context = {
  state: state.red,
  next() {
    this.state.next.call(this)
  }
}
context.next()

// 基于闭包的状态机
