import {
  ApplicationRef, ComponentFactoryResolver, Injector,
  ComponentRef, Type, EmbeddedViewRef, Injectable
} from '@angular/core';

@Injectable()
export class ComponentLauncher {

  private _refs: ComponentRef<any>[] = [];

  constructor(
    private aplicationRef: ApplicationRef,
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }

  /**
   * Creates the specified component dynamically.
   * @param component The component class.
   * @param props The optional component properties.
   * @param strict Restore dynamic component already created.
   * @returns ComponentRef<T>
   */
  create<T>(component: Type<T>, props: { [key: string]: any } = {}, strict: boolean = false): ComponentRef<T> {
    // Prepare factory, reference, component element and component root element
    const factory = this.resolver.resolveComponentFactory(component);
    const newRef = factory.create(this.injector);
    const el = (newRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    const rootEl = (this.aplicationRef.components[0].hostView as EmbeddedViewRef<any>).rootNodes[0] as Element;
    // Properties passed to Component
    Object.keys(props || {}).forEach(prop => newRef.instance[prop] = props[prop]);
    // Attach & Instance Component
    setTimeout(() => {
      this.aplicationRef.attachView(newRef.hostView);
      newRef.onDestroy(() => this.aplicationRef.detachView(newRef.hostView));
      rootEl.appendChild(el);
    });

    if (strict) {
      // Search component if exists into refs
      const oldRef = this._refs.find(ref =>
        (ref.componentType === newRef.componentType) &&
        (Object.keys(newRef.instance) === Object.keys(ref.instance))
      );
      // If exists destroy newRef and returned existent ref
      if (oldRef !== undefined) {
        setTimeout(() => newRef.destroy());
        this._refs.push(oldRef);
        return oldRef;
      }
    }

    this._refs.push(newRef);
    return newRef;
  }

  /**
   * It deletes from memory, from the DOM and sets the component reference to null if it exists.
   * @param componentRef The component ref.
   * @returns void
   */
  destroy(componentRef: ComponentRef<any>): void {
    if (componentRef) {
      // Remove ref of refs if exists
      this._refs = this._refs.filter(ref => ref !== componentRef);
      // Destroy ref
      setTimeout(() => {
        componentRef.destroy();
        componentRef = null;
      }, 250);
    }
  }
}
