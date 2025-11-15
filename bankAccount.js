class BankAccount {
   constructor (accountholder, balance) {
      this.accountholder = accountholder;
      this._balance = balance;
   }

   deposit(amount) {
      this._balance += amount;
      return `Hi ${this.accountholder}!! You deposited $${amount} and now your total balance is $${this._balance}`;   
   };

   withdraw(amount) {
      if (amount <= this._balance) {
         this._balance -= amount;
         return `Hi ${this.accountholder}!! You withdrew $${amount} and now your total balance is $${this._balance}`;  
      } else {
         return `Hi ${this.accountholder}!! Your withdraw request of $${amount} has been reject as you only have total balance of $${this._balance}`; 
      }
   }
}

const bank = new BankAccount("Puspa", 2000);

console.log(bank.deposit(300));
console.log(bank.withdraw(3300));