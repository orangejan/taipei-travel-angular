import { Injectable } from '@angular/core';
import { Spot } from '../models/spot';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  // 使用 localStorage 保存我的最愛，讓重整後資料仍保留
  private readonly storageKey = 'favoriteSpots';

  getFavorites(): Spot[] {
    const raw = localStorage.getItem(this.storageKey);

    if (!raw) {
      return [];
    }

    try {
      return JSON.parse(raw) as Spot[];
    } catch (error) {
      // 避免資料異常導致失敗
      console.error('parse favorites failed:', error);
      return [];
    }
  }

  saveFavorites(spots: Spot[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(spots));
  }

  addFavorites(spots: Spot[]): void {
    const current = this.getFavorites();
    // 避免重複加入收藏
    const map = new Map<number, Spot>();

    [...current, ...spots].forEach((spot) => {
      map.set(spot.id, spot);
    });

    this.saveFavorites([...map.values()]);
  }

  removeFavorites(ids: number[]): void {
    const current = this.getFavorites();
    const updated = current.filter((item) => !ids.includes(item.id));
    this.saveFavorites(updated);
  }

  updateFavorite(updatedSpot: Spot): void {
    const current = this.getFavorites();
    const updated = current.map((item) =>
      item.id === updatedSpot.id
        ? {
          ...updatedSpot,
          isFavorite: true
        }
        : item
    );
    this.saveFavorites(updated);
  }

  isFavorite(id: number): boolean {
    return this.getFavorites().some((item) => item.id === id);
  }
}
