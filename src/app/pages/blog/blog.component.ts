import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


interface Blog {
  title: string,
  date: string,
  body: string,
  author: string,
  img_src: string
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
 blog: Blog =
    {
      title: "Top Risks for Not Going Paperless",
      date: "January 23, 2023",
      body: `Organisations regularly come up with ways of enhancing business processes and security postures. They make investments that reduce the amount of effort needed to achieve a business outcome. Whether your company produces products or delivers services, efficient processes help in delivering to customer satisfaction.
      Every stakeholder needs to be aware of the business goals that the process is designed to achieve, the constraints the process must operate within and strengths and weaknesses of the process in its current state while establishing efficient business processes. Understanding of these elements and a consensus to implement strengthening strategies often position the organisation for better operational efficiency, resources utilisation, customer satisfaction, improved profit margins, reduced excess inventory and enhanced information security.
      One of the building blocks for efficient business processes is effective management of information – a core determinant to successful operations and survival in harsh times. Information could be paper-based or electronic. Organisations that implement an end-to-end document management system (DMS) have a firmer grip over their business processes. Ignoring this building blocks expose the business to significant risks including.`,
      author: "Mitiget Learning Academy",
      img_src: "/assets/images/blogs/cyber.png"
    };
}
