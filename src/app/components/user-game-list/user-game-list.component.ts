import { Component, OnInit, ViewChild } from '@angular/core';
import { UserGameService } from '../../services/user-game.service'
import { ApiResponse } from '../../models/apiResponse'

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-user-game-list',
  templateUrl: './user-game-list.component.html',
  styleUrls: ['./user-game-list.component.scss']
})
export class UserGameListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  public userGames = new MatTableDataSource();
  public userGameColumns = ['game', 'platform'];

  constructor(private userGameService: UserGameService) {
    this.userGames.data = [];
    this.userGames.sort = this.sort;

   }

  ngOnInit(): void {
    this.getUserGames();
  }

 getUserGames(): void {
    this.userGameService.getUserGames()
      .subscribe((rsp: ApiResponse) => {
          this.userGames.data = rsp.data
        });
  }

}
