/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewsService } from '../../../services/newsService.service';
import { BlogsService } from '../../../services/blogsService.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-single-blog',
  imports: [RouterLink, CommonModule],
  providers: [NewsService, BlogsService],
  templateUrl: './single-blog.component.html',
  styleUrl: './single-blog.component.css',
})
export class SingleBlogComponent implements OnInit, OnDestroy {
  blog: any = [];
  news: any = [];
  public guid = '';
  isContentLoaded = false;
  private routeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogsService,
    private newsService: NewsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const guidFromRoute = params.get('guid');
      if (guidFromRoute) {
        this.guid = guidFromRoute;
        this.loadContent();
      }
    });
  }

  async loadContent() {
    this.isContentLoaded = false;
    const url = this.router.url;
    if (url.startsWith('/resources/blogs')) {
      this.blog = await this.blogService.getBlogDetails(this.guid);
      this.blog.description = this.blog.description.replace(/&nbsp;/g, ' ');
      this.blog.description = this.sanitizer.bypassSecurityTrustHtml(this.blog.description);
    } else {
      this.news = await this.newsService.getNewsDetails(this.guid);
      this.news.description = this.news.description.replace(/&nbsp;/g, ' ');
      this.news.description = this.sanitizer.bypassSecurityTrustHtml(this.news.description);
    }
    this.isContentLoaded = true;
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }
}
