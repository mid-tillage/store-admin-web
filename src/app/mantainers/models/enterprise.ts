export class Enterprise {
    
    constructor(enterprise: any) {
        this.id = enterprise.id;
        this.name = enterprise.name;
    }

    private id: number;
    private name: string;
}
