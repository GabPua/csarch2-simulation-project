/*global React */
/*global multiply */
// eslint-disable-next-line no-unused-vars
function getErrorMessage(string, mode) {
  const n = Number(string)

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

  return ''
}

function TextInput({ id, label, error, clearError }) {
  return (
    <div className="field">
      <label htmlFor={id} className="label">{label}</label>
      <div className="control">
        <input type="number" className={'input' + (error ? ' is-danger' : '')} id={id} name={id} onChange={() => clearError(id)} />
      </div>
      <p className="help is-danger">{error}</p>
    </div>
  );
}

function Form() {
  const [errors, setErrors] = React.useState({});
  const handleSubmit = e => {
    e.preventDefault();
    const { op1, op2, mode } = Object.fromEntries(new FormData(e.target));
    const temp = {};

    temp.op1 = getErrorMessage(op1, mode)
    temp.op2 = getErrorMessage(op2, mode)

    if (temp.op1 === '' && temp.op1 === temp.op2) {
      console.log(multiply(op1, op2, mode));
    }

    setErrors(temp);
  };

  const clearError = key => {
    const temp = {};
    Object.assign(temp, errors)
    temp[key] = ''

    setErrors(temp);
  }

  return (
    <form className="" onSubmit={handleSubmit}>
      <TextInput id="op1" label="Operand 1:" error={errors.op1} clearError={clearError} />
      <TextInput id="op2" label="Operand 2:" error={errors.op2} clearError={clearError} />

      <div className="field">
        <p className="label">Input Mode</p>
        <div className="control">
          <label className="radio">
            <input type="radio" value="decimal" name="mode" defaultChecked />
            Decimal
          </label>
          <label className="radio">
            <input type="radio" value="binary" name="mode" />
            Binary
          </label>
        </div>
      </div>

      <div className="field is-grouped">
        <p className="control">
          <input type="submit" className="button is-primary" />
        </p>
        <p className="control">
          <input type="reset" className="button is-light" onClick={() => setErrors({})}/>
        </p>
      </div>
    </form>
  );
}