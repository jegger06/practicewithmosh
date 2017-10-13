import { Observable } from 'rxjs/Observable';
import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { Component, OnInit } from '@angular/core';
import { PostService } from './../services/post.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];
  id;
  page;
  

  constructor(private service: PostService, private route: ActivatedRoute) { }
  
  ngOnInit() {
    // This is working fine but can be optimize like the Observable Code
    // this.route.paramMap.subscribe(param => {
    //   this.id = param.get('id');
    // });
    // // let page = this.route.snapshot.paramMap.get('id')
    // console.log(this.id);
    // this.route.queryParamMap.subscribe(queryParam => {
    //   let page = queryParam.get('page');
    //   let order = queryParam.get('order');
    //   console.log(page);
    //   console.log(order);
    // })
    
    // Working and a good practice.. tricky to setup.. Number of 'combineLatest' parameter must match the number of the 'combined' response..    
    Observable.combineLatest([
      this.route.paramMap,
      this.route.queryParamMap,
      this.route.queryParamMap
    ])
    .switchMap(combined => {
      let id = combined[0].get('id');
      let page = combined[1].get('page');
      let order = combined[2].get('order');
      
      // this.service.serviceMethodHere({ id: id, page: page, order: order })
      return this.service.getAll()
    })
    .subscribe(posts => this.posts = posts);
  }

  createPost(input: HTMLInputElement) {
    let post = {
      title: input.value
    };
    this.posts.unshift(post);

    input.value = '';

    this.service.create(post)
      .subscribe(
        (newPost) => {
          post['id'] = newPost.id;
        },
        (error: AppError) => {
          this.posts.splice(0, 1);

          if(error instanceof BadInput) {
            // this.form.setErrors(error.originalError) // If we set a reactive form (show the error on the form)
          } else {
            throw error;
          }
        }
      );
  }

  updatePost(post) {
    this.service.update(post)
      .subscribe(
        (updatedPost) => {
          console.log(updatedPost);
        }
      );
  }

  deletePost(post) {
    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.service.delete(post.id)
      .subscribe(
        null,
        (error: AppError) => {
          this.posts.splice(index, 0, post);

          if(error instanceof NotFoundError) {
            alert('This post has already been deleted');
          } else {
            throw error;
          }
        }
      );
  }


  // Code if we want to redirect a user with parameters in a URL
  // submit() {
  //   this.router.navigate(['posts'], {
  //     queryParams: { page: 1, order: 'newest' }
  //   });
  // }

}
