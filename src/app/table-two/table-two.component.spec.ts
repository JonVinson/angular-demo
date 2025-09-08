import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTwoComponent } from './table-two.component';

describe('TableTwoComponent', () => {
  let component: TableTwoComponent;
  let fixture: ComponentFixture<TableTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
