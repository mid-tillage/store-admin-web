import { Component } from '@angular/core';
import { Enterprise } from 'src/app/mantainers/models/enterprise';
import { EnterpriseService } from 'src/app/mantainers/services/enterprise/enterprise.service';

@Component({
  selector: 'app-enterprise-container',
  templateUrl: './enterprise-container.component.html',
  styleUrls: ['./enterprise-container.component.css']
})
export class EnterpriseContainerComponent {
  constructor(private readonly enterpriseService: EnterpriseService) { }
  public tabIndex: number = 0;

  focusTab(index: any) {
    this.tabIndex = index;
  }

  loadCreateForm() {
    this.enterpriseService.setSelectedEnterprise(new Enterprise({}));
    this.enterpriseService.setFormButtonGloss('Create');
    this.focusTab(1);
  }
}
