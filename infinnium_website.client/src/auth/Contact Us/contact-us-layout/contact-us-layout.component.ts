import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { FormComponent } from '../form/form.component';
import { ReachOutComponent } from '../reach-out/reach-out.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { ScrollToTopComponent } from "../../../shared/components/scroll-top/scroll-to-top.component";
import { ScrollIndicatorComponent } from "../../../shared/components/scroll-indicator/scroll-indicator.component";
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-contact-us-layout',
  imports: [
    HeaderComponent,
    HeroSectionComponent,
    FormComponent,
    ReachOutComponent,
    FooterComponent,
    ScrollToTopComponent,
    ScrollIndicatorComponent,
    CommonModule
  ],
  templateUrl: './contact-us-layout.component.html',
  styleUrl: './contact-us-layout.component.css',
})
export class ContactUsLayoutComponent {
  isVisible = false;
  isMailSent = false;
  isFadingOut = false;
  message = "Email sent successfully!";

  onFormSubmit(event: any) {
    if (event.isFormSubmitted) {
      this.isVisible = true;
      this.isFadingOut = false;

      if (event.isMailSent) {
        this.isMailSent = true;
        this.message = 'Email sent successfully!';
        setTimeout(() => {
        this.isFadingOut = true; // Start fade-out animation

        // Wait for animation duration before hiding completely
        setTimeout(() => {
          this.isVisible = false;
        }, 500); // Match animation duration
      }, 3000);
      } else {
        this.isMailSent = false;
        this.message = 'Email sent successfully!';
        setTimeout(() => {
        this.isFadingOut = true; // Start fade-out animation

        // Wait for animation duration before hiding completely
        setTimeout(() => {
          this.isVisible = false;
        }, 500); // Match animation duration
      }, 3000);
      }
    } else {
      this.isVisible = false;
    }
  }
}
