function Table(_ref) {
  var title = _ref.title,
      data = _ref.data;

  var cells = [];
  for (var i = 0; i < data.length; i++) {
    cells.push(React.createElement(
      "td",
      { key: i },
      data[i]
    ));
  }

  return React.createElement(
    "table",
    { className: "table is-bordered" },
    React.createElement(
      "thead",
      null,
      React.createElement(
        "tr",
        null,
        React.createElement(
          "th",
          { colSpan: data.length },
          title
        )
      )
    ),
    React.createElement(
      "tbody",
      null,
      React.createElement(
        "tr",
        null,
        cells
      )
    )
  );
}

function Display(_ref2) {
  var step = _ref2.step;

  return React.createElement(
    "div",
    { className: "columns" },
    React.createElement(
      "div",
      { className: "column is-narrow" },
      React.createElement(Table, { title: "A", data: step[0] })
    ),
    React.createElement(
      "div",
      { className: "column is-narrow" },
      React.createElement(Table, { title: "Q", data: step[1] })
    ),
    React.createElement(
      "div",
      { className: "column is-narrow" },
      React.createElement(Table, { title: "Q0", data: step[2] })
    )
  );
}