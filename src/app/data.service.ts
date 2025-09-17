import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from './table-two/Department';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private static urlRoot: string = 'https://inventory-api-fchmfhembrd0d4aw.centralus-01.azurewebsites.net';

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
}
