import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFragrancesComponent } from './list-fragrances.component';

describe('ListFragrancesComponent', () => {
  let component: ListFragrancesComponent;
  let fixture: ComponentFixture<ListFragrancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFragrancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFragrancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
