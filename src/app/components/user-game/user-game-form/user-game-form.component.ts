import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms'
import { UserGameService } from 'src/app/services/user-game.service';

@Component({
  selector: 'app-user-game-form',
  templateUrl: './user-game-form.component.html',
  styleUrls: ['./user-game-form.component.scss']
})
export class UserGameFormComponent implements OnInit {
  platform = ''
  platforms: string[] = ['Epic', 'Steam', 'Xbox', 'Playstation']

  game = ''
  games: string[] = ['Borderlands: Game of the Year Edition', 'Borderlands 2',
    'Borderlands: The Pre-Sequel', 'Borderlands 3',
    'Tiny Tina\'s Wonderlands'
  ]

  public userGameForm: FormGroup 
  
  constructor(private userGameService: UserGameService) { 
    this.userGameForm = new FormGroup({
      game: new FormControl(null, [Validators.required]),
      platform: new FormControl(null, [Validators.required]),
      user_id: new FormControl(null, [Validators.required]),

    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userGameService.addUserGame(this.userGameForm.value).subscribe((userGame: any) => {
      console.log(userGame)
      window.location.reload()
    });
  }
}
