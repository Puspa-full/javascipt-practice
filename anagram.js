// first general solution
function anagram (str1, str2) {
  let count = 0;
  for (i=0;i<str1.length;i++){
    if (str1.includes(str2[i])){
    }else {
      return false;
    }
  }
  return true;
}

console.log(anagram('listen', 'pissed'));

function anagram2(str1, str2){
  str1 = str1.replace(/\s/g,'').toLowerCase();
  str2 = str1.replace(/\s/g,'').toLowerCase();
  
  if (str1.length === str2.length) return false;
  return str1.split('').sort().join('') === str2.split('').sort().join('');
}

console.log(anagram2('listen', 'silent'));

// without using built-in methods
function anagram3(str1, str2){
  if (str1.length !== str2.length) return false;

  for(let i=0;i<str2.length;i++){
    let index = str1.indexOf(str2[i]);
    // in JavaScript if a character in str2 is not present in str1 than it gives index = -1
    // so if index is -1 that means a certain character is not available in str1 so can stop and return false if not continue to slice str1
    if(index !== -1){
      str1 = str1.slice(0, index)+str1.slice(index+1);
    }else{
      return false;
    }
  }
  return true;

}

console.log(anagram3('aabb', 'abab'));