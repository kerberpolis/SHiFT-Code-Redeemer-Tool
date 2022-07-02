import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showHead: boolean = false;
  title = 'SHiFT-Code-Redeemer-Tool';

  
  constructor(private router: Router) {
    // on route change to '/login', set the variable showHead to false to hide header
    router.events.forEach((event: any) => {
      if (event instanceof NavigationStart) {
        if (['/login', '/register'].includes(event['url'])) {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }
}
