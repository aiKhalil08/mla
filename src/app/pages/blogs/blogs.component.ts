import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollButtonComponent } from "../../partials/buttons/enroll-button/enroll-button.component";
import { RouterLink } from '@angular/router';
import { BlogItem } from 'src/app/interfaces/blog';
import { BlogService } from 'src/app/services/blog.service';
import { ExpandItemLinkComponent } from "../../partials/links/expand-item-link/expand-item-link.component";

interface Blog {
  title: string,
  date: string,
  body: string,
  author: string,
  img_src: string
}
@Component({
    selector: 'app-blogs',
    standalone: true,
    templateUrl: './blogs.component.html',
    styleUrls: ['./blogs.component.css'],
    imports: [CommonModule, EnrollButtonComponent, RouterLink, ExpandItemLinkComponent]
})
export class BlogsComponent {
  count: 'all' = 'all';
  blog_posts: BlogItem[];
  loaded: boolean = false;
  constructor (private blogService: BlogService) {}

  ngOnInit() {
    // console.log('we here')
    this.blogService.getList(this.count).subscribe({
      next: (response) => {
        console.log(response)
        this.loaded = true;
        this.blog_posts = response;
        console.log(response);
      },
    });
  }

  get recent_posts() {
    return this.blog_posts.slice(0,9);
  }
}
