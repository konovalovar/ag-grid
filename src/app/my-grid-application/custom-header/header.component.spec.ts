import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomHeaderComponent } from './header.component';
import { FormsModule } from '@angular/forms';

describe('CustomHeaderComponent', () => {
  let component: CustomHeaderComponent;
  let fixture: ComponentFixture<CustomHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        FormsModule
      ],
      declarations: [ CustomHeaderComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(CustomHeaderComponent);
    component = fixture.componentInstance;
    component.params = {};
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
