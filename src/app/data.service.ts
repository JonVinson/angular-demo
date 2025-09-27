import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, Department, Manufacturer, Product, Supplier } from './inventory-objects';

import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private static urlRoot: string = environment.DATA_SERVICE_ROOT_URL;

  private http = inject(HttpClient);

  constructor() { }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${DataService.urlRoot}/Department/Get`);
  }

  addDepartment(name: string, code: string) : Observable<Object>  {
    const params = new HttpParams()
      .set('name', name)
      .set('code', code);

    return this.http.post(DataService.urlRoot + '/Department/Create',  params);
  }

  updateDepartment(id: number, name: string, code: string) : Observable<Object>  {
    const params = new HttpParams()
      .set('id', id)
      .set('name', name)
      .set('code', code);

    return this.http.post(DataService.urlRoot + '/Department/Update',  params);
  }

  deleteDepartment(id: number) : Observable<Object> {
    const params = new HttpParams()
      .set('id', id);

      return this.http.post(DataService.urlRoot + '/Department/Delete', params);
  }

  getManufacturers(): Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>(`${DataService.urlRoot}/Manufacturer/Get`);
  }

  addManufacturer(name: string, code: string) : Observable<Object>  {
    const params = new HttpParams()
      .set('name', name)
      .set('code', code);

    return this.http.post(DataService.urlRoot + '/Manufacturer/Create',  params);
  }

  updateManufacturer(id: number, name: string, code: string) : Observable<Object>  {
    const params = new HttpParams()
      .set('id', id)
      .set('name', name)
      .set('code', code);

    return this.http.post(DataService.urlRoot + '/Manufacturer/Update',  params);
  }

  deleteManufacturer(id: number) : Observable<Object> {
    const params = new HttpParams()
      .set('id', id);

      return this.http.post(DataService.urlRoot + '/Manufacturer/Delete', params);
  }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${DataService.urlRoot}/Supplier/Get`);
  }

  addSupplier(data: Supplier) : Observable<Object>  {
    const params = new HttpParams()
      .set('name', data.name)
      .set('code', data.code)
      .set('street', data.street)
      .set('city', data.city)
      .set('state', data.state)
      .set('country', data.country)
      .set('postalCode', data.postalCode)
      .set('contactEmail', data.contactEmail)
      .set('contactName', data.contactName)
      .set('phoneNumber', data.phoneNumber);

    return this.http.post(DataService.urlRoot + '/Supplier/Create',  params);
  }

  updateSupplier(data: Supplier) : Observable<Object>  {
    const params = new HttpParams()
      .set('id', data.id!)
      .set('name', data.name)
      .set('code', data.code)
      .set('street', data.street)
      .set('city', data.city)
      .set('state', data.state)
      .set('country', data.country)
      .set('postalCode', data.postalCode)
      .set('contactEmail', data.contactEmail)
      .set('contactName', data.contactName)
      .set('phoneNumber', data.phoneNumber);

    return this.http.post(DataService.urlRoot + '/Supplier/Update',  params);
  }

  deleteSupplier(id: number) : Observable<Object> {
    const params = new HttpParams()
      .set('id', id);

      return this.http.post(DataService.urlRoot + '/Supplier/Delete', params);
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${DataService.urlRoot}/Customer/Get`);
  }

  addCustomer(data: Customer) : Observable<Object>  {
    const params = new HttpParams()
      .set('name', data.name)
      .set('code', data.code)
      .set('street', data.street)
      .set('city', data.city)
      .set('state', data.state)
      .set('country', data.country)
      .set('postalCode', data.postalCode)
      .set('contactEmail', data.contactEmail)
      .set('contactName', data.contactName)
      .set('phoneNumber', data.phoneNumber);

    return this.http.post(DataService.urlRoot + '/Customer/Create',  params);
  }

  updateCustomer(data: Customer) : Observable<Object>  {
    const params = new HttpParams()
      .set('id', data.id!)
      .set('name', data.name)
      .set('code', data.code)
      .set('street', data.street)
      .set('city', data.city)
      .set('state', data.state)
      .set('country', data.country)
      .set('postalCode', data.postalCode)
      .set('contactEmail', data.contactEmail)
      .set('contactName', data.contactName)
      .set('phoneNumber', data.phoneNumber);

    return this.http.post(DataService.urlRoot + '/Customer/Update',  params);
  }

  deleteCustomer(id: number) : Observable<Object> {
    const params = new HttpParams()
      .set('id', id);

      return this.http.post(DataService.urlRoot + '/Customer/Delete', params);
  }

  getProducts(deptId: number, manuId: number, name: string): Observable<Product[]> {
    const params = new HttpParams()
      .set('name', name)
      .set('deptId', deptId)
      .set('manuId', manuId);

      return this.http.get<Product[]>(`${DataService.urlRoot}/Product/Get`, { params: params });
  }

  addProduct(product: Product) : Observable<Object>  {
    const params = new HttpParams()
      .set('departmentId', product.departmentId)
      .set('supplierId', product.manufacturerId)
      .set('modelNumber', product.modelNumber)
      .set('description', product.description)
      .set('price', product.price);

    return this.http.post(DataService.urlRoot + '/Product/Create',  params);
  }

  updateProduct(product: Product) : Observable<Object>  {
    const params = new HttpParams()
      .set('id', product.id!)
      .set('departmentId', product.departmentId)
      .set('manufacturerId', product.manufacturerId)
      .set('modelNumber', product.modelNumber)
      .set('description', product.description)
      .set('price', product.price);

    return this.http.post(DataService.urlRoot + '/Product/Update',  params);
  }

  deleteProduct(id: number) : Observable<Object> {
    const params = new HttpParams()
      .set('id', id);

      return this.http.post(DataService.urlRoot + '/Product/Delete', params);
  }
}
