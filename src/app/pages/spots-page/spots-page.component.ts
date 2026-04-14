import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelApiService } from '../../services/travel-api.service';
import { Spot } from '../../models/spot';

@Component({
  selector: 'app-spots-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spots-page.component.html',
  styleUrl: './spots-page.component.scss'
})
export class SpotsPageComponent implements OnInit {
  spots: Spot[] = [];
  total = 0;
  currentPage = 1;

  constructor(private api: TravelApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.api.getSpots(this.currentPage).subscribe((res) => {
      console.log('res:', res);
      console.log('res.data:', res.data);

      this.spots = res.data;
      this.total = res.total;
    });
  }
}
