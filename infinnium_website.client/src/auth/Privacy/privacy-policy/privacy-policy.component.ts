import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { ScrollToTopComponent } from "../../../shared/components/scroll-top/scroll-to-top.component";

@Component({
  standalone: true,
  selector: 'app-privacy-policy',
  imports: [FooterComponent, RouterLink, ScrollToTopComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css',
})
export class PrivacyPolicyComponent implements AfterViewInit {
  @ViewChild('mobileMenuBtn', { static: false }) mobileMenuBtn!: ElementRef;
  @ViewChild('mobileSidebar', { static: false }) mobileSidebar!: ElementRef;
  @ViewChild('mobileCloseBtn', { static: false }) mobileCloseBtn!: ElementRef;
  @ViewChild('navMenu', { static: false }) navMenu!: ElementRef;
  @ViewChild('header', { static: false }) header!: ElementRef;
  @ViewChild('logoSvg', { static: false }) logoSvg!: ElementRef;

  ngAfterViewInit() {
    this.mobileMenuBtn.nativeElement.addEventListener('click', () => {
      this.mobileSidebar.nativeElement.classList.add('active');
    });

    this.mobileCloseBtn.nativeElement.addEventListener('click', () => {
      this.mobileSidebar.nativeElement.classList.remove('active');
    });

    document
      .querySelectorAll<HTMLElement>('.dropdown-toggle')
      .forEach((toggle) => {
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
          const dropdownMenu = toggle.nextElementSibling as HTMLElement;
          if (dropdownMenu) {
            dropdownMenu.classList.toggle('hidden');
          }
        });
      });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.header && this.logoSvg) {
      // scroll-based header styling handled by CSS
    }
  }

  toggleMobileMenu() {
    this.navMenu.nativeElement.classList.toggle('hidden');
  }
}
