import { Component, ViewChild, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { UserGameService } from 'src/app/services/user-game.service'
import { ApiResponse } from 'src/app/models/apiResponse'
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms'
import { UserGame } from 'src/app/models/userGame';


@Component({
  selector: 'app-user-game',
  templateUrl: './user-game.component.html',
  styleUrls: ['./user-game.component.scss']
})
export class UserGameComponent implements OnInit{
  @ViewChild(MatSort) sort!: MatSort;
  @Output() addUserGame = new EventEmitter<UserGame>();

  platform = ''
  platforms: string[] = ['Epic', 'Steam', 'Xbox', 'Playstation']

  game = ''
  games: string[] = ['Borderlands: Game of the Year Edition', 'Borderlands 2',
    'Borderlands: The Pre-Sequel', 'Borderlands 3',
    'Tiny Tina\'s Wonderlands'
  ]

  public userGameForm: FormGroup 
  
  user: any;
  userGames: any = new MatTableDataSource();
  userGameColumns = ['game', 'platform', '_id'];

  constructor(private userGameService: UserGameService,
     private authService: AuthService,
     private cdr: ChangeDetectorRef) {
    this.userGames.data = new Array<UserGame>(); 
    this.userGameForm = new FormGroup({
      game: new FormControl(null, [Validators.required]),
      platform: new FormControl(null, [Validators.required]),
      user_id: new FormControl(null, [Validators.required]),
    });
   }

   ngOnInit(): void {
    this.authService.user.subscribe((data: any) => {
      this.user = data
    });
    this.getUserGames();
  }

  ngAfterViewInit(): void {
    this.userGames.sort = this.sort;
    this.userGames.sortData = (data: Array<UserGame>, sort: MatSort) => {
      const direction = sort.direction;
      var games = ['Tiny Tina\'s Wonderlands', 'Borderlands 3', 'Borderlands: The Pre-Sequel', 'Borderlands 2', 'Borderlands: Game of the Year Edition']
      return data.sort((a: UserGame, b: UserGame) => {
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

  getUserGames(): void {
    this.userGameService.getUserGames(this.user._id)
      .subscribe((rsp: ApiResponse) => {
          this.userGames.data = <Array<UserGame>>rsp.data
        });
  }

  deleteUserGame(userGameId: number): void {
    this.userGameService.deleteUserGame(userGameId)
      .subscribe((response: unknown) => {
          let userGames = this.userGames.data.filter((userGame: UserGame) => userGame._id != userGameId)
          this.userGames.data = userGames
      });
  }

  onSubmit() {
    this.userGameService.addUserGame(this.userGameForm.value).subscribe((userGame: UserGame) => {
      if (userGame) {
        this.userGames.data = [...this.userGames.data, userGame]
        this.cdr.detectChanges()
      }
    });
  }
}
