class Phone {
    constructor(data) {
        this.phone = data.phone;
        this.withMemory = data.withMemory;
        this.countPhones = data.countPhones;
        this.price = data.price;
    }

    static withMemory(price) {
        return price + 1230;
    }

    static calculateSum(phoneData) {
        let price = phoneData.phone.price;

        if (!phoneData.countPhones) {
            return 0;
        }

        if (phoneData.withMemory) {
            price = Phone.withMemory(price);
        }

        price *= phoneData.countPhones;

        return price;
    }

}
