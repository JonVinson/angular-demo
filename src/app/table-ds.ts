import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export class TableDs<T> implements DataSource<T> {
  private subject = new BehaviorSubject<T[]>([]);
  private http: HttpClient = inject(HttpClient);
  private refreshMethod: () => Observable<T[]>;

  ready: boolean = false;

  constructor (refreshMethod: () => Observable<T[]>) {
    this.refreshMethod = refreshMethod;
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.subject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.subject.complete();
  }

  refresh() : void {
    this.refreshMethod().subscribe(data => {
      this.ready = true;
      this.subject.next(data);
    });
  }
}

