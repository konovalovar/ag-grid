import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGridApplicationComponent } from './my-grid-application.component';
import { CustomHeaderComponent } from './custom-header/header.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataService } from '../@services/get-data.service';
import { CustomCheckboxComponent } from './custom-checkbox/custom-checkbox.component';
describe('MyGridApplicationComponent', () => {
  let component: MyGridApplicationComponent;
  let fixture: ComponentFixture<MyGridApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        AgGridModule.withComponents([CustomHeaderComponent,CustomCheckboxComponent ])
      ],
      declarations: [ MyGridApplicationComponent, CustomHeaderComponent, CustomCheckboxComponent ],
      providers: [DataService]
    })
    .compileComponents();
    fixture = TestBed.createComponent(MyGridApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

   it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('grid API is available after `detectChanges`', () => {
      expect(component.gridApi).toBeTruthy();
  });

  it('selected rows will change after select or deselect row', () => {
    const node = component.gridApi.getRowNode('0');
    component.gridApi.selectNode(node);
    const appElement = fixture.nativeElement;
    const selectedRowsElement = appElement.querySelector('.select-row-count .total-count');
    expect(selectedRowsElement.textContent).toEqual('0');
  });

  it('should select all rows', async () => {
    const appElement = fixture.nativeElement;
    const checkbox = appElement.querySelector('.ag-custom-checkbox-header .custom-control-input');
    checkbox.click();
    await fixture.whenStable();
    fixture.detectChanges();
    const selectedRows = component.gridApi.getSelectedRows();
    expect(selectedRows.length).toEqual(50);
  });

  it('should deselect all rows', async () => {
    const appElement = fixture.nativeElement;
    const checkbox = appElement.querySelector('.ag-custom-checkbox-header .custom-control-input');
    checkbox.click();
    await fixture.whenStable();
    fixture.detectChanges();
    const selectedRows = component.gridApi.getSelectedRows();
    expect(selectedRows.length).toEqual(50);
    checkbox.click();
    await fixture.whenStable();
    fixture.detectChanges();
    const selectedRows2 = component.gridApi.getSelectedRows();
    expect(selectedRows2.length).toEqual(0);
  });
});
