import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QuizItem } from 'src/app/interfaces/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import { RedirectButtonComponent } from "../../../../partials/buttons/redirect-button/redirect-button.component";
import { format } from 'date-fns';

@Component({
    selector: 'app-quizzes',
    standalone: true,
    templateUrl: './quizzes.component.html',
    styleUrl: './quizzes.component.css',
    imports: [CommonModule, RedirectButtonComponent]
})
export class QuizzesComponent implements OnInit {
  quizzes: QuizItem[];
  loaded: boolean;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getAll().subscribe({
        next: (response) => {
            console.log(response)
            this.quizzes = response.quizzes;
            this.loaded = true;
        }
    });
  }

  formatDate(date: string) {
    return format(date, 'do MMMM, yyyy');
  }
}
