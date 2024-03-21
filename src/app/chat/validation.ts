import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver, } from '@hookform/resolvers/zod';

export namespace SaveChatMessage {
    /** バリデーション定義 */
    const getDef = () => {
        return {
            chat: z.object({
                chatCode: z.string(),
                messageSeq: z.coerce.number(),
                messageContent: z.string(),
                picName: z.string(),
            }),
            user: z.object({
                createdUser: z.string().nullable(),
                createdFunc: z.string().nullable(),
                updatedUser: z.string().nullable(),
                updatedFunc: z.string().nullable(),
            }),
        }
    }

    /** ZodSchema定義 */
    const getSchema = () => z.object(getDef());

    /** userFormカスタムフックにzodの依存を追加して取得するカスタムフック */
    export const useAkkiForm = () => {
        const values = {
            chat: {
                chatCode: "",
                messageSeq: 0,
                messageContent: "",
                picName: "",
            },
            user: {
                createdUser: "",
                createdFunc: "",
                updatedUser: "",
                updatedFunc: "",
            }
        };
        return useForm<SaveChatMessage.FormType>({
            mode: "onSubmit",
            reValidateMode: "onSubmit",
            resolver: zodResolver(getSchema()),
            defaultValues: values,
        })
    }

    declare type SchemaType = ReturnType<typeof getSchema>;
    export declare type FormType = z.infer<SchemaType>;
}
