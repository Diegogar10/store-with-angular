import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})

/*
@Input
-----------------------------
Con este decorador logramos pasar un valor desde
el padre hasta el hijo, si el valor no esta presente
en el padre, el valor de img en este caso asigna el
valor por defecto.
*/


export class ImgComponent implements OnInit, OnChanges, OnDestroy{
  img = 'Valor inicial';
  /* @Input() img: string = 'Valor inicial'; */
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    //más codigo, cuando suceda este cambio especifico
  }
  @Output() loaded = new EventEmitter<string>();
  defaultUrl = '../../../assets/default.png';
  counter = 0;

  constructor(){
    //before render
    // NO async -- once time
    console.log('constructo');
  }

  ngOnChanges() {
    // before - during render
    // changes iputs -- multiples times
    console.log('ngOnChanges', this.img);
  }

  ngOnInit(): void {
    // before render
    // async - fetch -- once time
    console.log('ngOnInit');
    /*this.counterFn = setInterval(()=>{
      this.counter++;
      console.log('run counter', this.counter);
    }, 1000);*/
  }

  ngOnDestroy(): void {
    /*clearInterval(this.counterFn);*/
    console.log('dejado');
  }

  onError() {
    this.img = this.defaultUrl;
  }
  onLoaded(){
    console.log('cargo Hijo');
    this.loaded.emit(this.img);
  }
}
