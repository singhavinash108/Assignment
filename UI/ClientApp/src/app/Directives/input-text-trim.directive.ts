import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputTextTrim]'
})
export class InputTextTrimDirective {

  constructor(private el: ElementRef) { }

  @HostListener('blur') blur() {
    this.el.nativeElement.value = this.el.nativeElement.value.trim();
  }

}
