import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/services';
import { FormGroup, FormControl } from '@angular/forms';
import { QuestionService } from '../core/services/question.service';
import { timeInterval } from 'rxjs/operators';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  
  public cards = [
  ]

  conferenceId:string;
  conferenceName;

  lastQuestionTime:number=0;
  lastAnsweredQuestionTime:number=0;

  machineId:string;
  submitQuestionDisabled=false;
  sortOption:string;

  question= {
    questionContent:'',
    conference : {id:this.conferenceId},
    answered:false,
    answeredAt:0
  };

  constructor(private questionService:QuestionService, private activeRoute:ActivatedRoute){

    this.activeRoute.paramMap.subscribe(params=>{
      this.conferenceId=params.get('id');
      this.question.conference.id=this.conferenceId;
    });
  }

  ngOnInit() {
    
    this.questionService.getConference(this.conferenceId).subscribe((conference:any)=>{
      this.conferenceName=conference.name;
    }, error=>{console.log(error)});

    if (localStorage.getItem('machineId')==null ||localStorage.getItem('machineId')==undefined){
        
        this.machineId=Date.now().toString();
        localStorage.setItem('machineId',this.machineId);
    }
    else{
      this.machineId=localStorage.getItem('machineId');
    }
    this.getData();
    this.correctData();

    setInterval(()=>this.getData(),45000);
    setInterval(()=>this.correctData(),50000);
  }

  submitQuestion(){
    
    this.submitQuestionDisabled=true;

    this.questionService.addQuestion(this.question).subscribe((dataQuestion:any) => {

        dataQuestion.lastVoteTime=0,
        dataQuestion.votedQuestion=false,
        dataQuestion.voteId=0,
        dataQuestion.numberOfVotes=0;
        dataQuestion.submitVoteDisabled=false;

        this.cards.push(dataQuestion);
        this.question.questionContent='';
        this.submitQuestionDisabled=false;
        this.sort();
    },error=>{
      console.log(error);
      this.question.questionContent='';
      this.submitQuestionDisabled=false;}); 
  }

  changeVote(index){
   
    this.cards[index].submitVoteDisabled=true;
   
    if(this.cards[index].votedQuestion==false){
    
    let vote={
      question:{id:this.cards[index].id},
      machineId:this.machineId
    }

    this.questionService.addVote(vote).subscribe((aVote:any)=>{
      this.cards[index].votedQuestion=true;
      this.cards[index].voteId=aVote.id;
      this.cards[index].numberOfVotes++;
      this.cards[index].submitVoteDisabled=false;
      this.sort();
    }, error=>{console.log(error);
  
      this.cards[index].submitVoteDisabled=false;
    });
   }
   else{
     
     this.questionService.deleteVote(this.cards[index].voteId)
      .subscribe(result=>{console.log(result);
        
        this.cards[index].votedQuestion=false;
        this.cards[index].numberOfVotes--;
        this.cards[index].voteId=0;
        this.cards[index].submitVoteDisabled=false;
        this.sort();
        
      }, error=>{console.log(error);
  
        this.cards[index].submitVoteDisabled=false;
      });
   }  
  }

  checkIfIncludes(index){
    return this.cards[index].votedQuestion;
  }

  checkSubmitVoteDisabled(index){
    return this.cards[index].submitVoteDisabled;
  }

  hideQuestionsSection(){
    
    if(this.cards.length==0){
      return true;
    }
    else{return false;}
  }

  getData(){
    console.log("getData activated");
    this.questionService.getAllNewQuestions(this.lastQuestionTime,this.conferenceId)
    .subscribe((questions:any[])=>{

      if(questions!=null){
        if(questions.length>0){
          this.lastQuestionTime=questions[questions.length-1].createdAt;

          let tempArray:any[]=[];
          
          questions.forEach(question=>{

            let result=this.cards.find(card=>{return question.id==card.id;})
            
            if(result==undefined && question.answered==false){
              question.votedQuestion=false,
              question.voteId=0,
              question.numberOfVotes=0;
              question.submitVoteDisabled=false;
              tempArray.push(question);
            }
          });

          this.cards=this.cards.concat(tempArray);
        }
      }

      this.cards.map((question,index)=>{

        this.questionService.getAllVotes(question.id)
          .subscribe((votes:any[])=>{

            if(votes!=null){
              if(votes.length>0){
                
                question.numberOfVotes=votes.length;
                let found=false;            
                for(let i=0;i<votes.length;i++){
                    
                  if(votes[i].machineId==this.machineId){
                    found=true;
                    question.votedQuestion=true;
                    question.voteId=votes[i].id;
                    break;
                  }
                }
                if(found==false){
                  question.votedQuestion=false;
                  question.voteId=0;
                }
              }
              else if(votes.length==0){
                question.numberOfVotes=0;
                question.votedQuestion=false;
                question.voteId=0;
  
              }
            }
            else{
              question.numberOfVotes=0;
              question.votedQuestion=false;
              question.voteId=0;
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

  correctData(){
    console.log('correctData() activated')
    this.questionService.getAllNewAnsweredQuestions(this.lastAnsweredQuestionTime,this.conferenceId)
      .subscribe((questions:any[])=>{

        if(questions!=null){
          if(questions.length>0){
        
            this.lastAnsweredQuestionTime=questions[questions.length-1].answeredAt;
            let index;

            questions.forEach(question=>{
              index=this.cards.findIndex(card=>{return card.id==question.id;});
              
              if(index!=-1){this.cards.splice(index,1);} 
            });
          }
        }
      },error=>{console.log(error)});
  }
}
