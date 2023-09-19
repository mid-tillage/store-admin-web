import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseContainerComponent } from './enterprise-container.component';

describe('EnterpriseDashboardComponent', () => {
  let component: EnterpriseContainerComponent;
  let fixture: ComponentFixture<EnterpriseContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnterpriseContainerComponent]
    });
    fixture = TestBed.createComponent(EnterpriseContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
