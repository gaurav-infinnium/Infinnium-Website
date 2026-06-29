/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthorService } from '../../services/authorService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuillModule } from 'ngx-quill';

@Component({
  standalone: true,
  selector: 'app-edit-founders',
  imports: [
    NavbarComponent,
    FooterComponent,
    CommonModule,
    ReactiveFormsModule,
    QuillModule,
  ],
  providers: [AuthorService],
  templateUrl: './edit-founders.component.html',
  styleUrl: './edit-founders.component.css',
})
export class EditFoundersComponent implements OnInit {
  memberForm!: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  originalFile: File | null = null;
  showPopup = false;
  authorId: any = '';
  isAddMode = false;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.authorId = this.route.snapshot.paramMap.get('guid');
    this.isAddMode = !this.authorId;

    this.memberForm = this.fb.group({
      image: [null, Validators.required],
      name: ['', Validators.required],
      designation: ['', Validators.required],
      email: ['', [Validators.email]],
      description: ['', Validators.required],
      linkedin: [''],
      isActive: [true],
    });

    if (!this.isAddMode) {
      this.authorService.getAuthorDetails(this.authorId).then((author) => {
        this.memberForm.patchValue({
          image: author.image,
          name: author.name,
          designation: author.designation,
          email: author.email,
          description: author.description,
          linkedin: author.socialMediaLink,
          isActive: author.isActive ?? true,
        });
        this.previewUrl = author.image;
      });
    }
  }

  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.originalFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);

      this.memberForm.patchValue({ image: file });
      this.memberForm.get('image')?.markAsTouched();
    }
  }

  onSubmit() {
    if (this.memberForm.valid) {
      const formValue = this.memberForm.value;

      if (this.isAddMode) {
        this.authorService.addAuthor({
          image: formValue.image,
          name: formValue.name,
          email: formValue.email,
          designation: formValue.designation,
          description: formValue.description,
          linkedin: formValue.linkedin,
        });
      } else {
        this.authorService.editAuthorDetails({
          image: formValue.image,
          name: formValue.name,
          email: formValue.email,
          designation: formValue.designation,
          description: formValue.description,
          linkedin: formValue.linkedin,
          id: this.authorId,
          isActive: formValue.isActive,
        });
      }

      this.showPopup = true;
    } else {
      this.memberForm.markAllAsTouched();
    }
  }

  closePopup(): void {
    this.showPopup = false;
    this.router.navigateByUrl(`/dashboard`);
  }

  cancel(): void {
    this.router.navigateByUrl('/dashboard');
  }
}
