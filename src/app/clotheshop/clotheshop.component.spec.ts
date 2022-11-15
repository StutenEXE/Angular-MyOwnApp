import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClotheshopComponent } from './clotheshop.component';

describe('ClotheshopComponent', () => {
  let component: ClotheshopComponent;
  let fixture: ComponentFixture<ClotheshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClotheshopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClotheshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
