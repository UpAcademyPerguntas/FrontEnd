import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/services';
import { FormGroup, FormControl } from '@angular/forms';
import { QuestionService } from '../core/services/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  public cards = [
  ]

  votedQuestion=[];
  // criar o objeto para por no ng model
  //criaçao  da variavel
    question = {
      questionContent:'',
      conference : {id:1}
    };

  constructor(private questionService:QuestionService){}

  ngOnInit() {
    this.questionService.getAll().subscribe( (data:any) => {
      this.cards=data;
      this.cards.map(card => {
        card.votedQuestion = false;
      })
      console.log(this.cards);
    })
  }
// esta função retorna o pedido submitButton
  submitQuestion(){
    this.questionService.addQuestion(this.question).subscribe( dataQuestions => {
      console.log(dataQuestions);
      this.cards.push (dataQuestions)
      
    })
  }

  changeVote(index){
   this.cards[index].votedQuestion = !this.cards[index].votedQuestion;
   
  }

  checkIfIncludes(index){
    return this.cards[index].votedQuestion;
  }

}
