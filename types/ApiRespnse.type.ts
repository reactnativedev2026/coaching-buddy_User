type ApiResponseType<T> = {
    status: boolean;
    message: string;
    data?: T | null;
};

export default ApiResponseType;
