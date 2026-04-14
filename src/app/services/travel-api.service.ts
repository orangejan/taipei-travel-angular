import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Spot } from '../models/spot';

interface TravelApiResponse {
  total?: number;
  data?: Spot[];
}

@Injectable({
  providedIn: 'root'
})

export class TravelApiService {
  private readonly baseUrl =
    'https://www.travel.taipei/open-api/zh-tw/Attractions/All';

  constructor(private http: HttpClient) { }

  getSpots(page = 1): Observable<TravelApiResponse> {
    return this.http.get<TravelApiResponse>(`${this.baseUrl}?page=${page}`);
  }
}
