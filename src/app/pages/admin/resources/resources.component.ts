import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedirectButtonComponent } from "../../../partials/buttons/redirect-button/redirect-button.component";
import { ResourcesService } from 'src/app/services/resource.service';
import { BlogItem, TestimonialItem } from 'src/app/interfaces/resource';


@Component({
    selector: 'app-resources',
    standalone: true,
    templateUrl: './resources.component.html',
    styleUrls: ['./resources.component.css'],
    imports: [CommonModule, RedirectButtonComponent]
})

export class ResourcesComponent implements OnInit {
    blogs!: BlogItem[];
    testimonials?: TestimonialItem[];
    loaded: boolean = false;

    constructor(private resourcesService: ResourcesService) {}

    ngOnInit(): void {
        this.resourcesService.get().subscribe({
            next: (response) => {
                // console.log('arrived')
                this.blogs = response.blogs;
                this.testimonials = response.testimonials;
                this.loaded = true;
            }
        });
    }
}
