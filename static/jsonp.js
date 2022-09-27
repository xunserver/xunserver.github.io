function curry(fn) {
    // your code here
    const resultFn = (...args1) => {
      const arg = args1.filter(arg => arg != curry.placeholder)
      if(arg.length >= fn.length) {
        return fn(...arg)
      } 
      return (...args2) => resultFn(...arg, ...args2)
    }
  
    return resultFn;
  }
  const  join = (a, b, c) => {
     console.log(`${a}_${b}_${c}`);
  }
  
  const curriedJoin = curry(join)
  const _ = curry.placeholder
  
  curriedJoin(1, 2, 3) // '1_2_3'
  
  curriedJoin(_, 2)(1, 3) // '1_2_3'
  
  curriedJoin(_,_,3,4)(1,_)(2,5) // '1_2_3'