import { CallOptions, createPromiseClient } from "@connectrpc/connect";
import { AkkiService } from "../../gen/spec/akki_service_connect";
import { ChatMessageRequest } from "../../gen/spec/request/chat_message_request_pb";
import { ChatMessageResponse } from "../../gen/spec/response/chat_message_response_pb";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { JsonObject, Message } from "@bufbuild/protobuf";
import { convertJsonToGrpc } from "./grpcFactoryUtil";

// grpcWebロトコルのgrpcClient作成
const transport = createGrpcWebTransport(
    {
        // envoyのendpointを設定する
        baseUrl: "http://localhost:9000",
    }
);

// client
export const client = createPromiseClient(AkkiService, transport);

// メッセージ更新
export const saveChatMessage = async (jsonRequest?: JsonObject): Promise<ChatMessageResponse> => {
    return grpcExec(jsonRequest ?? {}, client.saveChatMessage, ChatMessageRequest);
}

// メッセージ取得
export const getChatMessage = async (jsonRequest?: JsonObject): Promise<AsyncIterable<ChatMessageResponse>> => {
    return grpcStreamExec(jsonRequest ?? {}, client.getChatMessage, ChatMessageRequest);
}

/**
 * Promise<T>を取得する
 */
export const grpcExec = async <T extends Message, Q extends Message>(jsonRequest: JsonObject, fnc: (jsonRequest: Q) => Promise<T>, grpcRequestClass: new () => Q): Promise<T> => {
    try {
        const request = convertJsonToGrpc(jsonRequest, grpcRequestClass);
        return fnc(request);
    } catch (e) {
        console.log('apiError', e);
        throw e;
    }
}

/**
 * Promise<AsyncIterable<T>>を取得する
 */
export const grpcStreamExec = async <T extends Message, Q extends Message>(jsonRequest: JsonObject, fnc: (jsonRequest: Q, options?: CallOptions) => AsyncIterable<T>, grpcRequestClass: new () => Q): Promise<AsyncIterable<T>> => {
    try {
        const request = convertJsonToGrpc(jsonRequest, grpcRequestClass);
        return fnc(request);
    } catch (e) {
        console.log('apiError', e);
        throw e;
    }
}