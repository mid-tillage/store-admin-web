import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Enterprise } from 'src/app/mantainers/models/enterprise';
import { EnterpriseService } from 'src/app/mantainers/services/enterprise/enterprise.service';

@Component({
  selector: 'app-enterprise-form',
  templateUrl: './enterprise-form.component.html',
  styleUrls: ['./enterprise-form.component.css']
})
export class EnterpriseFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  @Output() focusTabEvent = new EventEmitter<any>();
  public enterprise: Enterprise = new Enterprise({});
  public buttonGloss: string = '';
  public enterpriseForm = this.formBuilder.group({
    idEnterprise: new FormControl(this.enterprise.idEnterprise),
    name: new FormControl(this.enterprise.name, [Validators.required]),
  });

  constructor(
    private enterpriseService: EnterpriseService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.enterpriseService.currentFormButtonGloss.subscribe(gloss => this.buttonGloss = gloss);
    this.enterpriseService.selectedEnterprise.subscribe((enterprise: Enterprise) => {
      this.enterprise = enterprise;
      this.enterpriseForm = this.formBuilder.group({
        idEnterprise: new FormControl(this.enterprise.idEnterprise),
        name: new FormControl(this.enterprise.name, [Validators.required]),
      });
      console.log('selectedEnterprise', this.enterprise);
    });
  }

  onBack() {
    this.focusTabEvent.emit({ index: 0, gloss: 'Create' });
  }

  onSubmit(): void {
    console.log('this.enterpriseService.valid', this.enterpriseForm.valid);
    if (!this.enterpriseForm.valid) return;
    const enterprise: Enterprise = new Enterprise(this.enterpriseForm.value);
    if (this.buttonGloss === 'Create') {
      console.log('=============================================');
      this.enterpriseService.create(enterprise).subscribe({
        next: (data) => {
          console.log('enterpriseService.create response', data);
          this._snackBar.open('Enterprise created', 'Ok', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000
          });
        },
        error: (error) => {
          console.error('enterpriseService.create response', error);
          this._snackBar.open('Error on enterprise creation', 'Ok', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000
          });
        },
        complete: () => console.log('enterpriseService.create finished')
      });
    } else if (this.buttonGloss === 'Update') {
      console.log({ toUpdate: enterprise });
      this.enterpriseService.update(enterprise.idEnterprise, enterprise).subscribe({
        next: (data) => {
          console.log('enterpriseService.update response', data);
          this._snackBar.open('Enterprise updated', 'Ok', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000
          });
        },
        error: (error) => {
          console.error('enterpriseService.update response', error);
          this._snackBar.open('Error on enterprise update', 'Ok', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000
          });
        },
        complete: () => console.log('enterpriseService.updated finished')
      });
    }
    this.enterpriseForm.reset();
    this.enterpriseService.refreshEnterprises();
    this.focusTabEvent.emit({ index: 0, gloss: 'Create' });
  }
}