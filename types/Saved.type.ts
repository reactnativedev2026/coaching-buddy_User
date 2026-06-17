type SavedType = {
    id: string;
    name: string;
    image: string;
    address: {
        state: string;
        city: string;
        area: string;
        nearBy: string;
        pincode: string;
    };
    categoryName: string;
};

export default SavedType;
