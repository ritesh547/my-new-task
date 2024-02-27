import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subject } from 'rxjs';
// import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  apiUrl: string = "http://localhost:3000/locations"

  subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  getProductList() {
    return this.http.get(this.apiUrl)
  }

  removeProduct(id: number) {
    return this.http.delete(this.apiUrl + "/" + id)
  }

  editProduct(id: any, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }


  addProduct(data: number) {
    return this.http.post(this.apiUrl, data)
  }


}
