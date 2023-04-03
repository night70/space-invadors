let arr = ['one','two','three'];
console.log(arr);
for (let iterator of arr) {
    if(iterator=='two'){
        arr.splice(1,1);
    }
}
console.log(arr);