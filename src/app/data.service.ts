import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department, Manufacturer, Product } from './inventory-objects';

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

  getProducts(deptId: number, manuId: number, name: string): Observable<Product[]> {
    const params = new HttpParams()
      .set('name', name)
      .set('deptId', deptId)
      .set('manuId', manuId);

      return this.http.get<Product[]>(`${DataService.urlRoot}/Product/Get`, { params: params });
  }

  addProduct(deptId: number, manuId: number, description: number) : Observable<Object>  {
    const params = new HttpParams()
      .set('departmentId', deptId)
      .set('manufacturerId', manuId)
      .set('description', description);

    return this.http.post(DataService.urlRoot + '/Product/Create',  params);
  }

  updateProduct(id: number, name: string, code: string) : Observable<Object>  {
    const params = new HttpParams()
      .set('id', id)
      .set('name', name)
      .set('code', code);

    return this.http.post(DataService.urlRoot + '/Product/Update',  params);
  }

  deleteProduct(id: number) : Observable<Object> {
    const params = new HttpParams()
      .set('id', id);

      return this.http.post(DataService.urlRoot + '/Product/Delete', params);
  }

  getManufacturers(): Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>(`${DataService.urlRoot}/Manufacturer/Get`);
  }

}
