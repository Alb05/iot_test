import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-start-time',
  templateUrl: './start-time.component.html',
  styleUrls: ['./start-time.component.css']
})
export class StartTimeComponent /* implements OnInit */{
  
  // startTime: Date | undefined;

  // constructor(private dashboardService: DashboardService) { }

  // ngOnInit() {
  //   this.getStartTime();
  // }

  // getStartTime() {
  //   this.dashboardService.getStartTime()
  //     .subscribe((value: Date) => {
  //       this.startTime = value;
  //     });
  // }
}
