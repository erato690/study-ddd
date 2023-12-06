export default class Product{

    
 


    private id:string;
    private _name:string;
    private price:number;

    constructor(id:string,name:string,price:number){
        this.id = id;
        this._name = name;
        this.price = price;
        this.validate();
    }

    public validate():void{
        if(this.id === undefined || this.id === null || this.id === ""){
            throw new Error("Id is required");
        }
        if(this._name === undefined || this._name === null || this._name === ""){
            throw new Error("Name is required");
        }
        if(this.price === undefined || this.price === null || this.price <= -1){
            throw new Error("Price is required");
        }
    }

    public getId():string{
        return this.id;
    }

    public getName():string{
        return this._name;
    }

    public getPrice():number{
        return this.price;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changePrice(price: number) {
        this.price = price;
        this.validate();
    }
}