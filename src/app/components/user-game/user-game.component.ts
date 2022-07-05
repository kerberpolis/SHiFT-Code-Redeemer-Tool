import { Component, ViewChild, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { UserGameService } from 'src/app/services/user-game.service'
import { ApiResponse } from 'src/app/models/apiResponse'
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms'
import { UserGame } from 'src/app/models/userGame';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-game',
  templateUrl: './user-game.component.html',
  styleUrls: ['./user-game.component.scss']
})
export class UserGameComponent implements OnInit{
  @ViewChild(MatSort) sort!: MatSort;
  @Output() addUserGame = new EventEmitter<UserGame>();

  platforms: string[] = ['Epic', 'Steam', 'Xbox', 'Playstation']
  games: string[] = ['Tiny Tina\'s Wonderlands', 'Borderlands 3',
   'Borderlands: The Pre-Sequel', 'Borderlands 2',
    'Borderlands: Game of the Year Edition'
  ]

  public userGameForm: FormGroup 
  
  user: any;
  userGames: any = new MatTableDataSource();
  userGameColumns = ['game', 'platform', '_id'];

  constructor(private userGameService: UserGameService,
     private authService: AuthService,
     private location: Location,
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
      return data.sort((a: UserGame, b: UserGame) => {
        let aIdx = this.games.indexOf(a.game)
        let bIdx = this.games.indexOf(b.game)
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

  get f() {
    return this.userGameForm.controls;
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
    if (!this.userGameForm.get('game')!.value){
      this.userGameForm.get('game')!.markAsTouched()
      this.userGameForm.get('game')!.markAsDirty()
    }
    if (!this.userGameForm.get('platform')!.value){
      this.userGameForm.get('platform')!.markAsTouched()
      this.userGameForm.get('platform')!.markAsDirty()
    }

    if(this.userGameForm.valid){
      this.userGameService.addUserGame(this.userGameForm.value).subscribe(
        (response: UserGame) => {
            this.userGames.data = [...this.userGames.data, response]
            this.cdr.detectChanges()
        });
    }
  }

  back(): void {
    this.location.back()
  }
}
