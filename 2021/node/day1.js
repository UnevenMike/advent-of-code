const fs = require('fs')
data = fs.readFileSync('../input_01_1.txt').toString()
numList = data.split("\n").map(x => parseInt(x))
var count = 0;
for(var i = 1; i < numList.length; i++) {
    if (numList[i] > numList[i-1]) {
        count ++
    }
}
console.log(count)