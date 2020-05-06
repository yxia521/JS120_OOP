// build factory functions for invoice
function createInvoice(services = {}) {
  let phoneCharge = services.phone || 3000;
  let internetCharge = services.internet || 5500;

  return {
    phone: phoneCharge,
    internet: internetCharge,

    total() {
      return this.phone + this.internet;
    },
  };
}

function invoiceTotal(invoices) {
  let total = 0;
  for (let idx = 0; idx < invoices.length; idx++) {
    total += invoices[idx].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoiceTotal(invoices)); // 31000

// build factory functions for payment
function createPayment(services = {}) {
  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,

    total() {
      return this.amount || this.phone + this.internet;
    },
  };
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment)  => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));      // => 24000

// Update the createInvoice function so that it can add payment(s) to invoices
function createInvoice(services = {}) {
  let phoneCharge = services.phone || 3000;
  let internetCharge = services.internet || 5500;

  return {
    phone: phoneCharge,
    internet: internetCharge,
    payments: [],

    total() {  // total invoice
      return this.phone + this.internet;
    },

    addPayment(payment) {
      this.payments.push(payment);
    },

    addPayments(payments) {
      this.payments.push(...payments);
    },

    paymentTotal() {
      return this.payments.reduce((sum, payment) => sum + payment.total(), 0);
    },

    amountDue() {
      return this.total() - this.paymentTotal();
    },
  };
}

function createPayment(services = {}) {
  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,

    total() {
      return this.amount || this.phone + this.internet;
    },
  };
}

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());       // => 0
