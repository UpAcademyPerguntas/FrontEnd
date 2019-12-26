import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class QuestionService {
    
    constructor(
        private http: HttpClient,
    ) {}

    addQuestion(question) {
        return this.http.post(`${environment.apiUrl}/question`, question);
    }

    getAll(){
        return this.http.get(`${environment.apiUrl}/question/getAll`);
    }

    getVoteCountByQuestionId(id:number){
        return this.http.get(`${environment.apiUrl}/vote/count/question/`+id)
    }

   


  }