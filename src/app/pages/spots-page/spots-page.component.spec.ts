import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotsPageComponent } from './spots-page.component';

describe('SpotsPageComponent', () => {
  let component: SpotsPageComponent;
  let fixture: ComponentFixture<SpotsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
