function InDepthRow(_ref) {
  var printPass = _ref.printPass,
      step = _ref.step,
      substep = _ref.substep,
      values = _ref.values,
      className = _ref.className;

  var cells = [React.createElement(
    'td',
    { className: 'has-text-weight-bold', style: { width: '92px' }, key: substep },
    substep
  )];

  if (printPass) {
    cells.unshift(React.createElement(
      'td',
      { key: 'pass', rowSpan: 2 },
      'Pass ',
      step,
      ': '
    ));
  }

  for (var i = 0; i < values.length - 1; i++) {
    for (var j = 0; j < values[i].length; j++) {
      cells.push(React.createElement(
        'td',
        { key: i + 'x' + j },
        values[i][j]
      ));
    }
  }
  cells.push(React.createElement(
    'td',
    { key: '2x0', style: { width: '42px' } },
    values[2][0]
  ));

  return React.createElement(
    'tr',
    { className: className },
    cells
  );
}

function InDepthCluster(_ref2) {
  var steps = _ref2.steps,
      counter = _ref2.counter;

  var tables = [];
  var n = steps.length - 1;
  var printPass = true;

  var _loop = function _loop(i) {
    var className = '';

    if (i > counter) {
      className = 'is-invisible';
    } else if (i == counter) {
      className = 'is-selected';
    }

    tables.push(React.createElement(
      'div',
      { className: 'table-container', key: 'table' + i },
      React.createElement(
        'table',
        { className: 'table is-bordered', style: { width: '100%' } },
        React.createElement(
          'tbody',
          null,
          i == 0 && React.createElement(
            'tr',
            null,
            React.createElement(
              'td',
              { rowSpan: 2 },
              'Pass 0:'
            ),
            React.createElement(
              'th',
              null,
              'Step'
            ),
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
          ),
          steps[i].map(function (step) {
            printPass = !printPass;
            return React.createElement(InDepthRow, { key: i + step.substep, substep: step.substep, step: i, printPass: printPass,
              values: step.values, className: className });
          })
        )
      )
    ));
  };

  for (var i = 0; i < n + 1; i++) {
    _loop(i);
  }

  return tables;
}