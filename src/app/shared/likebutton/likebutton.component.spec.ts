import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikebuttonComponent } from './likebutton.component';

describe('LikebuttonComponent', () => {
  let component: LikebuttonComponent;
  let fixture: ComponentFixture<LikebuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikebuttonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
