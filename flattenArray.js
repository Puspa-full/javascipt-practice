function flatten(arr) {
   let result = [];
   for(let i of arr){
      if (Array.isArray(i)){
         result = result.concat(flatten(i));
      } else {
         result.push(i);
      }
   }
   return result;
}  