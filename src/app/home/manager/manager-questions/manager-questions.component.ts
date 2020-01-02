import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../core/services/question.service';
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-man-quest',
  templateUrl: './manager-questions.component.html',
  styleUrls: ['./manager-questions.component.scss']
})
export class ManagerQuestionsComponent implements OnInit {
  public cards = [
  ]

  conferenceId:string;
  conferenceName:string;
  lastQuestionTime:number=0;
  sortOption:string;

  constructor(private questionService:QuestionService, private activeRoute:ActivatedRoute){

    this.activeRoute.paramMap.subscribe(params=>{
      this.conferenceId=params.get('id');
     
    });
  }

  ngOnInit() {
    
    this.questionService.getConference(this.conferenceId).subscribe((conference:any)=>{
      this.conferenceName=conference.name;
    }, error=>{console.log(error)});

    this.getData();

    setInterval(()=>this.getData(),55000);
  }

  submitAnswered(index){
    this.cards[index].submitedAnswer=true;
    let question= {
      id:this.cards[index].id,
      questionContent:this.cards[index].questionContent,
      conference : {id:this.conferenceId},
      createdAt:this.cards[index].createdAt,
      answered:true
    };

    this.questionService.updateQuestion(this.cards[index].id,question).subscribe(question=>
      {console.log(question);
       this.cards.splice(index,1);
      });
  
  }

  hideQuestionsSection(){
    
    if(this.cards.length==0){
      return true;
    }
    else{return false;}
  }

  getData(){
    
    this.questionService.getAllNewQuestions(this.lastQuestionTime,this.conferenceId)
    .subscribe((questions:any[])=>{

      if(questions!=null){
        if(questions.length>0){
          this.lastQuestionTime=questions[questions.length-1].createdAt;

          let tempArray:any[]=[];
          
          questions.map(question=>{

            if(question.answered==false){

              question.lastVoteTime=0,
              question.numberOfVotes=0;
              question.submitedAnswer=false;
              tempArray.push(question);
            }
          });

          this.cards=this.cards.concat(tempArray);
        }
      }

      this.cards.map((question,index)=>{

        this.questionService.getAllNewVotes(question.lastVoteTime,question.id)
          .subscribe((votes:any[])=>{

            if(votes!=null){
              if(votes.length>0){
                
                question.numberOfVotes=votes.length; 
              }
              else if(votes.length==0){
                question.numberOfVotes=0;
              }
            }
            else{
              question.numberOfVotes=0;
            }
            if(index=this.cards.length-1){this.sort();}
            
          },error=>{console.log(error);});
      });

    },error=>{console.log(error);});
  }

  sort(){
    
    if(this.sortOption=='timeAsc'){
      
      this.cards.sort((a,b)=>{
        if (a.id<b.id){
          return -1;
        }
        else if (a.id>b.id){
          return 1;
        }
        else{
          return 0;
        }
      });
    }
    else if(this.sortOption=='timeDesc'){
      this.cards.sort((a,b)=>{
        if (a.id<b.id){
          return -1;
        }
        else if (a.id>b.id){
          return 1;
        }
        else{
          return 0;
        }
      });
      this.cards.reverse();
    }
    else if(this.sortOption=='voteAsc'){
      this.cards.sort((a,b)=>{
        if (a.numberOfVotes<b.numberOfVotes){
          return -1;
        }
        else if (a.numberOfVotes>b.numberOfVotes){
          return 1;
        }
        else{
          return 0;
        }
      });
    }
    else if(this.sortOption=='voteDesc') {
      this.cards.sort((a,b)=>{
        if (a.numberOfVotes<b.numberOfVotes){
          return -1;
        }
        else if (a.numberOfVotes>b.numberOfVotes){
          return 1;
        }
        else{
          return 0;
        }
      });
      this.cards.reverse();
    }
  }
}
