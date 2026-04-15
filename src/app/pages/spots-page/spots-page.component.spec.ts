import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { FavoriteService } from '../../services/favorite.service';
import { TravelApiService } from '../../services/travel-api.service';
import { SpotsPageComponent } from './spots-page.component';

describe('SpotsPageComponent', () => {
  let component: SpotsPageComponent;
  let fixture: ComponentFixture<SpotsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotsPageComponent],
      providers: [
        {
          provide: TravelApiService,
          useValue: {
            getSpots: () => of({ total: 0, data: [] })
          }
        },
        {
          provide: FavoriteService,
          useValue: {
            getFavorites: () => []
          }
        },
        provideRouter([])
      ]
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
