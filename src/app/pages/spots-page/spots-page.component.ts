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
  currentPage = 1;

  constructor(private api: TravelApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.api.getSpots(this.currentPage).subscribe(res => {
      this.spots = res.data || [];
    });
  }
}
