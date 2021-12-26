/*global React */
/*global ReactDOM */
// eslint-disable-next-line no-unused-vars
function NavButton({ icon, style }) {
  return (
    <p className="control">
      <button type="button" className={`button ${style}`}>
        <span className="icon is-medium">
          <i className={`fa-solid fa-lg ${icon}`} />
        </span>
      </button>
    </p>
  )
}

function App() {
  return (
    <div className="columns" style={{ 'min-height': '100vh' }}>
      <div className="column is-four-fifths">

      </div>

      <div className="column is-flex is-flex-direction-column is-justify-content-center">
        <Form />
        <div className="px-5 is-flex is-justify-content-space-between">
          <div className="field is-grouped">
            <NavButton icon="fa-arrow-left" style="is-light" />
            <NavButton icon="fa-play" style="is-light" />
            <NavButton icon="fa-arrow-right" style="is-light" />
          </div>
          <NavButton icon="fa-download" style="is-link" />
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));