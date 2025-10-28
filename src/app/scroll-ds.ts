import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export class ScrollDs<T> implements DataSource<T> {
  private http: HttpClient = inject(HttpClient);
  private viewData: T[] = [];
  private data: T[] = [];
  private subject = new BehaviorSubject<T[]>(this.viewData);
  private refreshMethod: () => Observable<T[]>;

  ready: boolean = false;

  constructor (refreshMethod: () => Observable<T[]>) {
    this.refreshMethod = refreshMethod;
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    collectionViewer.viewChange.subscribe(e => {
      console.log('ViewChange:', e);
      for (var i = e.start; i < e.end && i < this.data.length; ++i) {
        this.viewData[i] = this.data[i];
      }
      //this.viewData.splice(e.start, e.end - e.start, ...this.data.slice(e.end, e.start));
      this.subject.next(this.viewData);
    });
    return this.subject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.subject.complete();
  }

  refresh() : void {
    this.refreshMethod().subscribe(data => {
      console.log("Data length: ", data.length);
      this.viewData = Array.from<T>({length: data.length});
      this.data = data;
      this.subject.next(this.viewData);
      this.ready = true;
      console.log("Data ready");
    });
  }
}

