type CollegeType = {
    id: string;
    name: string;
    ownerName: string;
    amountPaid: string;
    shortDescription: string;
    longDescription: string;
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
    comments?: {
        id: string;
        rating: number;
        comment: string;
        reply?: string | null;
        createdAt: string;
        userName: string;
        userId: string;
    }[];
    categories: {
        id: string;
        name: string;
    }[];
    details: {
        type: "whatsapp" | "phone";
        value: string;
    }[];
    courses?: {
        id: string;
        name: string;
        price: string;
        sellingPrice: string;
        discount: string;
        shortDescription: string;
        images: string[];
        category: string;
    }[];
};

export default CollegeType;
