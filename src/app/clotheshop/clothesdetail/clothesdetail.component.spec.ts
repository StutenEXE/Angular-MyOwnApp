import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothesdetailComponent } from './clothesdetail.component';

describe('ClothesdetailComponent', () => {
  let component: ClothesdetailComponent;
  let fixture: ComponentFixture<ClothesdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClothesdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClothesdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
