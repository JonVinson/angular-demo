export class Department {
  id?: number;
  name: string = '';
  code: string = '';
  products?: any;
}

export class Product {
  id?: number;
  departmentId: number = 0;
  manufacturerId: number = 0;
  modelNumber: string = '';
  description: string = '';
  price: number = 0;
}

export class Transaction {
  id?: number;
  date: Date = new Date();
  transactionType: number = 0;
  productId: number = 0;
  productName: string = '';
  companyId: number = 0;
  companyName: string = '';
  quantity: number = 0;
  price: number = 0;
  totalAmount: number = 0;
  note: string = '';
}

export class Manufacturer {
  id?: number;
  name: string = '';
  code: string = '';
  products?: any;
}

export class Company {
  id?: number;
  name: string = '';
  code: string = '';
  street: string = '';
  city: string = '';
  state: string = '';
  country: string = '';
  postalCode: string = '';
  contactEmail: string = '';
  contactName: string = '';
  phoneNumber: string = '';
  products?: any;
}

export type Supplier = Company;
export type Customer = Company;

export class ReportItem {
  department: string = '';
  revenue: number = 0;
  cost: number = 0;
  netIncome: number = 0;
}