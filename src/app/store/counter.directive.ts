/**In this section, I am going to create a custom directive so that I don’t have to generate an array full of
numbers to create the page navigation buttons */
import {
    Directive, ViewContainerRef, TemplateRef, Input, Attribute, SimpleChanges
} from "@angular/core";
   
@Directive({
  selector: '[counterOf]',
})
export class CounterDirective {

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<Object>
  ) {}


  @Input('counterOf')
  counter: number;

  ngOnChanges(changes: SimpleChanges) {

    this.container.clear();

    for (let i = 0; i < this.counter; i++) {

      this.container.createEmbeddedView(
        this.template,
        new CounterDirectiveContext(i + 1)
      );

    }
  }
}

class CounterDirectiveContext {
  constructor(public $implicit: any) {}
}

/**
 * This is an example of a structural directive, which is described in detail in Chapter 16. This directive
is applied to elements through a counter property and relies on special features that Angular provides
for creating content repeatedly, just like the built-in ngFor directive. In this case, rather than yield each
object in a collection, the custom directive yields a series of numbers that can be used to create the page
navigation buttons.

NO ENTIENDO MUY BIEN PERO ESTA CREANDO OTRA FORMA PARA LA PAGINACION.

 This directive deletes all the content it has created and starts again when the number of pages
changes. This can be an expensive process in more complex directives, and I explain how to improve
performance in Chapter
 */