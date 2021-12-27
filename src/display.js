function Table({ title, data }) {
  const cells = [];
  for (let i = 0; i < data.length; i++) {
    cells.push(<td key={i}>{data[i]}</td>);
  }

  return (
    <table className="table is-bordered">
      <thead><tr><th colSpan={data.length}>{title}</th></tr></thead>
      <tbody>
        <tr>{cells}</tr>
      </tbody>
    </table>
  );
}

function Display({ step }) {
  return (
    <div className="columns">
      <div className="column is-narrow">
        <Table title="A" data={step[0]} />
      </div>
      <div className="column is-narrow">
        <Table title="Q" data={step[1]} />
      </div>
      <div className="column is-narrow">
        <Table title="Q0" data={step[2]} />
      </div>
    </div>
  );
}