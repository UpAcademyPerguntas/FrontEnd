import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/services';
import { FormGroup, FormControl } from '@angular/forms';

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

  
  ngOnInit() {
  }

}
