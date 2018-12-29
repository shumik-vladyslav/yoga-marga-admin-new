import { animate, query, state, style, transition, trigger } from '@angular/animations';


export const slideDown = trigger('slideDown', [
  state('void', style({transform: 'scaleY(0)'})),
  state('*', style({transform: 'scaleY(1)'})),
  transition('void => *', [
    query('.fade', style({opacity: 0})),
    animate('.15s ease-in-out'),
    query('.fade', [animate('.15s', style({opacity: 1}))]),
  ]),
  transition('* => void', [
    query('.fade', [animate(150, style({opacity: 0}))]),
    animate('.15s ease-out'),
  ])
]);
