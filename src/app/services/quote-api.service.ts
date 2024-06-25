import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuoteApiService {
  private readonly apiUrl = '/api/quotes';
  constructor(private readonly http: HttpClient) {}

  public fetchRandomQuote() {
    return this.http.get<any>(this.apiUrl);
  }
}
