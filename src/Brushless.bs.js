// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';


function throwError(message) { throw new Error(message); }
;

function make(name) {
  return {
          TAG: "AttributeName",
          name: name
        };
}

function toString(name) {
  var name$1 = name.name;
  if (name$1.includes(" ")) {
    throwError("InvalidName");
  }
  return "#" + name$1;
}

var AttributeName = {
  make: make,
  toString: toString
};

function make$1(x) {
  return {
          TAG: "AttributeValue",
          value: x.value,
          alias: x.alias
        };
}

function toString$1(value) {
  return ":" + value.alias;
}

var AttributeValue = {
  make: make$1,
  toString: toString$1
};

function splitWhen(str, predicate) {
  var _index = 0;
  while(true) {
    var index = _index;
    var $$char = str[index];
    if ($$char === undefined) {
      return [
              str,
              "",
              ""
            ];
    }
    if (predicate($$char)) {
      return [
              str.substring(0, index),
              str.substring(index, index + 1 | 0),
              str.substring(index + 1 | 0)
            ];
    }
    _index = index + 1 | 0;
    continue ;
  };
}

function fromString(str) {
  var parse = function (_str, _prevState, acc) {
    while(true) {
      var prevState = _prevState;
      var str = _str;
      var match = splitWhen(str, (function ($$char) {
              if ($$char === "[") {
                return true;
              } else {
                return $$char === ".";
              }
            }));
      if (match[0] === "" && match[1] === "" && match[2] === "") {
        return acc;
      }
      if (prevState === "Name") {
        var name = match[0];
        switch (match[1]) {
          case "" :
              if (match[2] === "" && name !== "") {
                acc.push({
                      TAG: "AttributeName",
                      name: name
                    });
                return acc;
              } else {
                return throwError("InvalidPath");
              }
          case "." :
              if (name === "") {
                return throwError("InvalidPath");
              }
              acc.push({
                    TAG: "AttributeName",
                    name: name
                  });
              _prevState = "Name";
              _str = match[2];
              continue ;
          case "[" :
              if (name !== "") {
                acc.push({
                      TAG: "AttributeName",
                      name: name
                    });
                return parseIndex(match[2], acc);
              } else {
                return throwError("InvalidPath");
              }
          default:
            return throwError("InvalidPath");
        }
      } else {
        if (match[0] !== "") {
          return throwError("InvalidPath");
        }
        switch (match[1]) {
          case "." :
              _prevState = "Name";
              _str = match[2];
              continue ;
          case "[" :
              return parseIndex(match[2], acc);
          default:
            return throwError("InvalidPath");
        }
      }
    };
  };
  var parseIndex = function (rest, acc) {
    var match = splitWhen(rest, (function ($$char) {
            return $$char === "]";
          }));
    var index = match[0];
    if (match[1] === "]") {
      if (index.search(/^[0-9]+$/) !== -1) {
        acc.push({
              TAG: "ListIndex",
              index: parseInt(index) | 0
            });
        return parse(match[2], "Index", acc);
      } else {
        return throwError("InvalidIndex: " + index);
      }
    } else {
      return throwError("InvalidIndex: " + index);
    }
  };
  var acc = [];
  var match = parse(str, "Name", acc).shift();
  if (match !== undefined && match.TAG === "AttributeName") {
    return {
            TAG: "AttributePath",
            name: match.name,
            subpath: acc
          };
  } else {
    return throwError("InvalidPath");
  }
}

function toString$2(path) {
  var _acc = toString({
        TAG: "AttributeName",
        name: path.name
      });
  var subs = path.subpath;
  while(true) {
    var acc = _acc;
    var match = subs.shift();
    if (match === undefined) {
      return acc;
    }
    if (match.TAG === "AttributeName") {
      _acc = acc + "." + toString({
            TAG: "AttributeName",
            name: match.name
          });
      continue ;
    }
    _acc = acc + "[" + String(match.index) + "]";
    continue ;
  };
}

