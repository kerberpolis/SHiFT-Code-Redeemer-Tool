import { Component, ViewChild, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { UserGameService } from 'src/app/services/user-game.service'
import { ApiResponse } from 'src/app/models/apiResponse'
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms'
import { UserGame } from 'src/app/models/userGame';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';


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

  userGameForm: FormGroup 
  user: User | null = null
  userGames = new MatTableDataSource(Array<UserGame>());
  userGameColumns = ['game', 'platform', '_id'];

  constructor(private userGameService: UserGameService,
     private authService: AuthService,
     private location: Location,
     private cdr: ChangeDetectorRef,
     private fb: FormBuilder) {
    this.userGames.data = new Array<UserGame>(); 
    this.userGameForm = fb.group({
      game: new FormControl(null, [Validators.required]),
      platform: new FormControl(null, [Validators.required]),
      user_id: new FormControl(null, [Validators.required]),
    });
   }

   ngOnInit(): void {
    this.authService.user.subscribe((data: unknown) => {
      this.user = data as User
    });
    this.getUserGames();
  }

  ngAfterViewInit(): void {
    this.userGames.sort = this.sort;
    this.userGames.sortData = (data: Array<UserGame>, sort: MatSort) => {
      const direction = sort.direction;
      return data.sort((a: UserGame, b: UserGame) => {
        const aIdx = this.games.indexOf(a.game)
        const bIdx = this.games.indexOf(b.game)
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
    if(this.user){
      this.userGameService.getUserGames(this.user._id)
        .subscribe((rsp: ApiResponse) => {
            this.userGames.data = rsp.data as Array<UserGame>
          });
      }
  }

  deleteUserGame(userGameId: number): void {
    this.userGameService.deleteUserGame(userGameId)
      .subscribe((response: unknown) => {
          const userGames = this.userGames.data.filter((userGame: UserGame) => userGame._id != userGameId)
          this.userGames.data = userGames
      });
  }

  onSubmit() {
    const game = this.userGameForm.get('game')
    if(game){
      if (!game.value){
        game.markAsTouched()
        game.markAsDirty()
      }
    }

    const platform = this.userGameForm.get('platform')
    if(platform){
      if (!platform.value){
        platform.markAsTouched()
        platform.markAsDirty()
      }
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
