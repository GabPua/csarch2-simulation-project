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
  for (let i = 0; i < steps.length; i++) {
    let className = '';
    
    if (i > counter) {
      className = 'is-invisible';
    } else if (i == counter) {
      className = 'is-selected';
    }

    rows.push(<Row key={i} data={steps[i].join('')} className={className}/>);
  }

  return (
    <table className="table is-bordered">
      <thead>
        <tr>
          <th colSpan={steps[0][0].length}>A</th>
          <th colSpan={steps[0][1].length}>Q</th>
          <th>Q0</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}