import { CoursesService } from './courses.service';
import { Component } from '@angular/core';

@Component({
    selector: 'courses',
    template: `
    <h2>{{ title }}</h2>
    <ul>
        <li *ngFor="let course of courses; first as firstEl; index as i" [class.firstEl]="firstEl">{{ i }} {{ course }}</li>
    </ul>
    <p [innerHTML]="text | summary:10"></p>
    `
})

export class CoursesComponent {
    title = 'List of courses';
    courses;
    text = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae, inventore rem sequi doloremque quia vero facere deleniti magnam voluptate, eum est. Inventore ea reprehenderit ratione optio earum quas, culpa necessitatibus praesentium, ipsa assumenda, reiciendis fuga atque error provident et in? Labore vero, ullam odit similique ipsum repellendus eos molestias incidunt soluta beatae est consequuntur velit a assumenda consequatur adipisci nam. Expedita dolor ipsa cum porro maiores molestias excepturi similique, nisi placeat voluptate illum earum nobis quam eum optio temporibus dignissimos? Saepe numquam tenetur commodi delectus. Quae asperiores at assumenda repellat tempora exercitationem neque reiciendis sapiente, necessitatibus voluptate optio corporis, ducimus odio animi incidunt quidem sequi minima, harum iste inventore. Repellat delectus, nulla aperiam aliquid asperiores deleniti recusandae ea beatae illum debitis blanditiis magni reiciendis dolor expedita ipsa vero, amet suscipit! Repudiandae perferendis perspiciatis tempora recusandae neque commodi harum illo beatae eveniet. Dignissimos vitae facere laboriosam? Consequuntur distinctio, error obcaecati ut porro odio dolore, corporis pariatur perspiciatis quos tempora minima quidem mollitia magni velit! Nihil fugiat dicta repudiandae. Doloribus fugit sint possimus autem vel totam eveniet facere, quidem laborum, quo illo explicabo consequuntur molestiae accusamus dignissimos! A modi dicta voluptatibus voluptates deserunt ullam voluptate officiis quo earum, culpa dolorum ut accusantium.';

    constructor(private coursesService: CoursesService) {
        this.courses = this.coursesService.getCourses();
    }
}