import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];
  private url = 'http://jsonplaceholder.typicode.com/posts';
  constructor(private service: PostService) {
  }
  ngOnInit() {
    //components
    this.service.getPosts().subscribe(response => {
      this.posts = response.json();
    }, error => {
      alert('An unexpected error occured.');
      // use TOAST if possible, less annoying and dissappear
      console.log(error);
    }) ;
        // subscription function
        // response.json -> gives an array of posts
      };
  // get -> get Data
  // Post -> Create Data
  // Put -> Update Data
  // Delete -> Delete Data
  createPost(input: HTMLInputElement) {
    let post = {
      title: input.value
    };
    input.value = '';
    this.service.createPost(post).subscribe(response => {
      post['id'] = response.json().id;
      this.posts.splice(0, 0, post);
      console.log(response.json());
    }, (error: Response) => {
      if (error.status === 400) {
        // this.form.setErrors(error.json());
      } else {
        alert('Unexpected error occured');
        console.log(error);
      }
    });
  }
  updatePost(post) {
    // this.http.put
    // this.http.patch: updates only properties that need to be updated
    // this.http.patch(this.url, JSON.stringify( {isRead: true }))
    // this.http.put(this.url, JSON.stringify(post) -> mostly supported, but patch is good!

    this.service.updatePost(post).subscribe( response => {
      console.log(response.json());
    }, error => {
      alert('unexpected error occured');
      console.log(error);
    });
  }

  deletePost(post) {
   this.service.deletePost(post.id).subscribe( response => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
    }, (error: Response) => {
     if (error.status === 404) {
       alert('This post has already been deleted');
     } else {
       alert('unexpected error occured');
       console.log(error);
     }
   });
  }

}
