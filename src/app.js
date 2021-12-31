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
  const [isPlaying, setIsPlaying] = React.useState(null);

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

  const incrementCounter = () => { if (counter < steps.length - 1) setCounter(count => count + 1); };
  const decrementCounter = () => { if (counter > 0) setCounter(count => count - 1); };

  const handlePlayClick = () => {
    if (isPlaying) {
      clearInterval(isPlaying);
      setIsPlaying(null);
    } else {
      setIsPlaying(setInterval(incrementCounter, 500));
    }
  };

  React.useEffect(() => {
    const next = document.getElementById('next-btn');
    const prev = document.getElementById('prev-btn');

    function onArrowPress(e) {
      if (e.key === 'ArrowLeft') prev.click();
      else if (e.key === 'ArrowRight') next.click();
    }

    document.addEventListener('keydown', onArrowPress);
    return () => document.removeEventListener('keydown', onArrowPress);
  }, []);

  React.useEffect(() => {
    if (isPlaying && counter == steps.length - 1) {
      clearInterval(isPlaying);
      setIsPlaying(null);
    }
  }, [counter]);

  return (
    <div className="columns is-multiline" style={{ 'minHeight': '100vh' }}>
      <div className="column is-one-quarter-fullhd is-full is-flex is-flex-direction-column is-justify-content-center px-5">
        <Form submitHandler={submitHandler} resetStates={resetStates} />
        <div className="px-5 is-flex is-justify-content-space-between">
          <div className="field is-grouped">
            <NavButton icon="fa-arrow-left" style="is-light" onClick={decrementCounter} disabled={!isComputed || counter == 0} id="prev-btn" />
            <NavButton icon="fa-play" style={isPlaying ? 'is-primary' : 'is-light' } disabled={!isComputed || counter == steps.length - 1} onClick={handlePlayClick} />
            <NavButton icon="fa-arrow-right" style="is-light" onClick={incrementCounter} disabled={!isComputed || counter == steps.length - 1} id="next-btn" />
          </div>
          <p className={isComputed ? '' : 'has-text-grey'}>Step {counter} of {steps.length - 1}</p>
          <NavButton icon="fa-download" style="is-link" onClick={() => downloadComputation(operands, mode, steps)} disabled={!isComputed} />
        </div>
      </div>
      <div className="column is-flex is-align-content-center is-justify-content-center is-align-items-center">
        <div className="table-container">
          <Table steps={steps} counter={counter} />
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));