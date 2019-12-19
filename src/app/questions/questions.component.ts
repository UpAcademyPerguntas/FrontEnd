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
    {
      msg: "qwerty asdfgh zxcvb"
    },
    {
      msg: "qwerty  zxcvb"
    }
  ]
  // criar o objeto para por no ng model
  //criaçao  da variavel
    question = {
      questionContent:'',
      conference : {id:1}
    };

  constructor(private questionService:QuestionService){}

  ngOnInit() {
    this.questionService.getAll().subscribe( data => {
      console.log(data);
      
    })
  }
// esta função retorna o pedido
  submitQuestion(){
    this.questionService.addQuestion(this.question).subscribe( data => {
      console.log(data);
      
    })
  }

}
