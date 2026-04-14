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
  total = 0;
  pageSize = 30;
  loading = false;

  constructor(private api: TravelApiService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    this.api.getSpots(this.currentPage).subscribe({
      next: (res) => {
        this.spots = res.data;
        this.total = res.total;
        this.loading = false;
      },
      error: (err) => {
        console.error('load spots failed:', err);
        this.spots = [];
        this.total = 0;
        this.loading = false;
      }
    });
  }

  get totalPages(): number {
    return Math.ceil(this.total / 30);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadData();
      window.scrollTo(0, 0); // 換頁後捲回頂部
    }
  }

  nextPage(): void {
    // 簡單判斷，如果有資料才讓使用者按下一頁
    if (this.spots.length > 0) {
      this.currentPage++;
      this.loadData();
      window.scrollTo(0, 0);
    }
  }

}
