import { Product } from "./product";

export class ProductOnSale {
    constructor(productOnSale: any) {
        this.idProductOnSale = productOnSale.idProductOnSale;
        this.product = productOnSale.product;
        this.catalogId = productOnSale.catalogId;
        this.title = productOnSale.title;
        this.price = productOnSale.price;
        this.saleStartDatetime = productOnSale.saleStartDatetime;
        this.saleEndDatetime = productOnSale.saleEndDatetime;
    }

    public idProductOnSale: number;
    public product: Product;
    public catalogId: number;
    public title: string;
    public price: number;
    public saleStartDatetime: string;
    public saleEndDatetime: string;
}
