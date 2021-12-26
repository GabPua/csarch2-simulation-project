function negate(binString) {
    let result = binString;

    let l = result.length;
    let flip = false;
    for (let i = l - 1; i >= 0; i--) {
        if (flip) {
            result = result.slice(0, i) + (1 - Number(result[i])) + result.slice(i + 1, l);
        } else {
            flip = result[i] === "1";
        }
    }

    return result;
}

function getBinary(n) {
    let result = "";
    let neg = n < 0;
    n = Math.abs(n);

    while (n > 0) {
        result = (n % 2) + result;
        n = Math.floor(n / 2);
    }
    result = 0 + result;

    if (neg) {
        result = negate(result);
    }

    return result;
}

function add(op1, op2) {
    let n = op1.length; // assume lengths are equal
    let result = "";

    let carry = 0;
    for (let i = n - 1; i >= 0; i--) {
        let sum = Number(op1[i]) + Number(op2[i]) + carry;
        result = (sum % 2) + result;
        carry = Math.floor(sum / 2);
    }

    return result;
}

function multiply(op1, op2) {
    // get binary representation
    let bin1 = getBinary(op1);
    let bin2 = getBinary(op2);

    let n = Math.max(bin1.length, bin2.length);
    while (bin1.length < n) {
        bin1 = bin1[0] + bin1;
    }
    while (bin2.length < n) {
        bin2 = bin2[0] + bin2;
    }

    // initialize variables
    let m = bin1;
    let m_neg = negate(bin1);
    let a = "0".repeat(n);
    let q = bin2;
    let q0 = "0";
    let result = [[a, q, q0]];

    // perform multiplication algorithm
    for (let i = 0; i < n; i++) {
        // check whether to add
        if (q[n - 1] === "0" && q0 === "1") {
            a = add(a, m);
        } else if (q[n - 1] === "1" && q0 === "0") {
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

module.exports = {
    multiply: multiply
}