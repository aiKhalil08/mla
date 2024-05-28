import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent implements OnInit {

  quiz_title: string;

  constructor (private route: ActivatedRoute, private quizService: QuizService) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      this.quiz_title = params['t'];
      
    });


    this.fetchQuiz();
  }

  fetchQuiz() {
    
  }
}
