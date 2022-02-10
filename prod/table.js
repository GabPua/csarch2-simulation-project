function Row(_ref) {
  var data = _ref.data,
      className = _ref.className;

  var cells = [];
  for (var i = 0; i < data.length; i++) {
    cells.push(React.createElement(
      'td',
      { key: i },
      data[i]
    ));
  }

  return React.createElement(
    'tr',
    { className: className },
    cells
  );
}

function Table(_ref2) {
  var steps = _ref2.steps,
      counter = _ref2.counter,
      answer = _ref2.answer;

  var rows = [];
  var n = steps.length - 1;
  for (var i = 0; i < n + 1; i++) {
    var className = '';

    if (i > counter) {
      className = 'is-invisible';
    } else if (i == counter) {
      className = 'is-selected';
    }

    rows.push(React.createElement(Row, { key: i, data: steps[i][i == 0 ? 0 : 1].values.join(''), className: className }));
  }

  return React.createElement(
    'table',
    { className: 'table is-bordered' },
    React.createElement(
      'thead',
      null,
      React.createElement(
        'tr',
        null,
        React.createElement(
          'th',
          { colSpan: n },
          'A'
        ),
        React.createElement(
          'th',
          { colSpan: n },
          'Q'
        ),
        React.createElement(
          'th',
          null,
          'Q0'
        )
      )
    ),
    React.createElement(
      'tbody',
      null,
      rows
    ),
    React.createElement(
      'caption',
      null,
      answer === null ? '' : React.createElement(
        'strong',
        null,
        'Answer: ',
        answer
      )
    )
  );
}