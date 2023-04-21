import { Injectable } from '@angular/core';
import { DashboardModule } from './dashboard.module';
import { HttpClient } from '@angular/common/http';
import { ILog } from './models/ILog';

@Injectable({
  providedIn: DashboardModule
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getStartTime() {
    return this.http.get<Date>('/brewery/api/starttime');
  }

  getTempLog() {
    return this.http.get<ILog>('/brewery/api/temp/log')
  }

  getHumLog() {
    return this.http.get<ILog>('/brewery/api/hum/log')
  }
}
