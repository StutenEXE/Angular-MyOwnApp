import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-likebutton',
  templateUrl: './likebutton.component.html',
  styleUrls: ['./likebutton.component.css'],
  animations: [
    trigger('likingAnim', [
      state('notLiked', style({
        fill: 'transparent'
      })),
      state('liked', style({
        fill: '#ff2581'
      })),
      transition('notLiked => liked', [
        animate('400ms', keyframes([
            style({ fill: "transparent", transform: "scale(1)", offset: 0.25 }),
            style({ fill: "#ff7eb4", transform: "scale(1.1)", opacity: "1", offset: 0.5 }),
            style({ opacity: "1", offset: 0.75 }),
            style({ transform: "scale(2.5)", opacity: "0", offset: 1 })
          ]))
      ]),
      transition('liked => notLiked', [
        animate('400ms')
      ]),
    ])
  ]
})
export class LikebuttonComponent {
  isLiked: boolean = false;

  handleClick(event: any): void {
    console.log(this.isLiked);
    this.isLiked = !this.isLiked;
    event.target.classList.toggle(".isliked");
  }
}
