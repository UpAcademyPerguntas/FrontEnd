import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {   }
  getAllManagers() {
    return this.http.get(`${environment.apiUrl}/admin/getAllManagers`);
}

}

