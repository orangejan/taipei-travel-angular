import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TravelApiService } from '../../services/travel-api.service';
import { FavoriteService } from '../../services/favorite.service';
import { Spot, Category } from '../../models/spot';
import { SPOT_CATEGORIES } from '../../constants/categories';

@Component({
  selector: 'app-spots-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './spots-page.component.html',
  styleUrl: './spots-page.component.scss'
})
export class SpotsPageComponent implements OnInit {
  spots: Spot[] = [];
  // 使用前端設定檔管理分類
  // 避免第三方 API 分頁資料導致分類浮動
  // 若有完整分類 API，可再改為動態取得
  categories: Category[] = SPOT_CATEGORIES;

  currentPage = 1;
  total = 0;
  pageSize = 30;
  totalPages = 0;

  selectedCategoryId?: number;
  loading = false;

  // 記錄目前勾選的景點 id
  selectedIds: number[] = [];

  constructor(private api: TravelApiService, private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    this.api.getSpots(this.currentPage, this.selectedCategoryId).subscribe({
      next: (res) => {
        this.spots = res.data.map((spot) => ({
          ...spot,
          isFavorite: this.favoriteService.isFavorite(spot.id)
        }));
        this.total = res.total;
        this.totalPages = Math.ceil(this.total / this.pageSize);
        this.loading = false;
      },
      error: (err) => {
        console.error('load spots failed:', err);
        this.spots = [];
        this.total = 0;
        this.totalPages = 0;
        this.loading = false;
      }
    });
  }

  onCategoryChange(): void {
    this.currentPage = 1;
    this.loadData();
  }

  prevPage(): void {
    if (this.currentPage <= 1) return;

    this.currentPage--;
    this.loadData();
    window.scrollTo(0, 0);
  }

  nextPage(): void {
    if (this.currentPage >= this.totalPages) return;

    this.currentPage++;
    this.loadData();
    window.scrollTo(0, 0);
  }

  onCheck(id: number, checked: boolean): void {
    if (checked) {
      if (!this.selectedIds.includes(id)) {
        this.selectedIds.push(id);
      }
      return;
    }

    this.selectedIds = this.selectedIds.filter((item) => item !== id);
  }

  addToFavorites(): void {
    if (this.selectedIds.length === 0) {
      return;
    }

    const selectedSpots = this.spots.filter((spot) =>
      this.selectedIds.includes(spot.id)
    );

    this.favoriteService.addFavorites(selectedSpots);

    // 同步畫面狀態
    this.spots = this.spots.map((spot) => ({
      ...spot,
      isFavorite: this.favoriteService.isFavorite(spot.id)
    }));

    this.selectedIds = [];
    alert('已成功加入我的最愛');
  }

  isFavorite(id: number): boolean {
    return this.favoriteService.isFavorite(id);
  }
}
