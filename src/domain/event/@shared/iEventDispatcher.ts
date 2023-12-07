import IEventHandler from "./iEventHandler";
import IEvent, { EventName } from "./iEvent";

export default interface IEventDispatcher {

    notify(event: IEvent): void;
    register(event: EventName, handler: IEventHandler): void;
    unregister(event: EventName, handler: IEventHandler): void;
    unregisterAll(): void;
}