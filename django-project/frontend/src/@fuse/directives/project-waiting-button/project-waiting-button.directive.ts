import {
    Directive,
    ElementRef,
    OnInit,
    Renderer2,
    ComponentFactoryResolver,
    ViewContainerRef,
    Input,
    OnChanges,
    HostBinding, HostListener
} from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';

@Directive({
    selector: '[projectWaitingButton]'
})
export class ProjectWaitingButtonDirective implements OnInit, OnChanges {
    private spinner: MatSpinner;
    @Input() projectWaitingButton: boolean;
    click = false;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private componentFactoryResolver: ComponentFactoryResolver,
        public vcRef: ViewContainerRef
    ) {
    }

    ngOnInit(): void {
        // Create the spinner
        const factory = this.componentFactoryResolver.resolveComponentFactory(
            MatSpinner
        );
        const componentRef = this.vcRef.createComponent(factory);
        this.spinner = componentRef.instance;

        // Configure the spinner
        this.spinner.strokeWidth = 3;
        this.spinner.diameter = 24;

        // Apply new styles
        const span: ElementRef = this.el.nativeElement.querySelector(
            '.mat-button-wrapper'
        );
        this.renderer.setStyle(span, 'display', 'inline-flex');
        this.renderer.setStyle(span, 'align-items', 'center');
        this.renderer.setStyle(span, 'justify-content', 'center');
        this.renderer.setStyle(span, 'line-height', 'inherit');
        this.renderer.setStyle(span, 'width', '100%');
        this.renderer.setStyle(
            this.spinner._elementRef.nativeElement,
            'margin-top',
            '0px'
        );
        this.renderer.setStyle(
            this.spinner._elementRef.nativeElement,
            'margin-left',
            '5px'
        );

        this.renderer.setStyle(
            this.spinner._elementRef.nativeElement, 'display', 'none'
        );

        // Append the spinner
        this.renderer.appendChild(
            this.el.nativeElement.firstChild,
            this.spinner._elementRef.nativeElement
        );
    }

    ngOnChanges(): void {
        if (this.spinner && this.click) {
            this.renderer.setStyle(
                this.spinner._elementRef.nativeElement,
                'display',
                this.projectWaitingButton ? 'block' : 'none'
            );
            if (this.projectWaitingButton) {
                this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
            }else{
                this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
            }
            this.click = this.projectWaitingButton;
        }

    }

    @HostListener('click', ['$event']) onClick($event){
        this.click = true;
    }
}
