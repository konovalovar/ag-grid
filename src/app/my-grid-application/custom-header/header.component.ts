import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class CustomHeaderComponent {
  static nextID = 1;
  public params: any;
  id: number = CustomHeaderComponent.nextID++;
  selected = false;
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.updateSelectStatus(params.api);
    params.api.addEventListener('rowSelected', (event: any) => {
      this.updateSelectStatus(event.api);
    });
  }

  private updateSelectStatus(api: any){
    let totalRows = 0;
    api.forEachNode(() => totalRows++);
    this.selected = api.getSelectedRows().length === totalRows && totalRows > 0;
  }

  menuSelectClick($event) {
    this.selected = $event;
    if (this.selected === true) {
      this.params.api.selectAll();
    } else {
      this.params.api.deselectAll();
    }
  }

}
