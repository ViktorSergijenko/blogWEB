import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from '@app/models/post.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { I18nService, CredentialsService } from '@app/core';
import { PostService } from '@app/services/post-service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss']
})
export class PostModalComponent implements OnInit {
  postForm: FormGroup;
  edit: boolean;
  loading: boolean;
  userId: string;
  fullname: string;

  constructor(
    public dialogRef: MatDialogRef<PostModalComponent>,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private credentialsService: CredentialsService,
    private postService: PostService,
    @Inject(MAT_DIALOG_DATA) public data: Post) {
      this.createLoginForm();
      this.userId = this.credentialsService.credentials.id;
      this.fullname= this.credentialsService.credentials.fullName;

    }

  ngOnInit() {
    if (this.data) {
      console.log('asd');
      this.getPost();
    } else {
      console.log('asd');
      this.initializeFormWithValues();
      
    }
  }

  getPost() {
    this.loading = true;
    this.postService.getCatalogByiD(this.data.id)
    .pipe(finalize(() => {
      this.loading = false;
    }))
    .subscribe(post => {
      this.postForm.patchValue({imageBase64: post.imageBase64, userId: this.userId,authorFullName: this.fullname,id: post.id, text: post.text, title: post.title });
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.postForm.patchValue({ imageBase64: reader.result });
    };
  }

  accept() {
    this.postService.addOrUpdate(this.postForm.value)
    .pipe(
      finalize(() => {

      })
    )
    .subscribe(value => {
      this.data = value;
      console.log(value);
      this.dialogRef.close(this.data);
    });
  }

  private createLoginForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      authorFullName: ['', Validators.required],
      text: ['', Validators.required],
      userId: ['', Validators.required],
      imageBase64: ['', Validators.required],
      id:['']
    });
  }

  private initializeFormWithValues() {
      this.postForm.patchValue({ authorFullName: this.fullname });
      this.postForm.patchValue({ userId: this.userId });
    
  }

}
