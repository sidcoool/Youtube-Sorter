import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { apikey } from '../../environment.prod'
import { video } from '../../environment.prod'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  constructor(private http: HttpClient) { }

  search: boolean = true
  n_search = ""
  p_search = ""
  videos: video[] = []

  //videos: {id:string, pic:string} = []

  searchTrue = () => {
    this.search = true
  }

  searchFalse = () => {
    this.search = false
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'text/html',
    })
  };

  nsearch = () => {
    console.log(this.n_search)

    this.http.get<any>(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.n_search}&type=video&key=${apikey}`)
      .subscribe((data) => {
        console.log(data)
        this.videos = []

        for (let item of data.items) {


          this.http.get<any>(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${item.id.videoId}&key=${apikey}`)
            .subscribe((data) => {
              //data.item[0].statistics.likeCount
              this.videos.push({
                link: item.id.videoId,
                like: data.items[0].statistics.likeCount,
                pic: item.snippet.thumbnails.medium.url,
                title: item.snippet.title
              })
            })
        }
      })
  }
  //IQIZqpI1-8g
  sortByLikes = () => {
    this.videos.sort((a: video, b: video) => b.like - a.like)
  }

  linkOpen = (link) => {
    window.open(`https://youtube.com/watch?v=${link}`)
  }

  downloadVideo = (link) => {
    window.open(`https://ysapp.herokuapp.com/download/url?a=https://www.youtube.com/watch?v=${link}`, '_blank');
  }

  psearch = () => {
    console.log(this.p_search)
  }
}
