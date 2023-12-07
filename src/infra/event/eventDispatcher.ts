import IEvent, { EventName } from "../../domain/event/@shared/iEvent";
import IEventDispatcher from "../../domain/event/@shared/iEventDispatcher";
import IEventHandler from "../../domain/event/@shared/iEventHandler";

export default class EventDispatcher implements IEventDispatcher {
  private handlersMap: Map<EventName, IEventHandler[]>;

  constructor() {
    this.handlersMap = new Map<EventName, IEventHandler[]>();
  }

  getEventHandle(eventName: EventName): IEventHandler[] {
    const handlers = this.handlersMap.get(eventName);

    if (!handlers) {
      console.log(`No handlers registered for ${eventName}`);
      return [];
    }

    return handlers;
  }

  notify(event: IEvent): void {
    const handlers = this.handlersMap.get(event.eventName);

    if (!handlers) {
      throw new Error(`No handlers registered for ${event.eventName}`);
    }

    handlers.forEach((handler) => {
      handler.handle(event);
    });
  }

  register(event: EventName, handler: IEventHandler): void {
    const handlers = this.handlersMap.get(event);

    if (!handlers) {
      this.handlersMap.set(event, [handler]);
    } else {
      handlers.push(handler);
    }
  }

  unregister(event: EventName, handler: IEventHandler): void {
    const handlers = this.handlersMap.get(event);

    if (handlers) {
      handlers.map((h, index) => {
        if (h === handler) {
          handlers.splice(index, 1);
        }
      });
    }
  }

  unregisterAll(): void {
    this.handlersMap.clear();
  }
}
