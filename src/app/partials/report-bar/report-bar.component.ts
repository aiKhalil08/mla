import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import Timer from 'easytimer.js';

@Component({
  selector: 'app-report-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-bar.component.html',
  styleUrls: ['./report-bar.component.css']
})
export class ReportBarComponent implements AfterViewInit {

  @Input() message: string;
  @Input() type: 'error' | 'progress' | 'success';

  @ViewChild('bar') bar: ElementRef;

  @HostBinding('class.hidden') get elapsed() {return this.remove}

  percentage_elapsed: number = 0;
  microseconds_elapsed: number = 0;
  duration: number = 10000;
  remove: boolean = false;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.type != 'progress') this.startCountdown();
  }
  
  startCountdown() {
    
    let interval = setInterval(() => {

      if (this.microseconds_elapsed > 10000) {
        clearInterval(interval);
        this.remove = true;
        return;
      }

      this.microseconds_elapsed += 100;


      this.percentage_elapsed = this.microseconds_elapsed * 100 / this.duration;


      this.renderer.setStyle(this.bar.nativeElement, 'width', `${100 - this.percentage_elapsed}%`);
    }, 100);
  }

}
