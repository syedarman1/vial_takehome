import { FastifyReply, FastifyRequest } from 'fastify';
type VialSuccessResponse = {
    statusCode: number;
    message: string;
    data: any;
};
declare const preSerializer: (request: FastifyRequest, reply: FastifyReply, payload: any) => Promise<VialSuccessResponse>;
export declare function serializer(data: any, statusCode: number): string;
export default preSerializer;
//# sourceMappingURL=pre_serializer.d.ts.map