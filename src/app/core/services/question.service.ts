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

    getAllNewQuestions(lastQuestionTime,conferenceId){
        return this.http.get(`${environment.apiUrl}/question/conference/`+conferenceId+`/time/`+lastQuestionTime);
    }

    deleteQuestion(questionId){
        return this.http.delete(`${environment.apiUrl}/question/`+questionId);
    }

    addVote(vote){
        return this.http.post(`${environment.apiUrl}/vote`, vote);
    }

    getAllNewVotes(lastVoteTime,questionId){
        return this.http.get(`${environment.apiUrl}/vote/question/`+questionId+`/time/`+lastVoteTime);
    }

    deleteVote(voteId){
        return this.http.delete(`${environment.apiUrl}/vote/`+voteId, {responseType : "text"});
    }

  }