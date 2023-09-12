import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-catalog-container',
  templateUrl: './catalog-container.component.html',
  styleUrls: ['./catalog-container.component.css']
})
export class CatalogContainerComponent {
  public tabIndex: number = 0;

  constructor() { }

  focusTab(index: any) {
    this.tabIndex = index;
  }
}
