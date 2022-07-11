import { Component, OnInit } from '@angular/core';
import { TopRatedService } from '../../services/top-rated.service';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.page.html',
  styleUrls: ['./top-rated.page.scss'],
})
export class TopRatedPage implements OnInit {

  topArr;
  isCharge: boolean = false;

  constructor(private topService: TopRatedService) { }

  ngOnInit() {
    this.gettopRated();
  }

  async gettopRated(){
    await this.topService.getTop()
    .subscribe(resp => {
      if (resp['results']) {
        this.isCharge = true;
        this.topArr = resp;
        console.log(this.topArr);
      }
    });
  }

}
