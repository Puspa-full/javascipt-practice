class Person {
   constructor (name, age, city) {
      this.name = name;
      this.age = age;
      this.city = city;
   }

   introduce (){
      return `Hi, I'm ${this.name}, ${this.age}, years old from ${this.city}.`
   }
}

const person1 = new Person("Anish", 21, "Toronto")
console.log(person1.introduce());
