import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/common/services/api.service';
import { ApiUrls } from '../utilities/api-urls';

@Component({
  selector: 'app-term-and-cond',
  templateUrl: './term-and-cond.component.html',
  styleUrls: ['./term-and-cond.component.css'],
  
})
export class TermAndCondComponent implements OnInit {
  loading:boolean=false;
  Content:string='';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getTerms();
  }
getTerms(){
  this.loading=true;
    this.apiService.getWithoutId(ApiUrls.TERMS).subscribe(response=>{
     console.log(response);
     this.Content=response.data.content;
      this.loading=false;
    },
    err => {
      // this.messageService.add({severity:'error', summary: 'Error', detail: 'Unable to fetch', life: 3000});
      // this.loading=false;
      console.log(err)
    });
}
}
