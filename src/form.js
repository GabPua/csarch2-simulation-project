/*global React */
// eslint-disable-next-line no-unused-vars
function Form() {
  const [error, setError] = React.useState();

  return (
    <form className="">
      <div className="field">
        <label htmlFor="op1" className="label">Operand 1:</label>
        <div className="control">
          <input type="text" className="input" id="op1" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="op2" className="label">Operand 2:</label>
        <div className="control">
          <input type="text" className="input" id="op2" />
        </div>
      </div>

      <div className="field">
        <p className="label">Input Mode</p>
        <div className="control">
          <label className="radio">
            <input type="radio" value="decimal" name="mode" />
            Decimal
          </label>
          <label className="radio">
            <input type="radio" value="binary" name="mode" />
            Binary
          </label>
        </div>
      </div>

      <input type="submit" className="button primary" />
    </form>
  );
}
