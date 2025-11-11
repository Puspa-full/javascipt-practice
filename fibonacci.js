function fibo(n){
    let store = [];
    for(let i=0;i<n;i++){
        if (i<2){store.push(i)}
        else {store.push(store[i-2]+store[i-1])}
    }
    return store;
}

console.log(fibo(8));