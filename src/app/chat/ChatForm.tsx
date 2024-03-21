"use client";
import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Button, Card, CardContent, CardHeader, TextField } from "@mui/material";
import "dayjs/locale/ja";
import { FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";
import { useGetChatMessages } from "../../fooks/useApi";
import { saveChatMessage } from "../../util/grpcClientUtil";
import ChatPartnerForm from "./ChatPartnerForm";
import ChatSelfForm from "./ChatSelfForm";
import { SaveChatMessage } from "./validation";


const MessageForm = () => {
  const methods: UseFormReturn<SaveChatMessage.FormType> = SaveChatMessage.useAkkiForm();

  const { messages } = useGetChatMessages();

  // チャットスクロール制御
  React.useEffect(() => {
    const scrollToEnd = () => {
      let messagesArea = document.getElementById('scroll-inner');
      if (messagesArea) {
        messagesArea.scrollTop = messagesArea.scrollHeight;
      }
    }
    scrollToEnd();
  }, [messages]);

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<SaveChatMessage.FormType> = async (data: SaveChatMessage.FormType) => {
    saveChatMessage({
      chat: {
        chatCode: "test",
        messageSeq: data.chat.messageSeq,
        messageContent: data.chat.messageContent,
        picName: "akkiF",
      },
      user: {
        createdUser: null,
        createdFunc: null,
        updatedUser: null,
        updatedFunc: null,
      }
    });
  };

  return (
    <Box>
      <Card variant="outlined" >
        <CardHeader title={"AkkiChat"} />
        <CardContent>
          <Card variant="outlined" sx={{ my: 3 }}>
            <CardContent id='scroll-inner' sx={{ height: 300, overflowY: "scroll", position: "relative" }}>
              {messages.chatMessage?.map(em => em.picName != "akkiF" ? <ChatPartnerForm em={em} /> : <ChatSelfForm em={em} />)}
            </CardContent>
          </Card>
          <FormProvider {...methods}>
            <Card variant="outlined" sx={{ my: 3 }}>
              <CardContent>
                <Grid lg={12} md={12} sm={12} xs={12} sx={{ my: 3 }}>
                  <TextField fullWidth type="text" label={"send_message"} name={`chat.messageContent`} />
                </Grid>
                <Grid spacing={1} rowSpacing={1} sx={{ display: "flex", justifyContent: "right" }}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ mr: 2 }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    {"send"}
                  </Button>
                </Grid>
              </CardContent>
            </Card>
          </FormProvider >
        </CardContent>
      </Card>
    </Box >
  );
}

export default MessageForm;