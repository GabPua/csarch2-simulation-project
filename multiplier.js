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

  const bin1 = op1, bin2 = op2;
  const n = Math.max(bin1.length, bin2.length);
  bin1.padStart(n, bin1[0]);
  bin2.padStart(n, bin2[0]);

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