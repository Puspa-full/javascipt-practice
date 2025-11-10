function factorial (str) {
    let mul = 1;
    for (let i=1;i<= str;i++){
        mul = mul * i;
    }
    return mul;
}

console.log(factorial(8));