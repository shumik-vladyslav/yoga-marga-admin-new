import { animate, state, style, transition, trigger } from '@angular/animations';

export const slideLeft = trigger('slideLeft', [
  state('in', style({transform: 'translateX(0)'})),
  transition('void => *', [
    style({
      transform: 'translateX(100%)',
      opacity: '0'
    }),
    animate(300)
  ]),
  transition('* => void', [
    animate(300, style({
      transform: 'translateX(-100%)',
      opacity: '0'
    }))
  ])
]);

export const slideRight = trigger('slideRight', [
  transition('void => *', [
    style({
      transform: 'translateX(-100%)',
      opacity: '0'
    }),
    animate(300)
  ]),
  transition('* => void', [
    animate(300, style({
      transform: 'translateX(100%)',
      opacity: '0'
    }))
  ])
]);
