import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Blog } from 'src/app/interfaces/blog';
import { BlogService } from 'src/app/services/blog.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import moment from 'moment';



@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  public blog: Blog | null = null;
  recent_posts: {heading: string}[] | null = null;
  loaded: boolean = false;

  constructor (private blogService: BlogService, private route: ActivatedRoute) {}

  ngOnInit() {
    let heading;
    let paramObservable = this.route.paramMap;
    paramObservable.subscribe((param) => {
      heading = param.get('heading');
      this.getBlog(heading);
    });
  }

  getBlog(heading) {
    this.blogService.getPost(heading).subscribe({
      next: (response) => {
        console.log('res is here', response)
        this.loaded = true;
        this.blog = response.blog;
        this.recent_posts = response.recent_posts;
      }
    });
  }

  get date() {
    return moment(this.blog.created_at).format('D MMMM, Y');
  }
}
