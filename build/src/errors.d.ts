declare const errorHandler: (error: any, req: any, reply: any) => void;
export default errorHandler;
export declare class ApiError extends Error {
    statusCode: number;
    constructor(message: string, statusCode?: number);
}
export declare const StatusCodes: {
    badRequest: number;
    unauthorized: number;
    forbidden: number;
    notFound: number;
    unexpected: number;
};
//# sourceMappingURL=errors.d.ts.map