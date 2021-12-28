/*global React */
/*global ReactDOM */
/*global downloadComputation */
// eslint-disable-next-line no-unused-vars
function NavButton({ icon, style, onClick, disabled, id }) {
  return (
    <p className="control">
      <button type="button" className={`button ${style}`} onClick={onClick} disabled={disabled} id={id}>
        <span className="icon is-medium">
          <i className={`fa-solid fa-lg ${icon}`} />
        </span>
      </button>
    </p>
  );
}

function App() {
  const [operands, setOperands] = React.useState([]);
  const [mode, setMode] = React.useState('Decimal');
  const [steps, setSteps] = React.useState([['0', '0', '0']]);
  const [isComputed, setIsComputed] = React.useState(false);
  const [counter, setCounter] = React.useState(0);

  const submitHandler = (op1, op2, mode) => {
    setSteps(multiply(op1, op2, mode));
    setOperands([op1, op2]);
    setMode(mode);
    setIsComputed(true);
    setCounter(0);
  };

  const resetStates = () => {
    setSteps([['0', '0', '0']]);
    setIsComputed(false);
    setCounter(0);
  };
  
  React.useEffect(() => {
    const next = document.getElementById('next-btn');
    const prev = document.getElementById('prev-btn');

    function onArrowPress(e) {
      if (e.key === 'ArrowLeft') prev.click();
      else if (e.key === 'ArrowRight')  next.click();
    }

    document.addEventListener('keydown', onArrowPress);
    return () => document.removeEventListener('keydown', onArrowPress);
  }, []);

  return (
    <div className="columns" style={{ 'minHeight': '100vh' }}>
      <div className="column is-flex is-align-content-center is-justify-content-center is-align-items-center">
        <Display step={steps[counter]} />
      </div>

      <div className="column is-3 is-flex is-flex-direction-column is-justify-content-center">
        <Form submitHandler={submitHandler} resetStates={resetStates} />
        <div className="px-5 is-flex is-justify-content-space-between">
          <div className="field is-grouped">
            <NavButton icon="fa-arrow-left" style="is-light" onClick={() => setCounter(counter - 1)} disabled={!isComputed || counter == 0} id="prev-btn" />
            <NavButton icon="fa-play" style="is-light" disabled={!isComputed} />
            <NavButton icon="fa-arrow-right" style="is-light" onClick={() => setCounter(counter + 1)} disabled={!isComputed || counter == steps.length - 1} id="next-btn" />
          </div>
          <p className={isComputed? '' : 'has-text-grey'}>Step {counter} of {steps.length - 1}</p>
          <NavButton icon="fa-download" style="is-link" onClick={() => downloadComputation(operands, mode, steps)} disabled={!isComputed} />
        </div>
      </div>
      <div className="column is-1"></div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));