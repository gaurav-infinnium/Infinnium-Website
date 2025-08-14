/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogsService } from '../../../services/blogsService.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { NewsService } from '../../../services/newsService.service';

@Component({
  standalone: true,
  selector: 'app-recent-blogs',
  imports: [RouterLink, CommonModule],
  providers: [BlogsService],
  templateUrl: './recent-blogs.component.html',
  styleUrl: './recent-blogs.component.css',
})
export class RecentBlogsComponent implements OnInit {
  public recentBlogs: any = [];
  public isLoading = false;

  constructor(
    private blogsService: BlogsService,
    private cdr: ChangeDetectorRef,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    // this.loadRecentBlogs();
    this.loadRecentNews();
    // this.cdr.detectChanges();
  }

  async loadRecentNews() {
    this.isLoading = true;
    this.cdr.detectChanges();
    this.recentBlogs = await this.newsService.getTop3News();
    this.isLoading = false;
    this.cdr.detectChanges();
    this.initScrollAnimations();
  }

  async loadRecentBlogs() {
    this.isLoading = true;
    this.cdr.detectChanges();
    this.recentBlogs = await this.blogsService.getTop3Blogs();
    this.isLoading = false;
    this.cdr.detectChanges();
  }

  initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    elementsToAnimate.forEach((element) => {
      const el = element as HTMLElement;
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(el);
    });
  }

  slugify(str: string) {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-');
  }
}
