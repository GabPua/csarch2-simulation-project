/*global React */
/*global ReactDOM */
/*global downloadComputation */
// eslint-disable-next-line no-unused-vars
function NavButton({ icon, style, onClick, disabled }) {
  return (
    <p className="control">
      <button type="button" className={`button ${style}`} onClick={onClick} disabled={disabled}>
        <span className="icon is-medium">
          <i className={`fa-solid fa-lg ${icon}`} />
        </span>
      </button>
    </p>
  );
}

function App() {
  const [operands, setOperands] = React.useState([]);
  const [steps, setSteps] = React.useState([['0', '0', '0']]);
  const [isComputed, setIsComputed] = React.useState(false);
  const [counter, setCounter] = React.useState(0);

  const submitHandler = (op1, op2, mode) => {
    setSteps(multiply(op1, op2, mode));
    setOperands([op1, op2]);
    setIsComputed(true);
    setCounter(0);
  };

  return (
    <div className="columns" style={{ 'minHeight': '100vh' }}>
      <div className="column">
        <Display step={steps[counter]} />
      </div>

      <div className="column is-3 is-flex is-flex-direction-column is-justify-content-center">
        <Form submitHandler={submitHandler} navDisabler={() => setIsComputed(false)} />
        <div className="px-5 is-flex is-justify-content-space-between">
          <div className="field is-grouped">
            <NavButton icon="fa-arrow-left" style="is-light" onClick={() => setCounter(counter - 1)} disabled={!isComputed} />
            <NavButton icon="fa-play" style="is-light" disabled={!isComputed} />
            <NavButton icon="fa-arrow-right" style="is-light" onClick={() => setCounter(counter + 1)} disabled={!isComputed} />
          </div>
          <NavButton icon="fa-download" style="is-link" onClick={() => downloadComputation(operands, steps)} disabled={!isComputed} />
        </div>
      </div>
      <div className="column is-1"></div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));