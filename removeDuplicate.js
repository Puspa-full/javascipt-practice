function rDupli(str){
    let noDupli = [];
    for (let i=0;i<str.length;i++){
        if (!noDupli.includes(str[i])){ // checks if str[i] is included in the array noDupli already
            noDupli.push(str[i]);
        }
    }
    return noDupli;
}

console.log(rDupli([1, 5, 9, 10, 1, 2, 5, 10]));