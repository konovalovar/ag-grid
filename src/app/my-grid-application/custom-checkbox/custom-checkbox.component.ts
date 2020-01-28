import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer';

@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss']
})
export class CustomCheckboxComponent implements OnInit, ICellRendererAngularComp {
  params: any;
  refresh: any;
  constructor() { }

  ngOnInit() {
  }

  agInit(params: ICellRendererParams){
    this.params = params;
  }

}
