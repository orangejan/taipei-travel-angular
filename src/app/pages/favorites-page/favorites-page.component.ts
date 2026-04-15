import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FavoriteService } from '../../services/favorite.service';
import { Spot } from '../../models/spot';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.scss'
})

export class FavoritesPageComponent implements OnInit {
  favorites: Spot[] = [];
  pagedFavorites: Spot[] = [];
  selectedIds: number[] = [];

  currentPage = 1;
  pageSize = 10;
  total = 0;
  totalPages = 0;

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favorites = this.favoriteService.getFavorites();
    this.total = this.favorites.length;
    this.totalPages = Math.ceil(this.total / this.pageSize) || 1;

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    this.updatePagedFavorites();
  }

  // 根據目前頁數切出顯示資料
  updatePagedFavorites(): void {
    // 換頁或資料更新時都清空勾選
    this.selectedIds = [];
    if (!this.favorites.length) {
      this.pagedFavorites = [];
      return;
    }

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedFavorites = this.favorites.slice(startIndex, endIndex);
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

  removeSelected(): void {
    if (!this.selectedIds.length) {
      return;
    }

    this.favoriteService.removeFavorites(this.selectedIds);
    this.loadFavorites();
    this.selectedIds = [];
    alert('已成功移除我的最愛');
  }

  prevPage(): void {
    if (this.currentPage <= 1) {
      return;
    }

    this.currentPage--;
    this.updatePagedFavorites();
    window.scrollTo(0, 0);
  }

  nextPage(): void {
    if (this.currentPage >= this.totalPages) {
      return;
    }

    this.currentPage++;
    this.updatePagedFavorites();
    window.scrollTo(0, 0);
  }
}
