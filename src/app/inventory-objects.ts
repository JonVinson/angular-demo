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

export class Manufacturer {
  id?: number;
  name: string = '';
  code: string = '';
  products?: any;
}

export class Supplier {
  id?: number;
  name: string = '';
  code: string = '';
  products?: any;
}