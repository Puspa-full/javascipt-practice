function splitArray (numbers, div) {
   let new_array = []
   let running_array = []
   for (let i=0;i<numbers.length;i++){
      running_array.push(numbers[i]);
      if(running_array.length === div || numbers.length-1 === i){
         new_array.push(running_array);
         running_array = [];
      }
   }
   return new_array;
}

const num = [1, 2, 3, 4, 5, 6, 7, 8];

console.log(splitArray(num, 3));
