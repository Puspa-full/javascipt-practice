// Built in method
function reverseString (str) {
  let reversedStr = str.split("").reverse().join("");
  return reversedStr;
}

console.log(reverseString("hello"));

// using arrow function
const reverseString2 = (str2) => {let reversedStr2 = str2.split("").reverse().join(""); return reversedStr2;}

console.log(reverseString2("hello"));

// using loop
function reverseString3 (str3) {
  let reversed = '';
  for (let i=str3.length-1;i>=0;i--){
    reversed += str3[i]
  }

  return reversed;
}

console.log(reverseString3("hello"));