var AttributePath = {
  fromString: fromString,
  toString: toString$2
};

function make$2() {
  return {
          names: {},
          values: {}
        };
}

function addValue(register, element) {
  var value = element.value;
  register.values[toString$1({
            TAG: "AttributeValue",
            value: value,
            alias: element.alias
          })] = value;
  return element;
}

function addName(register, element) {
  var name = element.name;
  register.names[toString({
            TAG: "AttributeName",
            name: name
          })] = name;
  return element;
}

function addPath(register, element) {
  var name = element.name;
  register.names[toString({
            TAG: "AttributeName",
            name: name
          })] = name;
  element.subpath.forEach(function (sub) {
        if (sub.TAG !== "AttributeName") {
          return ;
        }
        var name = sub.name;
        register.names[toString({
                  TAG: "AttributeName",
                  name: name
                })] = name;
      });
  return element;
}

var Register = {
  make: make$2,
  addValue: addValue,
  addName: addName,
  addPath: addPath
};

function comparatorToString(comparator) {
  switch (comparator) {
    case "Equals" :
        return "=";
    case "NotEquals" :
        return "<>";
    case "LessThan" :
        return "<";
    case "LessThanOrEqual" :
        return "<=";
    case "GreaterThan" :
        return ">";
    case "GreaterThanOrEqual" :
        return ">=";
    
  }
}

function toString$3(identifier, register) {
  if (identifier.TAG === "AttributePath") {
    return toString$2(addPath(register, {
                    TAG: "AttributePath",
                    name: identifier.name,
                    subpath: identifier.subpath
                  }));
  } else {
    return toString(addName(register, {
                    TAG: "AttributeName",
                    name: identifier.name
                  }));
  }
}

var Identifier = {
  toString: toString$3
};

function equals(lhs, rhs) {
  return {
          TAG: "Comparison",
          lhs: lhs,
          comparator: "Equals",
          rhs: rhs
        };
}

function notEquals(lhs, rhs) {
  return {
          TAG: "Comparison",
          lhs: lhs,
          comparator: "NotEquals",
          rhs: rhs
        };
}

function lessThan(lhs, rhs) {
  return {
          TAG: "Comparison",
          lhs: lhs,
          comparator: "LessThan",
          rhs: rhs
        };
}

function lessThanOrEqualTo(lhs, rhs) {
  return {
          TAG: "Comparison",
          lhs: lhs,
          comparator: "LessThanOrEqual",
          rhs: rhs
        };
}

function greaterThan(lhs, rhs) {
  return {
          TAG: "Comparison",
          lhs: lhs,
          comparator: "GreaterThan",
          rhs: rhs
        };
}

function greaterThanOrEqualTo(lhs, rhs) {
  return {
          TAG: "Comparison",
          lhs: lhs,
          comparator: "GreaterThanOrEqual",
          rhs: rhs
        };
}

function between(operand, limits) {
  return {
          TAG: "Between",
          operand: operand,
          limits: limits
        };
}

function inList(operand, list) {
  return {
          TAG: "In",
          operand: operand,
          list: list
        };
}

function attributeExists(identifier) {
  return {
          TAG: "AttributeExists",
          identifier: identifier
        };
}

function attributeNotExists(identifier) {
  return {
          TAG: "AttributeNotExists",
          identifier: identifier
        };
}

function attributeType(identifier, operand) {
  return {
          TAG: "AttributeType",
          identifier: identifier,
          operand: operand
        };
}

function beginsWith(identifier, operand) {
  return {
          TAG: "BeginsWith",
          identifier: identifier,
          operand: operand
        };
}

function contains(identifier, operand) {
  return {
          TAG: "Contains",
          identifier: identifier,
          operand: operand
        };
}

function and(lhs, rhs) {
  return {
          TAG: "And",
          lhs: lhs,
          rhs: rhs
        };
}

