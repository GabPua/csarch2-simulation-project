function InDepthRow({ substep, values, className }) {
  const cells = [<td className="has-text-weight-bold" style={{ width: '92px' }} key={substep}>{substep}</td>];

  for (let i = 0; i < values.length - 1; i++) {
    for (let j = 0; j < values[i].length; j++) {
      cells.push(<td key={`${i}x${j}`}>{values[i][j]}</td>);
    }
  }
  cells.push(<td key={'2x0'} style={{ width: '42px' }}>{values[2][0]}</td>);

  return (
    <tr className={className}>{cells}</tr>
  );
}


function InDepthCluster({ steps, counter }) {
  const tables = [];
  const n = steps.length - 1;

  for (let i = 0; i < n + 1; i++) {
    let className = '';

    if (i > counter) {
      className = 'is-invisible';
    } else if (i == counter) {
      className = 'is-selected';
    }

    tables.push(
      <div className="table-container" key={'table' + i}>
        <table className="table is-bordered" style={{ width: '100%' }} >
          {i == 0 &&
            <thead>
              <tr>
                <th>Step</th>
                <th colSpan={n}>A</th>
                <th colSpan={n}>Q</th>
                <th>Q0</th>
              </tr>
            </thead>
          }
          <tbody>
            {steps[i].map(step => <InDepthRow key={i + step.substep} substep={step.substep}
              values={step.values} className={className} />)}
          </tbody>
        </table>
      </div>
    );
  }

  return (tables);
}