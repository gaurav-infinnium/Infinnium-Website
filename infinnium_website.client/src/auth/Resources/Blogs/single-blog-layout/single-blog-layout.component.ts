/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SingleBlogComponent } from '../../single-blog/single-blog.component';
import { RecentBlogsComponent } from '../../../../shared/components/recent-blogs/recent-blogs.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { HeroSectionComponent } from '../../hero-section/hero-section.component';
import { BlogsService } from '../../../../services/blogsService.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ScrollToTopComponent } from "../../../../shared/components/scroll-top/scroll-to-top.component";
import { ScrollIndicatorComponent } from "../../../../shared/components/scroll-indicator/scroll-indicator.component";
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-single-blog-layout',
  imports: [
    HeroSectionComponent,
    SingleBlogComponent,
    RecentBlogsComponent,
    HeaderComponent,
    FooterComponent,
    ScrollToTopComponent,
    ScrollIndicatorComponent,
    NgIf
],
  providers: [BlogsService],
  templateUrl: './single-blog-layout.component.html',
  styleUrl: './single-blog-layout.component.css',
})
export class SingleBlogLayoutComponent implements OnInit, OnDestroy {
  @Input() blogId!: string;
  public guid: string = '';
  public loading = true;
  private routeSub!: Subscription;

  constructor(
    private blogService: BlogsService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  public top3Blogs: any = [];
  public blog: any = [];

  ngOnInit() {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const guidFromRoute = params.get('guid');
      if (guidFromRoute) {
        this.guid = guidFromRoute;
        this.loadData();
      }
    });
  }

  async loadData() {
    this.loading = true;
    this.top3Blogs = await this.blogService.getTop3Blogs();
    this.loading = false;
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }
}
