import { Component, ViewChild, AfterViewInit } from '@angular/core';
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
export class CodeListComponent implements AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('gameSort') sort!: MatSort;

  public codes = new MatTableDataSource(Array<Code>());
  public codeColumns = ['game', 'platform', 'code', 'reward'];

  constructor(private codeService: CodeService) {
    this.getCodes();
  }

  getCodes(): void {
    this.codeService.getCodes()
      .subscribe((rsp: ApiResponse) => {
        // filter only valid codes
        this.codes.data = <Array<Code>>rsp.data.filter((item: unknown) => {
          let code = item as Code
          return code['is_valid'] == 1
        });
      });
  }

  ngAfterViewInit(): void {
    this.codes.paginator = this.paginator;
    this.codes.sort = this.sort;
    this.codes.sortData = (data: Array<Code>, sort: MatSort) => {
      const direction = sort.direction;
      var games = ['Wonderlands', 'Borderlands 3', 'Borderlands 2 and 3', 'Borderlands The Pre-Sequel', 'Borderlands 2', 'Borderlands 1', 'Godfall']
      return data.sort((a: Code, b: Code) => {
        let aIdx = games.indexOf(a.game)
        let bIdx = games.indexOf(b.game)
        if (aIdx < bIdx) {
          return (direction == 'asc' ? 1: -1);
        } else if (aIdx > bIdx) {
            return (direction == 'asc' ? -1 : 1);
        } else {
            return 0;
        }
      });
    }
  }
}
