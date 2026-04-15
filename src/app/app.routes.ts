import { Routes } from '@angular/router';
import { SpotsPageComponent } from './pages/spots-page/spots-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'spots', pathMatch: 'full' },
  { path: 'spots', component: SpotsPageComponent },
  { path: 'favorites', component: FavoritesPageComponent }
];
