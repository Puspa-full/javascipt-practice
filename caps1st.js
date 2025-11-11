function cap1stlet(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

console.log(cap1stlet('javascript'));

function cap1stlet2(str){
    let a = str.split(" ");
    for (i=0; i<a.length;i++){
       a[i] = a[i].charAt(0).toUpperCase() + a[i].slice(1);
    } 
    return a.join(" "); 
}

console.log(cap1stlet2('the quick brown fox jumps over lazy dog'));