/// <reference types="jasmine" />

import { FormBuilder } from '@angular/forms';

import { Spot } from '../../models/spot';
import { FavoriteService } from '../../services/favorite.service';
import { FavoritesPageComponent } from './favorites-page.component';

describe('FavoritesPageComponent', () => {
  let component: FavoritesPageComponent;
  let favoriteServiceSpy: jasmine.SpyObj<FavoriteService>;

  const mockFavorites: Spot[] = [
    { id: 1, name: '台北101', tel: '02-11111111' } as Spot,
    { id: 2, name: '故宮博物院', tel: '02-22222222' } as Spot,
    { id: 3, name: '中正紀念堂', tel: '02-33333333' } as Spot,
    { id: 4, name: '士林夜市', tel: '02-44444444' } as Spot,
    { id: 5, name: '陽明山', tel: '02-55555555' } as Spot,
    { id: 6, name: '西門町', tel: '02-66666666' } as Spot,
    { id: 7, name: '象山', tel: '02-77777777' } as Spot
  ];

  beforeEach(() => {
    favoriteServiceSpy = jasmine.createSpyObj('FavoriteService', [
      'getFavorites',
      'removeFavorites',
      'updateFavorite'
    ]);

    favoriteServiceSpy.getFavorites.and.returnValue(mockFavorites);

    component = new FavoritesPageComponent(
      favoriteServiceSpy,
      new FormBuilder()
    );

    spyOn(window, 'scrollTo');
    spyOn(window, 'alert');

    component.ngOnInit();
  });

  it('應該建立 component', () => {
    expect(component).toBeTruthy();
  });

  it('應該初始化表單並載入收藏資料', () => {
    expect(component.editForm).toBeTruthy();
    expect(favoriteServiceSpy.getFavorites).toHaveBeenCalled();
    expect(component.favorites.length).toBe(7);
    expect(component.total).toBe(7);
    expect(component.totalPages).toBe(2);
    expect(component.pagedFavorites.length).toBe(6);
  });

  it('應該能新增與移除勾選項目', () => {
    component.onCheck(1, true);
    component.onCheck(2, true);
    expect(component.selectedIds).toEqual([1, 2]);

    component.onCheck(1, false);
    expect(component.selectedIds).toEqual([2]);
  });

  it('應該能刪除已選取的收藏', () => {
    component.selectedIds = [1, 2];
    favoriteServiceSpy.getFavorites.and.returnValue(mockFavorites.slice(2));

    component.removeSelected();

    expect(favoriteServiceSpy.removeFavorites).toHaveBeenCalledWith([1, 2]);
    expect(component.selectedIds).toEqual([]);
    expect(window.alert).toHaveBeenCalledWith('已成功移除我的最愛');
  });

  it('應該在編輯時帶入表單資料', () => {
    const item = mockFavorites[0];

    component.editItem(item);

    expect(component.editingId).toBe(1);
    expect(component.editForm.value).toEqual({
      name: '台北101',
      tel: '02-11111111'
    });
  });

  it('表單無效時不應儲存', () => {
    const item = mockFavorites[0];

    component.editForm.patchValue({
      name: '',
      tel: ''
    });

    component.saveEdit(item);

    expect(favoriteServiceSpy.updateFavorite).not.toHaveBeenCalled();
    expect(component.editForm.touched).toBeTrue();
  });

  it('表單有效時應成功儲存', () => {
    const item = mockFavorites[0];

    component.editForm.patchValue({
      name: '新名稱',
      tel: '02-99999999'
    });

    component.saveEdit(item);

    expect(favoriteServiceSpy.updateFavorite).toHaveBeenCalledWith({
      ...item,
      name: '新名稱',
      tel: '02-99999999'
    });
    expect(component.editingId).toBeNull();
  });

  it('應該能切換到上一頁', () => {
    component.currentPage = 2;

    component.prevPage();

    expect(component.currentPage).toBe(1);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('應該能切換到下一頁', () => {
    component.currentPage = 1;

    component.nextPage();

    expect(component.currentPage).toBe(2);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('應該能取消編輯狀態', () => {
    component.editingId = 1;

    component.cancelEdit();

    expect(component.editingId).toBeNull();
  });
});
