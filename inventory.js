class Inventory {
   constructor (){
      this.products = []
      this.nextId = 1;
   }

   addProduct(name, price, quantity, category){
      this.products.push({
         id: this.nextId, 
         name:name.toLowerCase(), 
         price:price, 
         quantity:quantity, 
         category:category.toLowerCase()
      });

      this.nextId++;
      return this.products;
   }

   removeProduct(id){
      this.products = this.products.filter(product => product.id !== id)
      return this.products
   }

   updateQuantity(id, newQuantity){
      if (newQuantity>0){
         const changequantity = this.products.find(product => product.id === id);
         changequantity.quantity = newQuantity;
         return this.products;
      }else {
         return "Sorry the quantity you have entered is invalid"
      }
   }

   searchByName(name){
      return this.products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
   }

   searchByCategory(category){
      return this.products.filter(product => product.category.toLowerCase().includes(category.toLowerCase()));
   }

   getLowStock(threshold = 5){
      return this.products.filter(product => product.quantity < threshold);
   }

   getTotalValue(){
      return this.products.reduce((total, product) => total = total + (product.quantity * product.price),0 );
   }

   getProductById(id){
      return this.products.find(product => product.id === id);
   }
};

const inven = new Inventory()

console.log(inven.addProduct("Laptop", 1000, 10, "Electronics"));

console.log(inven.addProduct("Chair", 150, 5, "Furniture"))

console.log(inven.removeProduct(2))
console.log(inven.updateQuantity(1, 40));