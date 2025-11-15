class Student {
   constructor(name, arr=[]){
      this.name=name;
      this.arr = arr;
   }

   addGrade(grade){
      this.arr.push(grade);
   }

   getAverage (){
      let average = this.arr.reduce((total, num)=>total+num,0)/this.arr.length;
      return average;
   }
   hasPassed(){
      if (this.getAverage() >= 60){
         return "Passed";
      } else {
         return "Failed";
   }
}
};

const student = new Student("John");

student.addGrade(85);
student.addGrade(90);
student.addGrade(78);

console.log(student.getAverage()); // Should output: 84.33 (or close to it)
console.log(student.hasPassed());  // Should output: true

// to Imporve the code look for edge cases like negative input or no grade inputs
