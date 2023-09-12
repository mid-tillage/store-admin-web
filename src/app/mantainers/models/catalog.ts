export class Catalog {

    constructor(catalog: any) {
        this.idProductCatalog = catalog.idProductCatalog;
        this.name = catalog.name;
    }

    public idProductCatalog: number;
    public name: string;
}
