type CollegeType = {
    id: string;
    name: string;
    amountPaid: string;
    images: {
        logo: string[];
        gallery: string[];
        banner: string[];
        cover: string[];
    };
    address: {
        state: string;
        city: string;
        area: string;
        nearBy: string;
        pincode: string;
    };
};

export default CollegeType;
