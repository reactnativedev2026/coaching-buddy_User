type OrderType = {
    id: string;
    status: string;
    product: {
        name: string;
        price: string;
        sellingPrice: string;
        discount: string;
        images: string[];
    };
    store: {
        name: string;
        address: {
            state: string;
            city: string;
            area: string;
            nearBy: string;
            pincode: string;
        };
        comments: {
            id: string;
            rating: number;
        }[];
    };
};

export default OrderType;
