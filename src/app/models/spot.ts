// API 回傳的分類資料，後面會拿來做 filter
export interface Category {
  id: number;
  name: string;
}

export interface Spot {
  id: number;
  name: string;
  introduction: string;
  address: string;
  tel: string;
  category: Category[]; // API 原始分類資料
  images: { src: string; subject?: string; ext?: string }[]; // API 原始圖片陣列
  isFavorite?: boolean; // 是否為收藏的景點
}
