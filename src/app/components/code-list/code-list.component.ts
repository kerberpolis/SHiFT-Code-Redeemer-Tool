import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CodeService } from '../../services/code.service'
import { ApiResponse } from '../../models/apiResponse'

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-code-list',
  templateUrl: './code-list.component.html',
  styleUrls: ['./code-list.component.scss']
})
export class CodeListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public codes = new MatTableDataSource();
  public codeColumns = ['game', 'platform', 'code', 'reward'];

  constructor(private codeService: CodeService) {
    this.codes.data = [];
    this.codes.sort = this.sort;

   }

  ngOnInit(): void {
    this.getCodes();
  }

 getCodes(): void {
    this.codeService.getCodes()
      .subscribe((rsp: ApiResponse) => {
          this.codes.data = rsp.data
        });
  }


  ngAfterViewInit(): void {
    this.codes.paginator = this.paginator;
  }

}
