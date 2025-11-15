function createCounter(num) {
   let number = num;
   return {
      increment: function(){
         return num+=1;
      },
      decrement: function() {
         return num -=1;
      },
      getValue: function() {
         return num;
      },
      reset: function() {
         num = number;
         return num;
      }
   }
}

function createCounter2(num){
   let number = num;
   return {
      increment: () => ++num,
      decrement: () => --num,
      getValue: () => num,
      reset: () => num = number
   }
}

const counter = createCounter(5);
console.log(counter.getValue());  // 5
console.log(counter.increment()); // 6
console.log(counter.decrement()); // 5
console.log(counter.reset());