class Product {
   constructor (name, price){
      this.name = name;
      this.price = price;
   }

   getPrice(){
      return this.price;
   }
}

class DiscountedProduct extends Product {
   constructor (name, price, discount){
      super(name,price);
      this.discount = discount;
   }

   getPrice () {
      return this.price - (this.price * this.discount/100);
   }
}

const discountedProduct = new DiscountedProduct("Laptop", 1000, 20);
console.log(discountedProduct.getPrice());