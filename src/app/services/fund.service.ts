import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Fund } from '../models/fund';

@Injectable({
  providedIn: 'root'
})
export class FundService {

  private baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/users`)
  }

  getFunds(): Observable<Fund[]> {
    return this.http.get<Fund[]>(`${this.baseUrl}/funds/get`);
  }

  getFundById(fundId: string) {
    return this.http.get(`${this.baseUrl}/funds/${fundId}`);
  }

  createSubscription(userId:string, fundId: string):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/funds/subscribe/${userId}/${fundId}`, {});
  }

  cancelSubcription(userId:string, fundId: string):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/funds/cancel/${userId}/${fundId}`, {});
  }

  getTransactionsByUser(userId:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/users/transactions/${userId}`);
  }

  getFundsByUser(userId:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/funds/user/${userId}/subscribe-funds`);
  }
}
