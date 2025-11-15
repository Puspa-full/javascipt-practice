function createMultiplier(num) {
   return function nultiply(n){
      return n*num;
   }
}

;
console.log(createMultiplier(5)(10));

// Arrow Function

const createMultiplier2 = (num) => (n) => num *n;

let multiplyBy10 = createMultiplier2(20)
console.log(multiplyBy10(10));