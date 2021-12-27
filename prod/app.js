var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/*global React */
/*global ReactDOM */
/*global downloadComputation */
// eslint-disable-next-line no-unused-vars
function NavButton(_ref) {
  var icon = _ref.icon,
      style = _ref.style,
      onClick = _ref.onClick,
      disabled = _ref.disabled;

  return React.createElement(
    "p",
    { className: "control" },
    React.createElement(
      "button",
      { type: "button", className: "button " + style, onClick: onClick, disabled: disabled },
      React.createElement(
        "span",
        { className: "icon is-medium" },
        React.createElement("i", { className: "fa-solid fa-lg " + icon })
      )
    )
  );
}

function App() {
  var _React$useState = React.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      operands = _React$useState2[0],
      setOperands = _React$useState2[1];

  var _React$useState3 = React.useState([['0', '0', '0']]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      steps = _React$useState4[0],
      setSteps = _React$useState4[1];

  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      isComputed = _React$useState6[0],
      setIsComputed = _React$useState6[1];

  var _React$useState7 = React.useState(0),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      counter = _React$useState8[0],
      setCounter = _React$useState8[1];

  var submitHandler = function submitHandler(op1, op2, mode) {
    setSteps(multiply(op1, op2, mode));
    setOperands([op1, op2]);
    setIsComputed(true);
    setCounter(0);
  };

  return React.createElement(
    "div",
    { className: "columns", style: { 'minHeight': '100vh' } },
    React.createElement(
      "div",
      { className: "column" },
      React.createElement(Display, { step: steps[counter] })
    ),
    React.createElement(
      "div",
      { className: "column is-3 is-flex is-flex-direction-column is-justify-content-center" },
      React.createElement(Form, { submitHandler: submitHandler, navDisabler: function navDisabler() {
          return setIsComputed(false);
        } }),
      React.createElement(
        "div",
        { className: "px-5 is-flex is-justify-content-space-between" },
        React.createElement(
          "div",
          { className: "field is-grouped" },
          React.createElement(NavButton, { icon: "fa-arrow-left", style: "is-light", onClick: function onClick() {
              return setCounter(counter - 1);
            }, disabled: !isComputed }),
          React.createElement(NavButton, { icon: "fa-play", style: "is-light", disabled: !isComputed }),
          React.createElement(NavButton, { icon: "fa-arrow-right", style: "is-light", onClick: function onClick() {
              return setCounter(counter + 1);
            }, disabled: !isComputed })
        ),
        React.createElement(NavButton, { icon: "fa-download", style: "is-link", onClick: function onClick() {
            return downloadComputation(operands, steps);
          }, disabled: !isComputed })
      )
    ),
    React.createElement("div", { className: "column is-1" })
  );
}

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));