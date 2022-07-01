import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserCodeService } from '../../services/user-code.service'
import { ApiResponse } from '../../models/apiResponse'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-code-list',
  templateUrl: './user-code-list.component.html',
  styleUrls: ['./user-code-list.component.scss']
})
export class UserCodeListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  user: any;
  public userCodes = new MatTableDataSource();
  public userCodeColumns = ['game', 'platform', 'code', 'reward'];

  constructor(private userCodeService: UserCodeService, private authService: AuthService) {
    this.userCodes.data = [];
    this.userCodes.sort = this.sort;
   }

   ngOnInit(): void {
    this.authService.user.subscribe((data: any) => {
      this.user = data
    });
    this.getUserCodes();
  }

 getUserCodes(): void {
    this.userCodeService.getUserCodes(this.user._id)
      .subscribe((rsp: ApiResponse) => {
          this.userCodes.data = rsp.data
        });
  }

  ngAfterViewInit(): void {
    this.userCodes.paginator = this.paginator;
  }

}
