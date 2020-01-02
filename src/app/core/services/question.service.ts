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

    updateQuestion(questionId,question){
        return this.http.put(`${environment.apiUrl}/question/`+questionId,question);
    }

    getAll(){
        return this.http.get(`${environment.apiUrl}/question/getAll`);
    }

    getAllNewQuestions(lastQuestionTime,conferenceId){
        return this.http.get(`${environment.apiUrl}/question/conference/`+conferenceId+`/time/`+lastQuestionTime);
    }

    getAllNewAnsweredQuestions(lastAnsweredQuestionTime,conferenceId){
        return this.http.get(`${environment.apiUrl}/question/conference/`+conferenceId+`/answeredQuestTime/`+lastAnsweredQuestionTime);
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

    getAllVotes(questionId){
        return this.http.get(`${environment.apiUrl}/vote/getAll/question/`+questionId);
    }

    deleteVote(voteId){
        return this.http.delete(`${environment.apiUrl}/vote/`+voteId, {responseType : "text"});
    }

    getConference(conferenceId){
        return this.http.get(`${environment.apiUrl}/conference/`+conferenceId);
    }

  }