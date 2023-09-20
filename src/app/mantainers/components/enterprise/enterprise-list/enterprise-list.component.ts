import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmActionComponent } from '../../shared/confirm-action/confirm-action.component';
import { Enterprise } from 'src/app/mantainers/models/enterprise';
import { EnterpriseService } from 'src/app/mantainers/services/enterprise/enterprise.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-enterprise-list',
  templateUrl: './enterprise-list.component.html',
  styleUrls: ['./enterprise-list.component.css']
})
export class EnterpriseListComponent implements OnInit, OnDestroy {
  @Output() focusTabEvent = new EventEmitter<any>();

  message: string = '';
  private buttonGlossSubscription!: Subscription;
  private enterpriseSubscription!: Subscription;

  public enterprises = new MatTableDataSource<Enterprise>([]);
  public displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(
    private readonly enterpriseService: EnterpriseService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.buttonGlossSubscription = this.enterpriseService.currentFormButtonGloss.subscribe(message => this.message = message);
    this.enterpriseSubscription = this.enterpriseService.enterprises.subscribe(enterprises => this.enterprises = new MatTableDataSource(enterprises));
    // An example to retrieve all the enterprises of the table.
    this.enterpriseService.getAll().subscribe((data) => {
      console.log({ enterpriseServiceGetAll: data });
      this.enterprises = new MatTableDataSource(data);
    });
  }

  ngOnDestroy(): void {
    this.buttonGlossSubscription.unsubscribe();
    this.enterpriseSubscription.unsubscribe();
  }

  loadEnterprises(enterprises: Enterprise[]) {
    this.enterprises = new MatTableDataSource(enterprises);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.enterprises.filter = filterValue.trim().toLowerCase();
  }

  updateEnterprise(enteprises: Enterprise) {
    this.enterpriseService.setSelectedEnterprise(enteprises);
    this.enterpriseService.setFormButtonGloss('Update');
    this.focusTabEvent.emit(1);
  }

  deleteEnterprise(enterprise: Enterprise) {
    const dialogRef = this.dialog.open(ConfirmActionComponent, { data: { name: enterprise.name } });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.enterpriseService.delete(enterprise.idEnterprise).subscribe({
          next: () => {
            this.enterpriseService.refreshEnterprises();
            this._snackBar.open(`Enterprise ${enterprise.name} deleted`, 'Ok', {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              duration: 5000
            });
          },
          error: console.error,
          complete: () => console.debug('enterpriseService.delete finished')
        });
      }
    });
  }
}
