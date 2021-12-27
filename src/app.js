/*global React */
/*global ReactDOM */
/*global downloadComputation */
// eslint-disable-next-line no-unused-vars
function NavButton({ icon, style, clickHandler, isDisabled }) {
  return (
    <p className="control">
      <button type="button" className={`button ${style}`} onClick={clickHandler} disabled={isDisabled}>
        <span className="icon is-medium">
          <i className={`fa-solid fa-lg ${icon}`} />
        </span>
      </button>
    </p>
  );
}

function App() {
  const [operands, setOperands] = React.useState([]);
  const [steps, setSteps] = React.useState([]);
  const [isComputed, setIsComputed] = React.useState(false);

  const submitHandler = (op1, op2, mode) => {
    setSteps(multiply(op1, op2, mode));
    setOperands([op1, op2]);
    setIsComputed(true);
  };

  return (
    <div className="columns" style={{ 'minHeight': '100vh' }}>
      <div className="column is-four-fifths">

      </div>

      <div className="column is-flex is-flex-direction-column is-justify-content-center">
        <Form submitHandler={submitHandler} navDisabler={() => setIsComputed(false)} />
        <div className="px-5 is-flex is-justify-content-space-between">
          <div className="field is-grouped">
            <NavButton icon="fa-arrow-left" style="is-light" isDisabled={!isComputed}/>
            <NavButton icon="fa-play" style="is-light" isDisabled={!isComputed}/>
            <NavButton icon="fa-arrow-right" style="is-light" isDisabled={!isComputed} />
          </div>
          <NavButton icon="fa-download" style="is-link" clickHandler={() => downloadComputation(operands, steps)} isDisabled={!isComputed} />
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));