// @generated by protoc-gen-es v1.3.3 with parameter "target=ts,import_extension=.ts"
// @generated from file spec/model/chat_message_model.proto (package spec.model, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, protoInt64 } from "@bufbuild/protobuf";
import { DateTime } from "../../google/type/datetime_pb.ts";

/**
 *
 * チャットメッセージ
 *
 * @generated from message spec.model.ChatMessageModel
 */
export class ChatMessageModel extends Message<ChatMessageModel> {
  /**
   * 【M】
   * チャットコード
   *
   * @generated from field: string chat_code = 1;
   */
  chatCode = "";

  /**
   * 【M】
   * メッセージ連番
   *
   * @generated from field: uint64 message_seq = 2;
   */
  messageSeq = protoInt64.zero;

  /**
   * 【M】
   * メッセージ内容
   *
   * @generated from field: string message_content = 3;
   */
  messageContent = "";

  /**
   * 【M】
   * メッセージ投稿日時
   *
   * @generated from field: google.type.DateTime message_datetime = 4;
   */
  messageDatetime?: DateTime;

  /**
   * 【M】
   * 既読フラグ
   *
   * @generated from field: bool read_flag = 5;
   */
  readFlag = false;

  /**
   * 【M】
   * メッセージ投稿者名称
   *
   * @generated from field: string pic_name = 6;
   */
  picName = "";

  constructor(data?: PartialMessage<ChatMessageModel>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "spec.model.ChatMessageModel";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "chat_code", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "message_seq", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 3, name: "message_content", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "message_datetime", kind: "message", T: DateTime },
    { no: 5, name: "read_flag", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 6, name: "pic_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ChatMessageModel {
    return new ChatMessageModel().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ChatMessageModel {
    return new ChatMessageModel().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ChatMessageModel {
    return new ChatMessageModel().fromJsonString(jsonString, options);
  }

  static equals(a: ChatMessageModel | PlainMessage<ChatMessageModel> | undefined, b: ChatMessageModel | PlainMessage<ChatMessageModel> | undefined): boolean {
    return proto3.util.equals(ChatMessageModel, a, b);
  }
}
