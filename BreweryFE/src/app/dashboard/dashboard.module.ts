import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CurrentTemperatureComponent } from './current-temperature/current-temperature.component';
import { CurrentHumidityComponent } from './current-humidity/current-humidity.component';
import { StartTimeComponent } from './start-time/start-time.component';
import { BiasComponent } from './bias/bias.component';
import { TempHumChartComponent } from './temp-hum-chart/temp-hum-chart.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CurrentTemperatureComponent,
    CurrentHumidityComponent,
    StartTimeComponent,
    BiasComponent,
    TempHumChartComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
