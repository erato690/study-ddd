export default class Address{

    private street:String;
    private city:String;
    private state:String;
    private zipCode:String;
    private number:number;


    constructor(street:String, city:String, state:String, zipCode:String, number:number){
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.number = number;
        this.validate();
    }
    
        validate():void{
            if(this.street === null || this.street === ""){
                throw new Error("Street is required");
            }
            if(this.city === null || this.city === ""){
                throw new Error("City is required");
            }
            if(this.state === null || this.state === ""){
                throw new Error("State is required");
            }
            if(this.zipCode === null || this.zipCode === ""){
                throw new Error("ZipCode is required");
            }
            if(this.number === null || this.number === 0){
                throw new Error("Number is required");
            }
        }

    /* c8 ignore start */
    getStreet():String{
        return this.street;
    }

    getCity():String{
        return this.city;
    }
    
    getState():String{
        return this.state;
    }

    getZipCode():String{
        return this.zipCode;
    }

    getNumber():number{
        return this.number;
    }

    toString():String{
        return `${this.street}, ${this.number} - ${this.city}/${this.state} - ${this.zipCode}`;
    }
    /* c8 ignore end */
}