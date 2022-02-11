function negate(binString) {
  let result = binString;
  const l = result.length;
  let flip = false;

  for (let i = l - 1; i >= 0; i--) {
    if (flip) {
      result = result.slice(0, i) + (1 - Number(result[i])) + result.slice(i + 1, l);
    } else {
      flip = result[i] === '1';
    }
  }

  return result;
}

function getBinary(n) {
  let result = '';
  const neg = n < 0;
  n = Math.abs(n);

  while (n > 0) {
    result = (n % 2) + result;
    n = Math.floor(n / 2);
  }
  result = '0' + result;

  if (neg) {
    result = negate(result);
  }

  return result;
}

function add(op1, op2) {
  const n = op1.length; // assume lengths are equal
  let result = '';

  let carry = 0;
  for (let i = n - 1; i >= 0; i--) {
    const sum = Number(op1[i]) + Number(op2[i]) + carry;
    result = (sum % 2) + result;
    carry = Math.floor(sum / 2);
  }

  return result;
}

function evaluate(binString) {
  const neg = binString[0] === '1';
  if (neg) {
    binString = negate(binString);
  }

  let ans = 0;
  for (let i = 0; i < binString.length; i++) {
    ans = ans * 2 + Number(binString[i]);
  }
  if (neg) {
    ans = -ans;
  }

  return ans;
}

// eslint-disable-next-line no-unused-vars
function multiply(op1, op2, mode) {
  // get binary representation if decimal
  if (mode === 'decimal') {
    op1 = getBinary(Number(op1));
    op2 = getBinary(Number(op2));
  }

  const n = Math.max(op1.length, op2.length);
  const bin1 = op1.padStart(n, op1[0]);
  const bin2 = op2.padStart(n, op2[0]);

  // initialize variables
  const m = bin1;
  const m_neg = negate(bin1);
  let a = '0'.repeat(n);
  let q = bin2;
  let q0 = '0';
  const steps = [[{ substep: 'Initial:', values: [a, q, q0] }]];

  // perform multiplication algorithm
  for (let i = 0; i < n; i++) {
    let pass = [];

    // check whether to add
    if (q[n - 1] === '0' && q0 === '1') {
      a = add(a, m);
      pass.push({ substep: 'Add +M:', values: [a, q, q0] });
    } else if (q[n - 1] === '1' && q0 === '0') {
      a = add(a, m_neg);
      pass.push({ substep: 'Add -M:', values: [a, q, q0] });
    } else {
      pass.push({ substep: 'Add 0:', values: [a, q, q0] });
    }

    // shift
    q0 = q[n - 1];
    q = a[n - 1] + q.slice(0, n - 1);
    a = a[0] + a.slice(0, n - 1);
    pass.push({ substep: 'Shift:', values: [a, q, q0] });

    // add to result array
    steps.push(pass);
  }

  // evaluate answer
  let answer = steps[n][1].values[0] + steps[n][1].values[1];
  if (mode === 'decimal') {
    answer = evaluate(answer);
  }

  return {
    m,
    m_neg,
    steps,
    answer
  };
}

// utils
function downloadComputation(operands, mode, result) {
  const newSteps = [];
  const n = result.steps.length - 1;

  // combine steps into one string
  for (let i = 0; i < n + 1; i++) {
    for (let j = 0; j < 2; j++) {
      if (i == 0 && j == 1) {
        continue;
      }

      const { substep, values } = result.steps[i][j];
      let output = substep.padEnd(11, ' ') + values.join(' ');

      if (i == 0 || (i != n && j == 1)) {
        output += '\n';
      }

      newSteps.push(output);
    }
  }

  // add label
  for (let i = 1; i < n + 1; i++) {
    let label;
    switch (i) {
    case 1: label = '1st'; break;
    case 2: label = '2nd'; break;
    case 3: label = '3rd'; break;
    default: label = i + 'th';
    }
    label += ' pass:\n';

    newSteps[2 * i - 1] = label + newSteps[2 * i - 1];
  }

  // add operands and headers
  newSteps.unshift(`Operand 1: ${operands[0]}`,
    `Operand 2: ${operands[1]}\n`,
    `+M:        ${result.m}`,
    `-M:        ${result.m_neg}\n`,
    ' '.repeat(11) + 'A' + ' '.repeat(n) + 'Q' + ' '.repeat(n) + 'Q0');
  if (mode === 'binary') {
    newSteps[0] += 'b';
    newSteps[1] = newSteps[1].slice(0, newSteps[1].length - 1) + 'b\n';
  }

  if (mode === 'binary') {
    newSteps.push(`\nAnswer:    ${result.answer}b`);
  } else {
    newSteps.push(`\nAnswer:    ${result.answer}`);
  }

  const text = newSteps.join('\n');

  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', 'Computation.txt');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
