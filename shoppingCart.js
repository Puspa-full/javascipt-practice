class ShoppingCart {
   constructor () {
      this.items = [];
   }

   addItem(name, price, quantity) {
      const existingItem = this.items.find(item => item.name === name);

      if(existingItem){
         existingItem.quantity += quantity;
      }else {
         this.items.push({name:name, price:price, quantity:quantity });
      }
   }

   removeItem(name){
      this.items = this.items.filter(item => item.name !== name )
   }

   calculateTotal() {
      return this.items.reduce((total, item) =>total + item.price*item.quantity, 0);
   }

   applyDiscount(percentage) {
      return this.calculateTotal() - (this.calculateTotal()*percentage/100);
   }

}

const shopping = new ShoppingCart();



shopping.addItem("Computer", 30, 3);
console.log(shopping.addItem("Laptop", 25, 2));
console.log(shopping.removeItem("Computer"));
console.log(shopping.addItem("Laptop", 25, 2));
console.log(shopping.calculateTotal())
console.log(shopping.applyDiscount(20))