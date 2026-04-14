import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Spot } from '../models/spot';

interface TravelApiResponse {
  total?: number;
  data?: Spot[];
}

// note: 第三方 API 在 browser 可能遇到 CORS
// dev 時有試過 Allow CORS / cors-anywhere 不穩定很慢
// 正確做法應該由 backend proxy 處理

@Injectable({
  providedIn: 'root'
})

export class TravelApiService {
  private readonly baseUrl =
    'https://www.travel.taipei/open-api/zh-tw/Attractions/All';

  // local mock，避免 CORS 或 API 不穩影響開發
  private readonly mockUrl = 'assets/mock-data.json';

  constructor(private http: HttpClient) { }

  getSpots(
    page = 1,
    categoryId?: number
  ): Observable<{ total: number; data: Spot[] }> {
    const headers = new HttpHeaders({
      Accept: 'application/json'
    });

    let url = `${this.baseUrl}?page=${page}`;

    if (categoryId) {
      url += `&categoryIds=${categoryId}`;
    }

    return this.http.get<TravelApiResponse>(url, { headers }).pipe(
      map((res) => ({
        total: res?.total ?? 0,
        data: res?.data ?? []
      })),

      // API fail（常見：CORS / network）時 fallback 到 mock
      catchError((error) => {
        console.warn('API failed, fallback to mock data:', error);

        return this.http.get<TravelApiResponse>(this.mockUrl).pipe(
          map((res) => {
            console.warn('API failed, using mock data');
            let mockData = res?.data ?? [];

            // mock 這邊也補同樣的 filter，避免行為不一致
            if (categoryId) {
              mockData = mockData.filter(
                (item) =>
                  Array.isArray(item.category) &&
                  item.category.some(
                    (c) => Number(c.id) === Number(categoryId)
                  )
              );
            }

            const total = mockData.length;

            // 只有 mock fallback 這邊自己切頁
            const pageSize = 30;
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const pagedData = mockData.slice(startIndex, endIndex);

            return {
              total,
              data: pagedData
            };
          })
        );
      })
    );
  }
}
