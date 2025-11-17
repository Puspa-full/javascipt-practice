class BankAccount {
   constructor (accountholder, balance) {
      this.accountholder = accountholder;
      this._balance = balance;
      this.transactions = []
      this.nextTransactionId = 1;
   }

   deposit(amount) {
      this._balance += amount;

      this.transactions.push({
         id: this.nextTransactionId,
         date: new Date(),
         type: "deposit", 
         amount: amount,
         balance: this._balance
      })
      
      this.nextTransactionId++;


      return `Hi ${this.accountholder}!! You deposited $${amount} and now your total balance is $${this._balance}`;
      
   };

   withdraw(amount) {
      if (amount <= this._balance) {
         this._balance -= amount;

         this.transactions.push({
         id: this.nextTransactionId,
         date: new Date(),
         type: "withdraw", 
         amount: amount,
         balance: this._balance
         })
         
         this.nextTransactionId++;


         return `Hi ${this.accountholder}!! You withdrew $${amount} and now your total balance is $${this._balance}`;

        

      } else {
         return `Hi ${this.accountholder}!! Your withdraw request of $${amount} has been reject as you only have total balance of $${this._balance}`;
      }
   }

   getBalance(){
      return `Hi your current balance is $${this._balance}`
   }

   getTransactionHistory(){
      return this.transactions;
   }

   getStatement(n) {
      return this.transactions.slice(-n);
   }

   getTransactionsByType(type) {
      return this.transactions.filter(transaction => transaction.type.toLowerCase() === type.toLowerCase());
   }

   calculateInterest(rate) {
      let interest = this._balance * (rate/100);
      this._balance += interest;

      this.transactions.push({
         id: this.nextTransactionId,
         date: new Date(),
         type: "interest", 
         amount: interest,
         balance: this._balance
      })
         
      this.nextTransactionId++;
      
      return interest;

   }

}

const account = new BankAccount("John", 1000);

account.deposit(500);    
account.withdraw(200);   
account.deposit(300);    
account.calculateInterest(5); 

console.log(account.getBalance()); 

console.log(account.getTransactionHistory().length); 

console.log(account.getStatement(2)); 

console.log(account.getTransactionsByType("deposit").length); 

console.log(account.getTransactionsByType("interest").length); 
