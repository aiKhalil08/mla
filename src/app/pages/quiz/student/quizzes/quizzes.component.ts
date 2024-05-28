import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/interfaces/quiz';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.css'
})
export class QuizzesComponent implements OnInit {

  quizzes: Quiz[];
  loaded: boolean;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getAssignedQuizzes().subscribe({
        next: (response) => {
            // console.log(response)
            this.quizzes = response.quizzes;
            this.loaded = true;
        }
    });
  }

  // formatDate(date: string) {
  //   return format(date, 'do MMMM, yyyy');
  // }
}
