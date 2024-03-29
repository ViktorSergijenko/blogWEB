import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { filter } from 'rxjs/operators';

import { untilDestroyed, CredentialsService } from '@app/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;

  constructor(private media: MediaObserver, private credentialsService: CredentialsService) {}

  ngOnInit() {
    // Automatically close side menu on screens > sm breakpoint
    this.media
      .asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.some(change => change.mqAlias !== 'xs' && change.mqAlias !== 'sm')),
        untilDestroyed(this)
      )
      .subscribe(() => this.sidenav.close());
  }

  get userRole(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.roleName : null;
  }

  ngOnDestroy() {
    // Needed for automatic unsubscribe with untilDestroyed
  }
}
