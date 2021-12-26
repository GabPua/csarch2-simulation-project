var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/*global React */
// eslint-disable-next-line no-unused-vars
function Form() {
  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      error = _React$useState2[0],
      setError = _React$useState2[1];

  return React.createElement(
    "form",
    { className: "" },
    React.createElement(
      "div",
      { className: "field" },
      React.createElement(
        "label",
        { htmlFor: "op1", className: "label" },
        "Operand 1:"
      ),
      React.createElement(
        "div",
        { className: "control" },
        React.createElement("input", { type: "text", className: "input", id: "op1" })
      )
    ),
    React.createElement(
      "div",
      { className: "field" },
      React.createElement(
        "label",
        { htmlFor: "op2", className: "label" },
        "Operand 2:"
      ),
      React.createElement(
        "div",
        { className: "control" },
        React.createElement("input", { type: "text", className: "input", id: "op2" })
      )
    ),
    React.createElement(
      "div",
      { className: "field" },
      React.createElement(
        "p",
        { className: "label" },
        "Input Mode"
      ),
      React.createElement(
        "div",
        { className: "control" },
        React.createElement(
          "label",
          { className: "radio" },
          React.createElement("input", { type: "radio", value: "decimal", name: "mode" }),
          "Decimal"
        ),
        React.createElement(
          "label",
          { className: "radio" },
          React.createElement("input", { type: "radio", value: "binary", name: "mode" }),
          "Binary"
        )
      )
    ),
    React.createElement("input", { type: "submit", className: "button primary" })
  );
}