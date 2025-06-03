import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFragrancesComponent } from './home-fragrances.component';

describe('HomeFragrancesComponent', () => {
  let component: HomeFragrancesComponent;
  let fixture: ComponentFixture<HomeFragrancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFragrancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFragrancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
