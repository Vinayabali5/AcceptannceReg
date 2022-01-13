import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderModule } from 'ngx-order-pipe';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationConfirmationComponent } from './application-confirmation/application-confirmation.component';
import { EthnicitySelectionComponent } from './controls/ethnicity-selection/ethnicity-selection.component';
import { LLDDCategorySelectorComponent } from './controls/lldd-category-selector/lldd-category-selector.component';
import { LLDDHealthProblemSelectionComponent } from './controls/lldd-health-problem-selection/lldd-health-problem-selection.component';
import { materialModules } from './material';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ParentComponent } from './parent/parent.component';
import { AppConfigService } from './service/app-config.service';
import { StudentDetailsComponent } from './student-details/student-details.component';


const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    StudentDetailsComponent,
    PageNotFoundComponent,
    ApplicationConfirmationComponent,
    EthnicitySelectionComponent,
    LLDDHealthProblemSelectionComponent,
    LLDDCategorySelectorComponent,
    ParentComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    OrderModule,
    materialModules
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
