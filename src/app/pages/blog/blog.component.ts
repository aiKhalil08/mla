import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Blog } from 'src/app/interfaces/blog';
import { BlogService } from 'src/app/services/blog.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmptyContentComponent } from "../../partials/empty-content/empty-content.component";
import { format } from 'date-fns';



@Component({
    selector: 'app-blog',
    standalone: true,
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css'],
    imports: [CommonModule, RouterLink, EmptyContentComponent]
})
export class BlogComponent {
  public blog: Blog | null = null;
  recent_posts: {heading: string}[] | null = null;
  loaded: boolean = false;
  facebookLink: string;
  twitterLink: string;
  linkedInLink: string;
  fetching: boolean = false;
  no_blog: string = null;

  constructor (private blogService: BlogService, private route: ActivatedRoute) {}

  ngOnInit() {
    let heading;
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {
      heading = param.get('heading');
      this.getBlog(heading);
    });
    // this.facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(document.location.href)}`;
    // this.twitterLink = `https://twitter.com/intent/tweet?url=${encodeURI(document.location.href)}`;
    // this.linkedInLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURI(document.location.href)}`;
  }

  getBlog(heading) {
    this.fetching = true;

    this.blogService.getPost(heading).subscribe({
      next: (response) => {
        this.fetching = false;
        if (response.status == 'failed') {
          this.no_blog = response.message;
          return;
        }
        this.blog = response.blog;
      
        this.blog = response.blog;
        this.recent_posts = response.recent_posts;

        this.facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(document.location.href)}`;
        this.twitterLink = `https://twitter.com/intent/tweet?url=${encodeURI(document.location.href)}`;
        this.linkedInLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURI(document.location.href)}`;
      }
    });
  }

  get date() {
    return format(this.blog.created_at, 'dd MMMM, yyyy');
  }
}
