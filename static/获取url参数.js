function getUrlParam(sUrl, sKey) {
  function output(params, sKey) {
    if (sKey) {
      return params[sKey] || "";
    }
    return params;
  }
  function paramsKey(str, isLast) {
    let list = str.split("=");
    if (isLast) {
      list[1] = list[1].split("#")[0];
    }
    return list;
  }
  let params = {};
  let result = /\?(.+)$/gi.exec(sUrl);
  if (!result) {
    return output(params, sKey);
  }
  let paramsList = result[1].split("&");
  if (paramsList[0] === "") {
    return output(params, sKey);
  }
  for (let i = 0; i < paramsList.length; i++) {
    let [key, value] = paramsKey(paramsList[i], i === paramsList.length - 1);
    if (params[key]) {
      if (params[key].push) {
        params[key].push(value);
      } else {
        params[key] = [params[key], value];
      }
    } else {
      params[key] = value;
    }
  }
  return output(params, sKey);
}

console.log(
  getUrlParam(
    "http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe key",
    "key"
  )
);

function commonParentNode(oNode1, oNode2) {
  let oNode1Obj = {},
    oNode2Obj = {};
  currentNode1 = oNode1;
  currentNode2 = oNode2;
  for (;;) {
    if (currentNode1) {
      oNode1Obj[currentNode1] = currentNode1;
      if (oNode2Obj[currentNode1]) {
        return currentNode1;
      }
      currentNode1 = currentNode1.parent;
    }
    if (currentNode2) {
      oNode2Obj[currentNode2] = currentNode2;
      if (oNode1Obj[currentNode2]) {
        return currentNode2;
      }
      currentNode2 = currentNode2.parent;
    }
  }
}
let a = {},
  b = {};
let c = { a: 3 };
a.parent = { a: 1 };
a.parent.parent = c;
b.parent = c;

console.log(commonParentNode(a, b));

function f(n) {
  if (n === 1) return 1;
  return n * arguments.callee(n - 1);
}

console.log(f(6));

function f1(n) {
  let sumer = 1;
  for (var i = 1; i 