function or(lhs, rhs) {
  return {
          TAG: "Or",
          lhs: lhs,
          rhs: rhs
        };
}

function not(condition) {
  return {
          TAG: "Not",
          condition: condition
        };
}

function size(operand) {
  return {
          TAG: "Size",
          operand: operand
        };
}

var Maker = {
  equals: equals,
  notEquals: notEquals,
  lessThan: lessThan,
  lessThanOrEqualTo: lessThanOrEqualTo,
  greaterThan: greaterThan,
  greaterThanOrEqualTo: greaterThanOrEqualTo,
  between: between,
  inList: inList,
  attributeExists: attributeExists,
  attributeNotExists: attributeNotExists,
  attributeType: attributeType,
  beginsWith: beginsWith,
  contains: contains,
  and: and,
  or: or,
  not: not,
  size: size
};

var Overload = {
  $amp$amp: and,
  $pipe$pipe: or,
  $bang: not,
  $eq$eq: equals,
  $bang$eq: notEquals,
  $less: lessThan,
  $less$eq: lessThanOrEqualTo,
  $great: greaterThan,
  $great$eq: greaterThanOrEqualTo
};

function build(condition, register) {
  var toString$4 = function (condition) {
    switch (condition.TAG) {
      case "Comparison" :
          return opString(condition.lhs) + " " + comparatorToString(condition.comparator) + " " + opString(condition.rhs);
      case "Between" :
          var limits = condition.limits;
          return opString(condition.operand) + " BETWEEN " + opString(limits.lower) + " AND " + opString(limits.upper);
      case "In" :
          return opString(condition.operand) + " IN (" + condition.list.map(opString).join(", ") + ")";
      case "And" :
          return "(" + toString$4(condition.lhs) + ") AND (" + toString$4(condition.rhs) + ")";
      case "Or" :
          return "(" + toString$4(condition.lhs) + ") OR (" + toString$4(condition.rhs) + ")";
      case "Not" :
          return "NOT (" + toString$4(condition.condition) + ")";
      case "AttributeExists" :
          return "attribute_exists(" + toString$3(condition.identifier, register) + ")";
      case "AttributeNotExists" :
          return "attribute_not_exists(" + toString$3(condition.identifier, register) + ")";
      case "AttributeType" :
          return "attribute_type(" + toString$3(condition.identifier, register) + ", " + opString(condition.operand) + ")";
      case "BeginsWith" :
          return "begins_with(" + toString$3(condition.identifier, register) + ", " + opString(condition.operand) + ")";
      case "Contains" :
          return "contains(" + toString$3(condition.identifier, register) + ", " + opString(condition.operand) + ")";
      
    }
  };
  var opString = function (operand) {
    switch (operand.TAG) {
      case "AttributePath" :
          return toString$2(addPath(register, {
                          TAG: "AttributePath",
                          name: operand.name,
                          subpath: operand.subpath
                        }));
      case "AttributeName" :
          return toString(addName(register, {
                          TAG: "AttributeName",
                          name: operand.name
                        }));
      case "AttributeValue" :
          return toString$1(addValue(register, {
                          TAG: "AttributeValue",
                          value: operand.value,
                          alias: operand.alias
                        }));
      case "Size" :
          return "size(" + opString(operand.operand) + ")";
      
    }
  };
  return toString$4(condition);
}

var Condition = {
  Maker: Maker,
  equals: equals,
  notEquals: notEquals,
  lessThan: lessThan,
  lessThanOrEqualTo: lessThanOrEqualTo,
  greaterThan: greaterThan,
  greaterThanOrEqualTo: greaterThanOrEqualTo,
  between: between,
  inList: inList,
  attributeExists: attributeExists,
  attributeNotExists: attributeNotExists,
  attributeType: attributeType,
  beginsWith: beginsWith,
  contains: contains,
  and: and,
  or: or,
  not: not,
  size: size,
  Overload: Overload,
  build: build
};

