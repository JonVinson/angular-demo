import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export class ScrollDs<T> implements DataSource<T> {
  private readonly pageSize: number = 500;
  private viewEndRow: number = 0;

  private http: HttpClient = inject(HttpClient);
  private viewData: T[] = [];
  private data: T[] = [];
  private subject = new BehaviorSubject<T[]>(this.viewData);
  private refreshMethod: (skip: number, take: number, count: boolean) => Observable<any>;

  ready: boolean = false;

  constructor (refreshMethod: (skip: number, take: number, count: boolean) => Observable<any>) {
    this.refreshMethod = refreshMethod;
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    collectionViewer.viewChange.subscribe(e => {
      if (e.end > this.viewEndRow) {
        let startRow = this.viewEndRow;
        this.viewEndRow += this.pageSize;
        this.refreshMethod(startRow, this.pageSize, false).subscribe(data => {
          for (var i = 0; i < data.length; ++i) {
            this.viewData[startRow + i] = data[i];
          }
          this.subject.next(this.viewData);
        });
      }
    });
    return this.subject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.subject.complete();
  }

  refresh() : void {
    this.refreshMethod(0, 0, true).subscribe(data => {
      console.log("Data length: ", data);
      this.viewData = Array.from<T>({length: data});
      this.subject.next(this.viewData);
      this.ready = true;
      console.log("Data ready");
    });
  }
}

