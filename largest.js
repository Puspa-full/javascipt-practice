// largest if no negative
function largest (num) {
  let large = 0;
  for (let i=0; i<num.length;i++){
    if (num[i]>large){
      large = num[i];
    }
  }
  return large;
}

console.log(largest([2, 10, 50, 1, 11, 100, 55]))