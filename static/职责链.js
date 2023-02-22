/**
 * 问题描述
 * orderType: 1 - 500定金 2 - 200定金 3 - 普通
 * isPay  true 支付了定金 false 未支付定金
 * stock 库存 ，只针对普通消费者
 * function order(orderType, isPay, stock) {}  根据参数输出结果
 */

/**
 * 职责链的定义
 * 每个对象都有机会处理参数，应用场景   结果由 根据多个参数组合生成
 * 1. 根据结果拆分成多个职责
 * 2. 职责的作用
 *      a. 条件满足则处理
 *      b. 不满足扔给下一个职责处理
 */

/**
 *
 * 职责如何扔给下一个职责处理
 * 解耦就是引入新的工具来管理耦合关系，
 * 引入职责节点概念，
 *  1. 每个节点指向下一个节点
 *  2. 根据当前结果决定是否需要下一个节点处理
 *  3. 执行处理函数将职责链上下文传入
 */

function ChainNode(fn) {
  this.fn = fn
  this.nextSuccessor = null
}
ChainNode.prototype.setNextSuccessor = function(chain) {
  this.nextSuccessor = chain
}

ChainNode.prototype.nextNodeHandle = function() {
  var ret = this.fn(...arguments)
  if (ret === "nextSuccessor") {
    return (
      this.this.nextSuccessor && this.nextSuccessor.nextNodeHandle(...arguments)
    )
  }
  return ret
}

ChainNode.prototype.start = function() {
  return this.nextNodeHandle(...arguments)
}

// 创建节点
var node1 = new ChainNode(function() {})
var node2 = new ChainNode(function() {})
var node3 = new ChainNode(function() {})

// 绑定关系
node1.setNextSuccessor(node2)
node2.setNextSuccessor(node3)
node1.start()

/**
 * 基于函数AOP，可以制定更简单职责链写法
 */

Function.prototype.after = function(afterFn) {
  var fn = this
  return function() {
    let result = fn.apply(this, arguments)
    if (result === "nextSuccessor") {
      return afterFn.apply(this, arguments)
    }
    return result
  }
}

/**
 * 上述只是同步职责链， 如果是异步结果该怎样设计
 * 同步职责链能同步得到结果
 * 异步职责链需要回调获取结果
 */

// 统一cb
function Chain(cb) {
  function ChainNode(fn) {
    this.cb = cb
    this.fn = fn
  }
  ChainNode.prototype = {
      // 增加显示调用下一个节点, 逻辑和 同步下 返回下一个节点差不多
      next() {
          if(this.this.nextSuccessor) {
            return this.nextSuccessor.nextNodeHandle(...arguments)
          }
            return this.cb()
      }
      ...// 同上
  }
  return chainNode
}

var chain = new Chain(console.log);

var node1 = new chain(function(){
    setTimeout(()=>{
        this.next()
    },0)
})

/**
 * promise 实现职责链
 */

//  node1().then(node2).then(node3).catch(cb)

// function Node(fn) {
//     return function() {
//         let arg = arguments
//         var promise = new Promise(resolve => {
//             var ret = fn(...arg, resolve);
//             if(promise====)
//         })
        
//     }

// }
