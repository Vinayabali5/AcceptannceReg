import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentComponent } from './student/student.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ApplicationConfirmationComponent } from './application-confirmation/application-confirmation.component';
import { ParentComponent } from './parent/parent.component';

const routes: Routes = [
  { path: 'link', component: StudentComponent },
  { path: 'parent', component: ParentComponent },
  { path: 'application-confirmation', component: ApplicationConfirmationComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [StudentComponent, PageNotFoundComponent]