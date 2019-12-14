import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService, untilDestroyed, CredentialsService, Credentials, LoginContext } from '@app/core';
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
  registrationForm!: FormGroup;
  isLoading = false;
  cred: Credentials;
  registrationFormVisability: boolean;
  selectedFile: any = null;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private http: HttpClient
  ) {
    this.createLoginForm();
    this.createRegistrationForm();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  onFileSelected(event: any) {

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.registrationForm.patchValue({ avatarImageBase64: reader.result });
    };
  }
  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      myReader.readAsDataURL(file);
      this.selectedFile = myReader.result;

    };

  }
  goAsGuest() {
    this.cred = new Credentials();
    this.cred.roleName = 'Guest';
    this.credentialsService.setCredentials(this.cred, this.loginForm.value.remember);
    this.router.navigate([this.route.snapshot.queryParams.redirect || '/guest'], { replaceUrl: true });
  }
  openRegistrationForm() {
    this.registrationFormVisability = true;
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
                  this.router.navigate([this.route.snapshot.queryParams.redirect || '/regular-user'], { replaceUrl: true });
                  break;
                  case 'Guest':
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

  register() {
    this.isLoading = true;
    const register$ = this.authenticationService.register(this.registrationForm.value);
    register$
      .pipe(
        finalize(() => {
          this.registrationForm.markAsPristine();
        })
      )
      .subscribe(
        newUser => {
            var loginContext = new LoginContext();
            loginContext.email = newUser.email;
            loginContext.password = newUser.password;
            loginContext.remember = true;
          
        this.isLoading = true;
     this.authenticationService.login(loginContext)
      .subscribe(
        credentials => {
          this.credentialsService.setCredentials(credentials, this.loginForm.value.remember);
          this.authenticationService
            .getUserProfile()
            .subscribe(userProfile => {
              userProfile.token = credentials.token;
              this.credentialsService.setCredentials(userProfile, this.loginForm.value.remember);
              log.debug(`${userProfile.roleName} successfully logged in`);
              this.router.navigate([this.route.snapshot.queryParams.redirect || '/regularUser'], { replaceUrl: true });

            });
        },
        error => {
          this.isLoading = false;
          log.debug(`Login error: ${error}`);
          this.error = error;
        }
      );
        },
        error => {
          this.isLoading = false;
          log.debug(`Registration error: ${error}`);
          this.error = error;
        }
        );
  }
  openLoginForm() {
    this.registrationFormVisability = false;
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

  private createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      remember: true
    });
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
  private createRegistrationForm() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      avatarImageBase64: [''],
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });
  }
}
