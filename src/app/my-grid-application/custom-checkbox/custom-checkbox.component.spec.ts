import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCheckboxComponent } from './custom-checkbox.component';
import { FormsModule } from '@angular/forms';
import { ICellRendererParams } from 'ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer';

describe('CustomCheckboxComponent', () => {
  let component: CustomCheckboxComponent;
  let fixture: ComponentFixture<CustomCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    
      imports: [
        FormsModule
      ],
      declarations: [ CustomCheckboxComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(CustomCheckboxComponent);
    component = fixture.componentInstance;
    component.params = {node: {selected: false}};
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
