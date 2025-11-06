function checkPalindrome (str) {
  const cleaned = str.toLowerCase().replace (/[^-z0-9]/g, "");

  for (let i = 0; i<cleaned.length/2; i++){
    if (cleaned[i] !== cleaned[cleaned.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

console.log(checkPalindrome("Hello"));
console.log(checkPalindrome("MADAM"));
