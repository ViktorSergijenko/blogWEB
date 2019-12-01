import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService, untilDestroyed, CredentialsService, Credentials } from '@app/core';
import { HttpClient } from '@angular/common/http';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  cred: Credentials;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private http: HttpClient
  ) {
    this.createForm();
  }

  ngOnInit() {}

  ngOnDestroy() {}
  goAsGuest() {
    this.cred = new Credentials();
    this.cred.roleName = 'guest';
    this.credentialsService.setCredentials(this.cred, this.loginForm.value.remember);
    this.router.navigate([this.route.snapshot.queryParams.redirect || '/guest'], { replaceUrl: true });
  }
  login() {
    this.isLoading = true;
    const login$ = this.authenticationService.login(this.loginForm.value);
    login$
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
        })
      )
      .subscribe(
        credentials => {
          this.credentialsService.setCredentials(credentials, this.loginForm.value.remember);
          this.authenticationService
            .getUserProfile()
            .pipe(
              finalize(() => {
                this.isLoading = false;
              })
            )
            .subscribe(userProfile => {
              userProfile.token = credentials.token;
              this.credentialsService.setCredentials(userProfile, this.loginForm.value.remember);
              log.debug(`${userProfile.roleName} successfully logged in`);
              switch (userProfile.roleName) {
                case 'Global Admin':
                  this.router.navigate([this.route.snapshot.queryParams.redirect || '/global'], { replaceUrl: true });
                  break;
                case 'Moderator':
                  this.router.navigate([this.route.snapshot.queryParams.redirect || '/moderator'], { replaceUrl: true });
                  break;
                  case 'RegularUser':
                  this.router.navigate([this.route.snapshot.queryParams.redirect || '/regularUser'], { replaceUrl: true });
                  break;
                  case 'guest':
                  this.router.navigate([this.route.snapshot.queryParams.redirect || '/guest'], { replaceUrl: true });
                  break;
                default:
                  break;
              }
            });
        },
        error => {
          this.isLoading = false;
          log.debug(`Login error: ${error}`);
          this.error = error;
        }
      );
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }
}
