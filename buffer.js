var buf = new Buffer(26);

for (var i = 0; i < 26 ; i++)
    buf[i] = i + 97;

console.log(buf);
console.log(buf.toString('utf8'));
console.log(buf.toString('ascii'));
console.log(buf.toString('utf8', 0, 6));