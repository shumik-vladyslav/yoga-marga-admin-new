import { Component, OnDestroy, OnInit, Renderer2, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Subscription } from 'rxjs/index';

import { fade } from '../../animations/fade.animation';
import { FullModalService } from './full-modal.service';

@Component({
  selector: 'app-full-modal',
  templateUrl: './full-modal.component.html',
  styleUrls: ['./full-modal.component.css'],
  animations: [ fade ]
})
export class FullModalComponent implements OnInit, OnDestroy {
  // Is show modal flag
  show: boolean;
  // Container for template
  container: ViewContainerRef;
  // Store for all subscriptions
  private $subscriptions: Subscription;

  constructor(public modalService: FullModalService, private renderer: Renderer2,
    private componentFactoryResolver: ComponentFactoryResolver) {
    this.$subscriptions = new Subscription();
  }

  /**
   * Component init handler
   */
  ngOnInit(): void {
    // Subscribe to create modal
    const sub1 = this.modalService.modalOnCreate.subscribe(params => {
      const tmpl = params.component;
      const object = params.object;
      console.log(object);
      // Show modal
      this.show = true;

      // Disable body scroll bars
      this.renderer.setStyle(document.body, 'overflow', 'hidden');

      // Add template
      setTimeout(() => {
        this.container.clear();
        // this.container.createEmbeddedView(tmpl);
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(tmpl);

        this.container.createComponent(componentFactory);
      });
    });
    // Subscribe to destroy modal
    const sub2 = this.modalService.modalOnDestroy.subscribe(() => {
      // Show modal
      this.show = false;

      // Enable body scroll bars
      this.renderer.setStyle(document.body, 'overflow', 'auto');
    });

    this.$subscriptions.add(sub1).add(sub2);
  }

  /**
   * Component destroy handler
   */
  ngOnDestroy(): void {
    this.$subscriptions.unsubscribe();
  }

  /**
   * Dynamic get container for modal content
   * @param {ViewContainerRef} container
   */
  @ViewChild('container', {read: ViewContainerRef})
  set containerSetter(container: ViewContainerRef) {
    this.container = container;
  }

  closeModal(event: MouseEvent){
    event.stopPropagation();
    this.modalService.destroyModal();
  }
}
