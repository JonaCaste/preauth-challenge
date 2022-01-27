export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

interface Product{
    code: number;
    isConjured: number;
    isExpired: boolean;
    isDevalued: boolean;
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    defineProduct(name: string){
        let productCode:number = 0;
        //"false" = 1
        let isConjured: number = 1;

        //If product is conjured, isConjured = 2
        if(name.indexOf("Conjured") != -1) isConjured = 2;
        
        if(name == "Aged Brie") productCode = 1;
        if(name == "Sulfuras, Hand of Ragnaros") productCode = 2;
        if(name == "Backstage passes to a TAFKAL80ETC concert") productCode = 3;

        return [productCode, isConjured];
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {

            let [code, isConjured] = this.defineProduct(this.items[i].name);

            let product: Product = {
                code,
                isConjured,
                isExpired: false,
                isDevalued: false,
            }

            //is expired when sellIn is 0
            if(this.items[i].sellIn <= 0) product.isExpired = true;
            //is devalued when quality is 0
            if(this.items[i].quality <= 0) product.isDevalued = true;

            switch(product.code){

                //Normal product
                case 0:
                    if(!product.isExpired){
                        this.items[i].sellIn--;
                        if(!product.isDevalued) this.items[i].quality -= (1 * product.isConjured);
                    }
                    else{
                        this.items[i].quality -= (2 * product.isConjured);
                    }
                    break;

                //Aged Brie
                case 1:
                    if(!product.isExpired){
                        this.items[i].sellIn--;
                        if(this.items[i].quality < 50) this.items[i].quality += (1 * product.isConjured);
                    }

                //Sulfuras, Hand of Ragnaros
                case 2:
                    this.items[i].quality = 80;
                    break;

                //Backstage passes to a TAFKAL80ETC concert
                case 3:
                    if(!product.isExpired){
                        this.items[i].sellIn--;
                        if(this.items[i].sellIn == 0){
                            if(this.items[i].quality < 50) this.items[i].quality = 0;
                            break;
                        }
                        if(this.items[i].sellIn <= 5){
                            if(this.items[i].quality < 50) this.items[i].quality += (3 * product.isConjured);
                            break;
                        }
                        if(this.items[i].sellIn <= 10){
                            if(this.items[i].quality < 50) this.items[i].quality += (2 * product.isConjured);
                            break;
                        }
                    }

            }

        }

        return this.items;
    }
}

//old code
/*
    if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1
            }
        }
    } else {
        if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
            if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                if (this.items[i].sellIn < 11) {
                    if (this.items[i].quality < 50) {
                        this.items[i].quality = this.items[i].quality + 1
                    }
                }
                if (this.items[i].sellIn < 6) {
                    if (this.items[i].quality < 50) {
                        this.items[i].quality = this.items[i].quality + 1
                    }
                }
            }
        }
    }
    if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
    }
    if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
            if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                if (this.items[i].quality > 0) {
                    if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                        this.items[i].quality = this.items[i].quality - 1
                    }
                }
            } else {
                this.items[i].quality = this.items[i].quality - this.items[i].quality
            }
        } else {
            if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
            }
        }
    }
*/
