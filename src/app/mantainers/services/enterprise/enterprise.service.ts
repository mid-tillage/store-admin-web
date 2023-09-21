import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enterprise } from '../../models/enterprise';
import { BehaviorSubject } from 'rxjs';
import { MatTabGroup } from '@angular/material/tabs';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {
  private formButtonGlossSource = new BehaviorSubject('Create');
  public currentFormButtonGloss = this.formButtonGlossSource.asObservable();

  private enterpriseSource = new BehaviorSubject(new Enterprise({}));
  public selectedEnterprise = this.enterpriseSource.asObservable();

  private enterprisesSource = new BehaviorSubject<Enterprise[]>([]);
  public enterprises = this.enterprisesSource.asObservable();


  constructor(private readonly httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<Enterprise[]>('http://localhost:3040/enterprise');
  }

  getById(id: number) {
    return this.httpClient.get('http://localhost:3040/enterprise/' + id);
  }

  create(enterprise: Enterprise) {
    console.log({enterprise})
    return this.httpClient.post<Enterprise>('http://localhost:3040/enterprise', enterprise);
  }

  update(id: number, enterprise: Enterprise) {
    return this.httpClient.patch('http://localhost:3040/enterprise/' + id, enterprise);
  }

  delete(id: number) {
    return this.httpClient.delete('http://localhost:3040/enterprise/' + id);
  }

  setTabIndex(event: MatTabGroup) {
    event.selectedIndex = 1;
  }

  setSelectedEnterprise(enterprise: Enterprise) {
    this.enterpriseSource.next(enterprise);
  }

  setFormButtonGloss(gloss: 'Create' | 'Update') {
    this.formButtonGlossSource.next(gloss);
  }

  setEnterprises(enterprises: Enterprise[]) {
    this.enterprisesSource.next(enterprises);
  }

  refreshEnterprises(): void {
    this.httpClient.get<Enterprise[]>('http://localhost:3040/enterprise').subscribe({
      next: (enterprises) => this.enterprisesSource.next(enterprises),
      error: console.error,
      complete: () => console.debug('enterpriseService.refreshEnteprises finished')
    });
  }
}
