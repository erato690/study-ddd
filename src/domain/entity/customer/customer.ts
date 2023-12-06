import Address from "./address";

export default class Customer{

    
    private id:string;
    private name:string;
    private address!:Address;
    private active:boolean;
    private rewardPoints:number;

    constructor(id: string, name: string, address?: Address, active: boolean = false, rewardPoints: number = 0) {
        this.id = id;
        this.name = name;
        this.active = active;
        this.rewardPoints = rewardPoints;
        if (address) {
            this.address = address;
        }
        this.validate();
    }


    validate():void{

        if(this.id === undefined || this.id === null || this.id === ""){
            throw new Error("Id is required");
        }
        if(this.name === undefined || this.name === null || this.name === ""){
            throw new Error("Name is required");
        }

    }
    
    getRewardPoint():number{
        return this.rewardPoints;
    }

    addRewardPoint(rewardPoint:number):void{
        this.rewardPoints += rewardPoint;
    }

    getId():string{
        return this.id;
    }

    getName():string{
        return this.name;
    }

    getAddress():Address{
        return this.address;
    }

    isActive():Boolean{
        return this.active;
    }

    
    activate():void{
        if(this.address === undefined){
            throw new Error("Address is required to activate customer");  
        }
        this.active = true;
    }

    desactivate():void{
        this.active = false;
    }

    setAddress(address:Address):void{
        this.address = address;
    }
}