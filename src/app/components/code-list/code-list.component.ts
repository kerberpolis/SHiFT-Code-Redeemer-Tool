import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CodeService } from '../../services/code.service'
import { ApiResponse } from '../../models/apiResponse'

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Code } from 'src/app/models/code';

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
          // filter only valid codes
          this.codes.data = [...rsp.data.filter((item: unknown) => {
            let code = item as Code
            return code['is_valid'] == 1
          })];
        });
  }


  ngAfterViewInit(): void {
    this.codes.paginator = this.paginator;
  }

}
