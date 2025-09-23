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
}

export class Manufacturer {
  id?: number;
  name: string = '';
  code: string = '';
  products?: any;
}