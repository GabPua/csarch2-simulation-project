/*global React */
/*global ReactDOM */
// eslint-disable-next-line no-unused-vars
function NavButton(_ref) {
  var icon = _ref.icon,
      style = _ref.style;

  return React.createElement(
    "p",
    { className: "control" },
    React.createElement(
      "button",
      { type: "button", className: "button " + style },
      React.createElement(
        "span",
        { className: "icon is-medium" },
        React.createElement("i", { className: "fa-solid fa-lg " + icon })
      )
    )
  );
}

function App() {
  return React.createElement(
    "div",
    { className: "columns", style: { 'min-height': '100vh' } },
    React.createElement("div", { className: "column is-four-fifths" }),
    React.createElement(
      "div",
      { className: "column is-flex is-flex-direction-column is-justify-content-center" },
      React.createElement(Form, null),
      React.createElement(
        "div",
        { className: "px-5 is-flex is-justify-content-space-between" },
        React.createElement(
          "div",
          { className: "field is-grouped" },
          React.createElement(NavButton, { icon: "fa-arrow-left", style: "is-light" }),
          React.createElement(NavButton, { icon: "fa-play", style: "is-light" }),
          React.createElement(NavButton, { icon: "fa-arrow-right", style: "is-light" })
        ),
        React.createElement(NavButton, { icon: "fa-download", style: "is-link" })
      )
    )
  );
}

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));