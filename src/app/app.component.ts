import {Component, OnInit} from '@angular/core'

@Component({
  selector: 'app-root',
  template: `
    <app-shell>
      <router-outlet></router-outlet>
    </app-shell>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  title = 'getlab'

  ngOnInit() {
    if (new Date().getHours() >= 18) {
      document.body.classList.add('dark-theme')
    }
  }
}
