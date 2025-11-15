function groupBy(std, searchby){
   // [...new Set] removes the duplicate and put it in an array
   let s = [...new Set(std.map(s=>s[searchby]))].sort();
   let out = {};
   for(let i in s){
      let sorted = std.filter(j => j[searchby] === s[i]);
      out[s[i]] = sorted;
   }
   return out;
}

const students = [
  { name: "John", grade: "A", age: 20 },
  { name: "Jane", grade: "B", age: 21 },
  { name: "Bob", grade: "A", age: 20 },
  { name: "Alice", grade: "B", age: 21 },
  { name: "Charlie", grade: "A", age: 22 }
];

console.log(groupBy(students, "grade"));

// Reduced Approach:
function groupBy(array, property) {
   return array.reduce((result, item) => {
      const key = item[property];
      result[key] = result[key] || [];
      result[key].push(item);
      return result;
   }, {});
}