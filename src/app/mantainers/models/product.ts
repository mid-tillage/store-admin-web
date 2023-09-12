export class Product {
    constructor(product: any) {
        this.name = product.name;
        this.description = product.description;
        this.enterpriseId = product.enterpriseId;
    }

    private name: string;
    private description: string;
    private enterpriseId: string;
}
