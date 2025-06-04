import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraganceDetailComponent } from './fragance-detail.component';

describe('FraganceDetailComponent', () => {
  let component: FraganceDetailComponent;
  let fixture: ComponentFixture<FraganceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FraganceDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FraganceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
