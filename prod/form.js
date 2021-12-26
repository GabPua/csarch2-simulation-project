var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/*global React */
/*global multiply */
// eslint-disable-next-line no-unused-vars
function getErrorMessage(string, mode) {
  var n = Number(string);

  if (!string) {
    return 'Field must not be empty!';
  }

  if (mode == 'binary') {
    if (!/^[01]+$/.test(string)) {
      return 'Value is not a valid binary number!';
    } else if (string.length > 16) {
      return 'Number exceeds 16 bits!';
    }
  }

  if (n < -2147483648 || n > 2147483647) {
    return 'Number exceeds 16 bits!';
  }

  return '';
}

function TextInput(_ref) {
  var id = _ref.id,
      label = _ref.label,
      error = _ref.error,
      clearError = _ref.clearError;

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
          return clearError(id);
        } })
    ),
    React.createElement(
      'p',
      { className: 'help is-danger' },
      error
    )
  );
}

function Form() {
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
      console.log(multiply(op1, op2, mode));
    }

    setErrors(temp);
  };

  var clearError = function clearError(key) {
    var temp = {};
    Object.assign(temp, errors);
    temp[key] = '';

    setErrors(temp);
  };

  return React.createElement(
    'form',
    { className: 'box', onSubmit: handleSubmit },
    React.createElement(TextInput, { id: 'op1', label: 'Operand 1:', error: errors.op1, clearError: clearError }),
    React.createElement(TextInput, { id: 'op2', label: 'Operand 2:', error: errors.op2, clearError: clearError }),
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
        { className: 'control' },
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
            return setErrors({});
          } })
      )
    )
  );
}