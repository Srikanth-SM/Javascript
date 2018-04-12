//closures
//Examples from "you dont know js up and going"
var a =require("fs");
function makeadder(x){
    
    function add(y){
        return x+y;
    }
    return add;
}

var plusone = makeadder(1); //plusone is a reference to  the function returned by makeadder it becomes plusone()

var plusten = makeadder(10); //plusten is a reference to  the function returned by makeadder so indirectly it becomes plusten()

console.log(plusone(3));
console.log(plusten(13));
/*

When we call makeAdder(1), we get back a reference to its inner
add(..) that remembers x as 1. We call this function reference
plusOne(..).
2. When we call makeAdder(10), we get back another reference to
its inner add(..) that remembers x as 10. We call this function
reference plusTen(..).
3. When we call plusOne(3), it adds 3 (its inner y) to the 1
(remembered by x), and we get 4 as the result.
4. When we call plusTen(13), it adds 13 (its inner y) to the 10
(remembered by x), and we get 23 as the result

*/ 

