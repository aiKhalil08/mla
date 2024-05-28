import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { format } from 'date-fns';
import { AuditTrail } from 'src/app/interfaces/audit-trail';

@Component({
  selector: 'app-audit-trail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './audit-trail.component.html',
  styleUrl: './audit-trail.component.css'
})
export class AuditTrailComponent {
  @Input() trail: AuditTrail

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  get actor_name() {
    return this.trail.actor ? this.capitalize(this.trail.actor.first_name)+' '+this.capitalize(this.trail.actor.last_name) : 'not set';
  }

  get actor_type() {
    return this.trail.actor ? this.capitalize(this.trail.actor?.type) : 'not set';
  }

  get id() {
    return btoa(String(this.trail.id));
  }

  get date() {
    return format(this.trail.date, 'PPPPpp')
  }

}
