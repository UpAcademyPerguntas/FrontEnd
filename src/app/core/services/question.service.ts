import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class QuestionService {
    
    constructor(
        private http: HttpClient,
    ) {}

    addQuestion(question) {
        return this.http.post('http://localhost:8888/QuestionsAPI/api/question', question);
    }

    getAll(){
        return this.http.get('http://localhost:8888/QuestionsAPI/api/question/getAll');
    }

  }