function build$1(projection, register) {
  return projection.map(function (__x) {
                return toString$3(__x, register);
              }).join(", ");
}

var Projection = {
  build: build$1
};

function equals$1(name, value) {
  return {
          TAG: "Comparison",
          name: name,
          comparator: "Equals",
          value: value
        };
}

function notEquals$1(name, value) {
  return {
          TAG: "Comparison",
          name: name,
          comparator: "NotEquals",
          value: value
        };
}

function lessThan$1(name, value) {
  return {
          TAG: "Comparison",
          name: name,
          comparator: "LessThan",
          value: value
        };
}

function lessThanOrEqualTo$1(name, value) {
  return {
          TAG: "Comparison",
          name: name,
          comparator: "LessThanOrEqual",
          value: value
        };
}

function greaterThan$1(name, value) {
  return {
          TAG: "Comparison",
          name: name,
          comparator: "GreaterThan",
          value: value
        };
}

function greaterThanOrEqualTo$1(name, value) {
  return {
          TAG: "Comparison",
          name: name,
          comparator: "GreaterThanOrEqual",
          value: value
        };
}

function between$1(name, limits) {
  return {
          TAG: "Between",
          name: name,
          limits: limits
        };
}

function beginsWith$1(name, value) {
  return {
          TAG: "BeginsWith",
          name: name,
          value: value
        };
}

var Maker$1 = {
  equals: equals$1,
  notEquals: notEquals$1,
  lessThan: lessThan$1,
  lessThanOrEqualTo: lessThanOrEqualTo$1,
  greaterThan: greaterThan$1,
  greaterThanOrEqualTo: greaterThanOrEqualTo$1,
  between: between$1,
  beginsWith: beginsWith$1,
  any: "Any"
};

function skConditionToString(skCondition, register) {
  if (typeof skCondition !== "object") {
    return "";
  }
  switch (skCondition.TAG) {
    case "Comparison" :
        return " AND " + toString(addName(register, skCondition.name)) + " " + comparatorToString(skCondition.comparator) + " " + toString$1(addValue(register, skCondition.value));
    case "Between" :
        var limits = skCondition.limits;
        return " AND " + toString(addName(register, skCondition.name)) + " BETWEEN " + toString$1(limits.lower) + " AND " + toString$1(limits.upper);
    case "BeginsWith" :
        return " AND begins_with(" + toString(addName(register, skCondition.name)) + ", " + toString$1(addValue(register, skCondition.value)) + ")";
    
  }
}

function build$2(keyCondition, register) {
  return toString(addName(register, keyCondition.pk.name)) + " = " + toString$1(addValue(register, keyCondition.pk.value)) + skConditionToString(keyCondition.sk, register);
}

var KeyCondition = {
  Maker: Maker$1,
  equals: equals$1,
  notEquals: notEquals$1,
  lessThan: lessThan$1,
  lessThanOrEqualTo: lessThanOrEqualTo$1,
  greaterThan: greaterThan$1,
  greaterThanOrEqualTo: greaterThanOrEqualTo$1,
  between: between$1,
  beginsWith: beginsWith$1,
  any: "Any",
  build: build$2
};

function listAppend(identifier, operand) {
  return {
          TAG: "ListAppend",
          identifier: identifier,
          operand: operand
        };
}

function ifNotExists(identifier, operand) {
  return {
          TAG: "IfNotExists",
          identifier: identifier,
          operand: operand
        };
}

function sum(lhs, rhs) {
  return {
          TAG: "Sum",
          lhs: lhs,
          rhs: rhs
        };
}

function sub(lhs, rhs) {
  return {
          TAG: "Sub",
          lhs: lhs,
          rhs: rhs
        };
}

var Maker$2 = {
  listAppend: listAppend,
  ifNotExists: ifNotExists,
  sum: sum,
  sub: sub
};

