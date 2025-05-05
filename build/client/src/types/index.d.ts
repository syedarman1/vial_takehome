export interface FormData {
    id: string;
    question: string;
    answer: string;
    queries: Query[];
}
export interface Query {
    id: string;
    title: string;
    description: string;
    status: 'OPEN' | 'RESOLVED';
    createdAt: string;
    updatedAt: string;
    formDataId: string;
    createdBy?: string;
}
export interface FormDataResponse {
    data: {
        formData: FormData[];
    };
}
export interface CreateQueryPayload {
    title: string;
    description: string;
    formDataId: string;
}
export interface UpdateQueryPayload {
    description?: string;
    status?: 'OPEN' | 'RESOLVED';
}
//# sourceMappingURL=index.d.ts.map