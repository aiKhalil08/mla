import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DoMoreLinkComponent } from "../links/do-more-link/do-more-link.component";
import { BlogItem } from 'src/app/interfaces/blog';
import { BlogService } from 'src/app/services/blog.service';
import { BlogItemComponent } from "../blog-item/blog-item.component";

@Component({
    selector: 'app-blog-list',
    standalone: true,
    templateUrl: './blog-list.component.html',
    styleUrls: ['./blog-list.component.css'],
    imports: [CommonModule, RouterLink, DoMoreLinkComponent, BlogItemComponent]
})
export class BlogListComponent implements OnInit {
  @Input() type!: string;
  @Input() count: number | 'all' = 'all';
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
}
