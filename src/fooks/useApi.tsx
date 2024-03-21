import { useMemo, useState } from "react";
import { ChatMessageResponse } from "../../gen/spec/response/chat_message_response_pb";
import { getChatMessage } from "../util/grpcClientUtil";
import { JsonObject } from "@bufbuild/protobuf";

/**
 * メッセージを取得するカスタムフック
 * @param request 
 * @returns ChatMessageResponse
 */
export const useGetChatMessages = (request?: JsonObject) => {
    const [messages, setMessages] = useState({} as ChatMessageResponse);
    useMemo(() => {
        const fetchData = async () => {
            const data = getChatMessage(request);
            for await (const message of await data) {
                setMessages(message);
            }
        };
        fetchData();
    }, []);

    return { messages };
};