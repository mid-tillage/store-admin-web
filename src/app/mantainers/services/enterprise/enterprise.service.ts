import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enterprise } from '../../models/enterprise';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  constructor(private readonly httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get('http://localhost:3000/enterprise');
  }

  getById(id: number) {
    return this.httpClient.get('http://localhost:3000/enterprise/' + id);
  }

  create(enterprise: Enterprise) {
    return this.httpClient.post<Enterprise>('http://localhost:3000/enterprise', enterprise);
  }

  update(enterprise: Enterprise) {
    return this.httpClient.patch('http://localhost:3000/enterprise', enterprise);
  }

  delete(id: number, enterprise: Enterprise) {
    return this.httpClient.delete('http://localhost:3000/enterprise/' + id, { ...enterprise });
  }
}
