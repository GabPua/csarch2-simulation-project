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
  const result = [[a, q, q0]];

  // perform multiplication algorithm
  for (let i = 0; i < n; i++) {
    // check whether to add
    if (q[n - 1] === '0' && q0 === '1') {
      a = add(a, m);
    } else if (q[n - 1] === '1' && q0 === '0') {
      a = add(a, m_neg);
    }

    // shift
    q0 = q[n - 1];
    q = a[n - 1] + q.slice(0, n - 1);
    a = a[0] + a.slice(0, n - 1);

    // add to result array
    result.push([a, q, q0]);
  }

  return result;
}

// utils
function downloadComputation(operands, steps) {
  for (let i = 0; i < steps.length; i++) {
    steps[i] = steps[i].join(' ');
  }
  steps.unshift(`Operand 1: ${operands[0]}`, `Operand 2: ${operands[1]}\n`);

  const text = steps.join('\n');
  
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', 'Computation.txt');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
