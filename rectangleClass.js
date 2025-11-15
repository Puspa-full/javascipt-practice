class Rectangle {
   constructor (length, width){
      this.length = length;
      this.width = width;
   }

   getArea() {
      return this.length * this.width;
   }

   getPerimeter() {
      return 2*(this.length + this.width);
   }
}

const rectangle1 = new Rectangle(5, 10);
console.log(rectangle1.getArea());
console.log(rectangle1.getPerimeter());