import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
images:string[]=[
  'assets/images/Imagen1.jpg',
  'assets/images/Imagen2.jpg',
  'assets/images/Imagen3.jpg',
  ]
  
  currentIndex=signal<number>(0);
  interval!:any;

  ngOnInit(){
    this.interval=setInterval(()=>{
       this.currentIndex.update(value=> (value+1)%this.images.length);
    }, 4000);
  }

  ngOnDestroy(){
    clearInterval(this.interval);
  }
}
