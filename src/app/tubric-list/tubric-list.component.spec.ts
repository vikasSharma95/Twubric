import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TubricListComponent } from './tubric-list.component';

describe('TubricListComponent', () => {
  let component: TubricListComponent;
  let fixture: ComponentFixture<TubricListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TubricListComponent]
    });
    fixture = TestBed.createComponent(TubricListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
