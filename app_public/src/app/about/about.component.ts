import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public pageContent = {
    header: {
      title: 'About Loc8r',
      strapline: ''
    },
    content: 'Loc8r was created to help people find places to sit down and get a bit of work done.\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum lorem at justo eleifend rutrum. Praesent eu justo fringilla, mattis lectus consequat, dictum magna. Vivamus eget dui elementum, eleifend velit dapibus, dignissim lorem. Phasellus in lectus nec purus tristique blandit. Fusce euismod facilisis massa, a facilisis leo condimentum in. Morbi accumsan egestas lorem ut ornare. Maecenas sed eleifend nisi, sit amet tincidunt nulla. Sed felis ante, molestie eget velit id, dapibus condimentum augue. Fusce lorem justo, ullamcorper vitae mattis ut, posuere quis neque. Morbi sit amet lectus ex. Donec quis dui lorem. Vestibulum at lectus nisl.'
  }

}