function operandToString(operand, register) {
  switch (operand.TAG) {
    case "AttributePath" :
        return toString$2(addPath(register, {
                        TAG: "AttributePath",
                        name: operand.name,
                        subpath: operand.subpath
                      }));
    case "AttributeName" :
        return toString(addName(register, {
                        TAG: "AttributeName",
                        name: operand.name
                      }));
    case "AttributeValue" :
        return toString$1(addValue(register, {
                        TAG: "AttributeValue",
                        value: operand.value,
                        alias: operand.alias
                      }));
    case "ListAppend" :
        return "list_append(" + operandToString(operand.identifier, register) + ", " + operandToString(operand.operand, register) + ")";
    case "IfNotExists" :
        return "if_not_exists(" + operandToString(operand.identifier, register) + ", " + operandToString(operand.operand, register) + ")";
    case "Sum" :
        return operandToString(operand.lhs, register) + " + " + operandToString(operand.rhs, register);
    case "Sub" :
        return operandToString(operand.lhs, register) + " - " + operandToString(operand.rhs, register);
    
  }
}

function appendIfNotEmpty(acc, arr, tag, fn) {
  if (arr !== undefined && arr.length > 0) {
    return acc + tag + " " + arr.map(fn).join(", ") + " ";
  } else {
    return acc;
  }
}

function build$3(update, register) {
  return appendIfNotEmpty(appendIfNotEmpty(appendIfNotEmpty(appendIfNotEmpty("", update.add, "ADD", (function (param) {
                              return toString$3(param[0], register) + " " + toString$1(addValue(register, param[1]));
                            })), update.delete, "DELETE", (function (param) {
                          return toString$3(param[0], register) + " " + toString$1(addValue(register, param[1]));
                        })), update.set, "SET", (function (param) {
                      return toString$3(param[0], register) + " = " + operandToString(param[1], register);
                    })), update.remove, "REMOVE", (function (__x) {
                  return toString$3(__x, register);
                })).trim();
}

var Update = {
  Maker: Maker$2,
  listAppend: listAppend,
  ifNotExists: ifNotExists,
  sum: sum,
  sub: sub,
  build: build$3
};

var U = {
  Maker: Maker$2,
  listAppend: listAppend,
  ifNotExists: ifNotExists,
  sum: sum,
  sub: sub,
  build: build$3
};

var C = {
  Maker: Maker,
  equals: equals,
  notEquals: notEquals,
  lessThan: lessThan,
  lessThanOrEqualTo: lessThanOrEqualTo,
  greaterThan: greaterThan,
  greaterThanOrEqualTo: greaterThanOrEqualTo,
  between: between,
  inList: inList,
  attributeExists: attributeExists,
  attributeNotExists: attributeNotExists,
  attributeType: attributeType,
  beginsWith: beginsWith,
  contains: contains,
  and: and,
  or: or,
  not: not,
  size: size,
  Overload: Overload,
  build: build
};

var K = {
  Maker: Maker$1,
  equals: equals$1,
  notEquals: notEquals$1,
  lessThan: lessThan$1,
  lessThanOrEqualTo: lessThanOrEqualTo$1,
  greaterThan: greaterThan$1,
  greaterThanOrEqualTo: greaterThanOrEqualTo$1,
  between: between$1,
  beginsWith: beginsWith$1,
  any: "Any",
  build: build$2
};

var P = {
  build: build$1
};

exports.AttributeName = AttributeName;
exports.AttributeValue = AttributeValue;
exports.AttributePath = AttributePath;
exports.Register = Register;
exports.comparatorToString = comparatorToString;
exports.Identifier = Identifier;
exports.Condition = Condition;
exports.Projection = Projection;
exports.KeyCondition = KeyCondition;
exports.Update = Update;
exports.U = U;
exports.C = C;
exports.K = K;
exports.P = P;
/*  Not a pure module */
