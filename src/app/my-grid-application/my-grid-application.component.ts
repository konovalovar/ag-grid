import { Component, OnInit } from '@angular/core';
import 'ag-grid-enterprise';
import { GridOptions } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../@services/get-data.service';
import * as $ from 'jquery';
import { CustomHeaderComponent } from './custom-header/header.component';
import { CustomCheckboxComponent } from './custom-checkbox/custom-checkbox.component';

@Component({
  selector: 'app-my-grid-application',
  templateUrl: './my-grid-application.component.html',
  styleUrls: ['./my-grid-application.component.scss']
})
export class MyGridApplicationComponent implements OnInit {

  public gridOptions: GridOptions;
  public gridApi;
  public gridColumnApi;
  private overlayLoadingTemplate;
  private columnDefs;
  private defaultColDef;
  private frameworkComponents;
  private getRowHeight;
  private rowData = [];

  private recordCount = 0;
  private selectedCount = 0;
  private selectionHidden: boolean = true;
  title = 'grid app';

  constructor(
    private http: HttpClient,
    private dataService: DataService,
  ) {
    this.columnDefs = [
      {
        headerName: '',
        field: 'id',
        width: 50,
        cellRenderer: 'customCheckboxRenderer',
        headerComponentParams: { checkbox: true },
        autoHeight: true
      },
      {
        headerName: '',
        field: 'thumbnails',
        cellRenderer: this.tuhmbnails,
        autoHeight: true
      },
      {
        headerName: 'Published on',
        field: 'publishedAt',
        autoHeight: true
      },
      {
        headerName: 'Video Title',
        field: 'title',
        cellRenderer: this.customCellRendererFunc,
        autoHeight: true
      },
      {
        headerName: 'Description',
        field: 'description',
        autoHeight: true
      }
    ];

    this.defaultColDef = {
      resizable: true,
      checkbox: false
    };
    this.frameworkComponents = { agColumnHeader: CustomHeaderComponent, customCheckboxRenderer: CustomCheckboxComponent };

    this.getRowHeight = (params) => {
      if (params.node.level === 0) {
        return 98;
      } else {
        return 25;
      }
    };

    this.overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
  }

  onGridReady(params) {
    this.gridApi = params.api; // To access the grids API
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    this.loadData();
  }

  onRowSelected(params) {
    const selectedCount = params.api.getSelectedRows().length;
    $('.select-row-count .total-count').text(selectedCount);
  }

  ngOnInit() {
    const self = this;
    // toogle row checkbox
  }

  // load data from json link
  public loadData() {
    this.dataService.getData().subscribe(data => {
      const jsonDatas = data.items;
      this.recordCount = jsonDatas.length;
      for (let index = 0; index < jsonDatas.length; index ++) {
        const row = {
          id : {
            value: index,
            checkbox: false
          },
          thumbnails: jsonDatas[index].snippet.thumbnails.default.url,
          publishedAt: jsonDatas[index].snippet.publishedAt,
          title: {
            value: jsonDatas[index].snippet.title,
            id: jsonDatas[index].id.videoId
          },
          description: jsonDatas[index].snippet.description
        };
        this.rowData.push(row);
      }
      setTimeout(() => {
        this.gridApi.setRowData(this.rowData);
      }, 100);

      setTimeout(() => {
        this.autoSizeAll();
      }, 700);

    });
  }

  // video title with link
  public customCellRendererFunc(params) {
    const videoTitle = params.value.value;
    const videoId = params.value.id;
    return '<a href=\'https://www.youtube.com/watch?v=' + videoId + '\'>' + videoTitle + '</a>';
  }

  // custom context to add open in new tab
  public getContextMenuItems(params) {
    let result: any = [
      'copy',
      'copyWithHeaders',
      'paste'
    ];
    if (params.column.colId === 'title') {
      result = [
        {
          name: 'Open in new tab',
          action() {
            window.open('https://www.youtube.com/watch?v=' + params.value.id);
          },
        },
        'copy',
        'copyWithHeaders',
        'paste'
      ];
    }
    return result;
  }

  // thumbnail image
  public tuhmbnails(params) {
    return `<img src="${params.value}" alt="thumbnail">`;
  }

  // column resize
  public autoSizeAll() {
    const allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach((column) => {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }

  // toggle checkbox
  public toggleCheckbox() {
    this.selectionHidden = !this.selectionHidden;
    this.gridColumnApi.setColumnVisible('id', this.selectionHidden);
  }
}
