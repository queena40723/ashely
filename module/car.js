// exports = module.exports = {};
// exports 本身是一個物件

exports.color = "red";

let name = "default";

exports.setName = function (firstName, lastName) {
  name = `${firstName} ${lastName}`;
};

exports.showName = function () {
  console.log(`Hi, ${name}`);
};

// return module.exports;
