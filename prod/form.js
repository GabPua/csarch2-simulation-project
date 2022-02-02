var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/*global React */
// eslint-disable-next-line no-unused-vars
function trimBinary(string) {
  var index = 0;
  while (index + 1 < string.length && string[index + 1] === string[0]) {
    index++;
  }
  string = string.slice(index);

  if (string === '1') {
    string = '11';
  }

  return string;
}

function getErrorMessage(string, mode) {
  var n = Number(string);

  if (!string) {
    return 'Field must not be empty!';
  }

  if (mode == 'binary') {
    if (!/^[01]+$/.test(string)) {
      return 'Value is not a valid binary number!';
    }

    string = trimBinary(string);
    if (string.length > 16) {
      return 'Number exceeds 16 bits!';
    }
  } else if (n < -2147483648 || n > 2147483647) {
    return 'Number exceeds 16 bits!';
  }

  return '';
}

function TextInput(_ref) {
  var id = _ref.id,
      label = _ref.label,
      error = _ref.error,
      changeHandler = _ref.changeHandler;

  return React.createElement(
    'div',
    { className: 'field' },
    React.createElement(
      'label',
      { htmlFor: id, className: 'label' },
      label
    ),
    React.createElement(
      'div',
      { className: 'control' },
      React.createElement('input', { type: 'number', className: 'input' + (error ? ' is-danger' : ''), id: id, name: id, onChange: function onChange() {
          return changeHandler(id);
        } })
    ),
    React.createElement(
      'p',
      { className: 'help is-danger' },
      error
    )
  );
}

function Form(_ref2) {
  var submitHandler = _ref2.submitHandler,
      resetStates = _ref2.resetStates;

  var _React$useState = React.useState({}),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      errors = _React$useState2[0],
      setErrors = _React$useState2[1];

  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();

    var _Object$fromEntries = Object.fromEntries(new FormData(e.target)),
        op1 = _Object$fromEntries.op1,
        op2 = _Object$fromEntries.op2,
        mode = _Object$fromEntries.mode;

    var temp = {};

    temp.op1 = getErrorMessage(op1, mode);
    temp.op2 = getErrorMessage(op2, mode);

    if (temp.op1 === '' && temp.op1 === temp.op2) {
      if (mode === 'decimal') {
        submitHandler(op1, op2, mode);
      } else {
        var bin1 = trimBinary(op1);
        var bin2 = trimBinary(op2);
        submitHandler(bin1, bin2, mode);
      }
    }

    setErrors(temp);
  };

  var handleChange = function handleChange(key) {
    var temp = {};
    Object.assign(temp, errors);
    temp[key] = '';
    setErrors(temp);
    resetStates();
  };

  return React.createElement(
    'form',
    { className: 'box', onSubmit: handleSubmit },
    React.createElement(TextInput, { id: 'op1', label: 'Operand 1:', error: errors.op1, changeHandler: handleChange }),
    React.createElement(TextInput, { id: 'op2', label: 'Operand 2:', error: errors.op2, changeHandler: handleChange }),
    React.createElement(
      'div',
      { className: 'field' },
      React.createElement(
        'p',
        { className: 'label' },
        'Input Mode'
      ),
      React.createElement(
        'div',
        { className: 'control', onChange: handleChange },
        React.createElement(
          'label',
          { className: 'radio' },
          React.createElement('input', { type: 'radio', value: 'decimal', name: 'mode', defaultChecked: true }),
          'Decimal'
        ),
        React.createElement(
          'label',
          { className: 'radio' },
          React.createElement('input', { type: 'radio', value: 'binary', name: 'mode' }),
          'Binary'
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'field is-grouped' },
      React.createElement(
        'p',
        { className: 'control' },
        React.createElement('input', { type: 'submit', className: 'button is-primary', value: 'Compute' })
      ),
      React.createElement(
        'p',
        { className: 'control' },
        React.createElement('input', { type: 'reset', className: 'button is-light', onClick: function onClick() {
            setErrors({});resetStates();
          } })
      )
    )
  );
}