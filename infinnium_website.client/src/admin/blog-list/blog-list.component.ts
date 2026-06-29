/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogsService } from '../../services/blogsService.service';
import { NewsService } from '../../services/newsService.service';
import { AuthorService } from '../../services/authorService.service';

@Component({
  selector: 'app-admin-blog-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
})
export class BlogListComponent implements OnInit {
  public blogs: any = [];
  public filteredBlogs: any = [];
  public news: any = [];
  public filteredNews: any = [];
  public authors: any = [];

  public selectedBlogStatus = 'all';
  public selectedNewsStatus = 'all';

  showDeletePopup = false;
  showEditPopup = false;
  showEditNewsPopup = false;
  showEditMemberPopup = false;
  showDeleteMemberPopup = false;
  isContentLoaded = false;

  public blog_edit: any = [];
  public blog_delete!: number;

  public news_edit: any = [];
  public news_delete!: number;

  public member_edit: any = {};
  public member_to_delete: any = {};

  constructor(
    private blogService: BlogsService,
    private newsService: NewsService,
    private authorService: AuthorService,
    private route: Router
  ) {}

  async ngOnInit() {
    this.isContentLoaded = false;
    this.blogs = await this.blogService.getAllBlogsAdmin();
    this.news = await this.newsService.getAllNewsAdmin();
    this.authors = await this.authorService.getAllAuthorsForAdmin();
    this.filterBlogs();
    this.filteredNews = this.news;
    this.isContentLoaded = true;
  }

  filterBlogs(): void {
    if (this.selectedBlogStatus === 'active') {
      this.filteredBlogs = this.blogs.filter((blog: any) => blog.isActive);
    } else if (this.selectedBlogStatus === 'inactive') {
      this.filteredBlogs = this.blogs.filter((blog: any) => !blog.isActive);
    } else {
      this.filteredBlogs = this.blogs;
    }
  }

  filterNews(): void {
    if (this.selectedNewsStatus === 'active') {
      this.filteredNews = this.news.filter((item: any) => item.isActive);
    } else if (this.selectedNewsStatus === 'inactive') {
      this.filteredNews = this.news.filter((item: any) => !item.isActive);
    } else {
      this.filteredNews = this.news;
    }
  }

  toggleEditBlog(event: Event, blog: any) {
    event.preventDefault();
    this.showEditPopup = true;
    this.blog_edit = blog;
  }

  editBlog(blog: any) {
    this.showEditPopup = true;
    this.blog_edit = blog;
  }

  navigateEditBlog() {
    this.closePopup();
    this.route.navigateByUrl(`dashboard/edit-blog/${this.blog_edit.guid}`);
  }

  toggleEditNews(event: Event, blog: any) {
    event.preventDefault();
    this.showEditNewsPopup = true;
    this.news_edit = blog;
  }

  editNews(blog: any) {
    this.showEditNewsPopup = true;
    this.news_edit = blog;
  }

  navigateEditNewsBlog() {
    this.closePopup();
    this.route.navigateByUrl(`dashboard/edit-news/${this.news_edit.guid}`);
  }

  editMember(member: any) {
    this.showEditMemberPopup = true;
    this.member_edit = member;
  }

  navigateEditMember() {
    this.closePopup();
    this.route.navigateByUrl(
      `dashboard/update-members/${this.slugify(this.member_edit.name)}/${this.member_edit.guid}`
    );
  }

  openDeleteMemberPopup(member: any) {
    this.member_to_delete = member;
    this.showDeleteMemberPopup = true;
  }

  confirmDeleteMember() {
    this.authorService.deleteAuthor(this.member_to_delete.guid);
    this.authors = this.authors.filter((a: any) => a.guid !== this.member_to_delete.guid);
    this.closePopup();
  }

  closePopup(): void {
    this.showDeletePopup = false;
    this.showEditPopup = false;
    this.showEditNewsPopup = false;
    this.showEditMemberPopup = false;
    this.showDeleteMemberPopup = false;
  }

  slugify(str: string) {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-');
  }
}
