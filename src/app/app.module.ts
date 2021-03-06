import { CoursesService } from './courses.service';
import { CoursesComponent } from './courses.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { PostService } from './services/post.service';
import { AppErrorHandler } from './common/app-error-handler';

import { AppComponent } from './app.component';
import { SummaryPipe } from './summary.pipe';
import { InputFormatDirective } from './input-format.directive';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { NewCourseFormComponent } from './new-course-form/new-course-form.component';
import { PostsComponent } from './posts/posts.component';
import { NavbarComponent } from './navbar/navbar.component';

const appRoutes = [
  { path: '',
    component: ContactFormComponent
  },
  { path: 'signup',
    component: SignupFormComponent
  },
  { path: 'newcourse',
    component: NewCourseFormComponent
  },
  {
    path: 'posts/:id',
    component: PostsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    SummaryPipe,
    InputFormatDirective,
    ContactFormComponent,
    SignupFormComponent,
    NewCourseFormComponent,
    PostsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [
    CoursesService,
    PostService,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
