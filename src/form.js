/*global React */
/*global multiply */
// eslint-disable-next-line no-unused-vars
function isValidBinaryNumber(string) {
  return /^[01]$/.test(string);
}

function TextInput({ id, label, error }) {
  return (
    <div className="field">
      <label htmlFor={id} className="label">{label}</label>
      <div className="control">
        <input type="number" className={'input' + (error ? ' is-danger' : '')} id={id} name={id} />
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

    if (!op1) {
      temp.op1 = 'Operand 1 must not be empty!';
    } else if (mode == 'binary' && !isValidBinaryNumber(op1)) {
      temp.op1 = 'Operand 1 is not a valid binary number!';
    }

    if (!op2) {
      temp.op2 = 'Operand 2 must not be empty!';
    } else if (mode == 'binary' && !isValidBinaryNumber(op2)) {
      temp.op2 = 'Operand 2 is not a valid binary number!';
    }

    if (!Object.keys(temp).length) {
      console.log(multiply(op1, op2, mode));
    }

    setErrors(temp);
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <TextInput id="op1" label="Operand 1:" error={errors.op1} />
      <TextInput id="op2" label="Operand 2:" error={errors.op2} />

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
          <input type="reset" className="button is-light" />
        </p>
      </div>
    </form>
  );
}
