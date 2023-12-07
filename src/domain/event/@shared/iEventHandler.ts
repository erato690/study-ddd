import IEvent from "./iEvent";

export default interface  IEventHandler{

    handle(event:IEvent):void;
}