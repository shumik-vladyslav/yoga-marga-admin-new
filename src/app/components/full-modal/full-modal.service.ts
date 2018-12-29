import { Component } from '@angular/core';
import { Injectable, TemplateRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class FullModalService {
  // Create modal emitter
  modalOnCreate: Subject<any>;
  // On close emitter
  modalOnDestroy: Subject<void>;
  
  data;
  
  constructor() {
    this.modalOnCreate = new Subject<any>();
    this.modalOnDestroy = new Subject<void>();
  }

  /**
   * Show modal
   * @param tmpl
   * @param buttons
   * @return {Observable<"close" | "back">}
   */
  createModal(cmp: any, object: any): void {
    this.modalOnCreate.next({
      component : cmp,
      object: object});
      this.data = object;
  }

  /**
   * Hide modal
   */
  destroyModal(): void {
    this.modalOnDestroy.next(undefined);
  }
}
