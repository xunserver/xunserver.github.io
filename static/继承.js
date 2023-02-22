function Person(age) {
  this.age = age;
}
Person.prototype.sayAge = function() {
  console.log(this.age);
};

// 原型继承
function Man1(sex) {
  this.sex = sex;
}
Man1.prototype = new Person();

// 构造函数继承
function Man2(age, sex) {
  Person.call(this, age);
  this.sex = sex;
}

// 组合继承
function Man3(age, sex) {
  Person.call(this, age);
  this.sex = sex;
}

Man3.prototype = new Person();
Man3.prototype.constructor = Man3;
