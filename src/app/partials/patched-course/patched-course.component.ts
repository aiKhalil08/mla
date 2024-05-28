import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-patched-course',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patched-course.component.html',
  styleUrl: './patched-course.component.css'
})
export class PatchedCourseComponent {

  @Input() patched: object;
  @Input() object_name: string;

  get code() {
    return this.patched['code'];
  }

  get title() {
    return this.patched['title'];
  }

  get overview() {
    return this.patched['overview'];
  }

  get objectives() {
    let objectives: object[];
    if (!this.patched['objectives']['changed']) {
      objectives = this.patched['objectives']['value'].map(function (ob) {
        return {'changed': false, 'value': ob};
      });
    } else {
      objectives = Object.keys(this.patched['objectives']).filter((key) => key != 'has_children' && key != 'changed').map(key => {
        return this.patched['objectives'][key];
      });
    }
    return objectives;
  }

  get attendees() {
    let attendees: object[];
    if (!this.patched['attendees']['changed']) {
      attendees = this.patched['attendees']['value'].map(function (ob) {
        return {'changed': false, 'value': ob};
      });
    } else {
      attendees = Object.keys(this.patched['attendees']).filter((key) => key != 'has_children' && key != 'changed').map(key => {
        return this.patched['attendees'][key];
      });
    }
    return attendees;
  }

  get prerequisites() {
    let prerequisites: object[];
    if (!this.patched['prerequisites']['changed']) {
      prerequisites = this.patched['prerequisites']['value'].map(function (ob) {
        return {'changed': false, 'value': ob};
      });
    } else {
      prerequisites = Object.keys(this.patched['prerequisites']).filter((key) => key != 'has_children' && key != 'changed').map(key => {
        return this.patched['prerequisites'][key];
      });
    }
    return prerequisites;
  }

  get modules() {
    let modules: any[];
    if (!this.patched['modules']['changed']) {
      modules = this.patched['modules']['value'];
    } else {
      modules = Object.keys(this.patched['modules']).filter((key) => key != 'has_children' && key != 'changed').map(key => {
        return this.patched['modules'][key];
      });
    }

    return modules;
  }

  get date() {
    let date: object;
    if (this.patched['date']['changed']) {
      date = {
        changed: true,
        old: this.patched['date']['old'],
        new: this.patched['date']['new']
      }
    } else {
      let value = this.patched['date']['value'];
      date = {
        changed: false,
        value
      }
    }
    return date;
  }

  get location() {
    return this.patched['location'];
  }

  get price() {
    let price: object;
    if (this.patched['price']['changed']) {
      price = {
        changed: true,
        old: this.patched['price']['old'],
        new: this.patched['price']['new']
      }
    } else {
      let value = this.patched['price']['value'];
      price = {
        changed: false,
        value
      }
    }
    return price;
  }

  get discount() {
    return this.patched['discount'];
  }

  // get image_url() {
  //   return this.patched['image_url'];
  // }
}
