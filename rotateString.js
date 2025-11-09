let str = "w3resource";
let str2 = '';
function rotateStr (str1) {
    for (let i=str.length-1;i>=0;i--){
        str2 = str2 + str[i];
    }

    return str2;
}

console.log(rotateStr(str));

const rotateStr2 = (str1) => str.split('').reverse().join("");

console.log(rotateStr2(str));

