import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { map, shareReplay } from 'rxjs';

@Component({
  selector: 'getlab-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss'],
})
export class FeatureComponent {
  title = 'Laboratórios';

  isHandset$ = this.bpObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private bpObserver: BreakpointObserver) {}
}
