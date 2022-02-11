function Row({ data, className }) {
  const cells = [];
  for (let i = 0; i < data.length; i++) {
    cells.push(<td key={i}>{data[i]}</td>);
  }

  return (
    <tr className={className}>{cells}</tr>
  );
}

function Table({ steps, counter }) {
  const rows = [];
  const n = steps.length - 1;
  for (let i = 0; i < n + 1; i++) {
    let className = '';

    if (i > counter) {
      className = 'is-invisible';
    } else if (i == counter) {
      className = 'is-selected';
    }

    rows.push(<Row key={i} data={steps[i][(i == 0 ? 0 : 1)].values.join('')} className={className} />);
  }

  return (
    <table className="table is-bordered">
      <thead>
        <tr>
          <th colSpan={n}>A</th>
          <th colSpan={n}>Q</th>
          <th>Q0</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}