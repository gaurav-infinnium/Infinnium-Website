/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactUsService } from '../../../services/contactUsService.service';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  providers: [ContactUsService],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements AfterViewInit, OnInit, AfterViewChecked {
  isMailSent = false;
  isVisible = false;
  isInValid = false;
  submitted = false;
  isFadingOut = false;
  isLoading = false;
  message = '';
  baseStyle = "w-full border rounded-lg p-3 focus:outline-none focus:ring-1";
  invalidStyle = "w-full border border-red-600 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-red-900 pr-10";
  captchaDrawn = false;
  captchaCode = '';
  captchaValid: boolean = false;
  isShowCaptchaCode = false;
  captchaBaseStyle = "h-[38px] p-1 px-2 border border-gray-300 rounded-md box-border ml-2 w-40";
  captchaInvalidStyle = "h-[38px] p-1 px-2 border border-red-600 rounded-md box-border ml-2 w-40 focus:outline-none focus:ring-1 focus:ring-red-900";

  @ViewChild('captchaCanvas', { static: false }) captchaCanvas!: ElementRef<HTMLCanvasElement>;
  @Output() submitEvent = new EventEmitter<any>();
  loadSessionConfig: any;
  decodedBase64: any;
  sessionData: any;

  show(message: string) {
    this.message = message;
    this.isVisible = true;
    this.isFadingOut = false;

    setTimeout(() => {
      this.isFadingOut = true; // Start fade-out animation

      // Wait for animation duration before hiding completely
      setTimeout(() => {
        this.isVisible = false;
      }, 500); // Match animation duration
    }, 3000);
  }

  constructor(private contactUsService: ContactUsService) { }

  contactUsForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    captcha: new FormControl('', [])
  });

  ngOnInit(): void {
    this.loadSessionConfig = localStorage.getItem('sessionId');
    if (this.loadSessionConfig) {
      this.decodedBase64 = atob(this.loadSessionConfig);
      this.sessionData = JSON.parse(this.decodedBase64);
      if (this.sessionData.fsf == true) {
        this.isShowCaptchaCode = true;
        // this.generateCaptcha();
      } else {
        this.isShowCaptchaCode = false;
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.sessionData.fsf == true) {
      this.isShowCaptchaCode = true;
      this.generateCaptcha();
      this.captchaDrawn = true;
    } else {
      this.isShowCaptchaCode = false;
    }
  }

  ngAfterViewChecked() {
    if (this.isShowCaptchaCode && !this.captchaDrawn) {
      this.drawCaptcha();
      this.captchaDrawn = true;
    }
  }


  onSubmit() {
    // console.log(this.contactUsForm.value);
    this.submitted = true;
    let isCaptchaValid = false;
    if (this.isShowCaptchaCode == true) {
      const result = this.validateCaptcha();
      isCaptchaValid = result;

      if (this.contactUsForm.valid && isCaptchaValid) {
        //console.log("Part 1");
        this.isLoading = true;
        this.isInValid = false;
        this.contactUsService.addContactUs(this.contactUsForm.value.name, this.contactUsForm.value.email, this.contactUsForm.value.description).subscribe({
          next: (res) => {
            this.isMailSent = true;
            this.submitted = false;
            this.isLoading = false;
            const response = {
              isFormSubmitted: true,
              isMailSent: true
            };
            this.contactUsForm.reset({
              name: '',
              email: '',
              description: '',
              captcha: ''
            });
            this.contactUsForm.markAsPristine();
            this.isShowCaptchaCode = true;
            setTimeout(() => {
              this.generateCaptcha(); // calls drawCaptcha inside
            }, 0);
            // this.show('Email sent successfully!');

            // local storage config update
            this.loadSessionConfig = {
              ...this.sessionData,
              fsf: true
            }
            const jsonString = JSON.stringify(this.loadSessionConfig);
            const encodedBase64 = btoa(jsonString);
            localStorage.setItem('sessionId', encodedBase64);
            this.submitEvent.emit(response);
          },
          error: (err) => {
            this.isMailSent = true;
            this.submitted = false;
            this.isLoading = false;
            const response = {
              isFormSubmitted: true,
              isMailSent: true
            };
            this.contactUsForm.reset({
              name: '',
              email: '',
              description: '',
              captcha: ''
            });
            this.contactUsForm.markAsPristine();
            this.isShowCaptchaCode = true;
            setTimeout(() => {
              this.generateCaptcha(); // calls drawCaptcha inside
            }, 0);
            // this.show('Email sent successfully!');

            // local storage config update
            this.loadSessionConfig = {
              ...this.sessionData,
              fsf: true
            }
            const jsonString = JSON.stringify(this.loadSessionConfig);
            const encodedBase64 = btoa(jsonString);
            localStorage.setItem('sessionId', encodedBase64);
            this.submitEvent.emit(response);
          }
        });
      } else {
        //console.log("Part 1");
        this.isInValid = true;
        this.contactUsForm.markAllAsTouched();
        // console.log('Form is invalid');
      }
    } else {
      if (this.contactUsForm.valid) {
        //console.log("fsf_not available");
        this.isLoading = true;
        this.isInValid = false;
        this.contactUsService.addContactUs(this.contactUsForm.value.name, this.contactUsForm.value.email, this.contactUsForm.value.description).subscribe({
          next: (res) => {
            this.isMailSent = true;
            this.submitted = false;
            this.isLoading = false;
            const response = {
              isFormSubmitted: true,
              isMailSent: true
            };
            this.contactUsForm.reset({
              name: '',
              email: '',
              description: '',
              captcha: ''
            });
            this.contactUsForm.markAsPristine();
            this.isShowCaptchaCode = true;
            setTimeout(() => {
              this.generateCaptcha(); // calls drawCaptcha inside
            }, 0);
            // this.show('Email sent successfully!');

            // local storage config update
            this.loadSessionConfig = {
              ...this.sessionData,
              fsf: true
            }
            const jsonString = JSON.stringify(this.loadSessionConfig);
            const encodedBase64 = btoa(jsonString);
            localStorage.setItem('sessionId', encodedBase64);
            this.submitEvent.emit(response);
          },
          error: (err) => {
            this.isMailSent = true;
            this.submitted = false;
            this.isLoading = false;
            const response = {
              isFormSubmitted: true,
              isMailSent: true
            };
            this.contactUsForm.reset({
              name: '',
              email: '',
              description: '',
              captcha: ''
            });
            this.contactUsForm.markAsPristine();
            this.isShowCaptchaCode = true;
            setTimeout(() => {
              this.generateCaptcha(); // calls drawCaptcha inside
            }, 0);
            // this.show('Email sent successfully!');

            // local storage config update
            this.loadSessionConfig = {
              ...this.sessionData,
              fsf: true
            }
            const jsonString = JSON.stringify(this.loadSessionConfig);
            const encodedBase64 = btoa(jsonString);
            localStorage.setItem('sessionId', encodedBase64);
            this.submitEvent.emit(response);
          }
        });
      } else {
        this.isInValid = true;
        this.contactUsForm.markAllAsTouched();
        // console.log('Form is invalid');
      }
    }
  }

  generateCaptcha(): void {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    this.captchaCode = Array.from({ length: 5 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
    this.drawCaptcha();
  }

  drawCaptcha(): void {
    const canvas = this.captchaCanvas?.nativeElement;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background (same color, no change)
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Make the font bolder and adjust size for better readability
    const fontSize = 22;  // increase font size for better clarity
    ctx.font = `${fontSize}px monospace`;
    ctx.fillStyle = '#000';  // Black color for better contrast

    // Loop through captcha characters and draw them with reduced jitter
    for (let i = 0; i < this.captchaCode.length; i++) {
      const char = this.captchaCode[i];
      const x = 10 + i * 22;  // Adjust spacing to accommodate larger font
      const y = 20 + (Math.random() - 0.5) * 3;  // Small vertical jitter for positioning

      ctx.save();
      const angle = (Math.random() - 0.5) * 0.3;  // Less random rotation for clearer text
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }

    // Add fewer random lines for less clutter
    for (let i = 0; i < 2; i++) {  // Reduced to 2 lines
      ctx.strokeStyle = this.getRandomColor();
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Reduce number of random dots for less clutter
    // for (let i = 0; i < 15; i++) {  // Reduced to 15 dots
    //   ctx.fillStyle = this.getRandomColor();
    //   const x = Math.random() * canvas.width;
    //   const y = Math.random() * canvas.height;
    //   ctx.beginPath();
    //   ctx.arc(x, y, 1.5, 0, 2 * Math.PI);
    //   ctx.fill();
    // }
  }


  getRandomColor(): string {
    const r = Math.floor(Math.random() * 150);
    const g = Math.floor(Math.random() * 150);
    const b = Math.floor(Math.random() * 150);
    return `rgb(${r},${g},${b})`;
  }

  validateCaptcha() {
      const captchaValue = this.contactUsForm.get('captcha')?.value;
      return (this.captchaValid = captchaValue === this.captchaCode);
    }
}
