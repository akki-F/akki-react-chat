"use client";
import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Card, CardContent, } from "@mui/material";
import "dayjs/locale/ja";
import { ChatMessageModel } from "../../../gen/spec/model/chat_message_model_pb";
import { convertDatetimeToString } from "../../util/grpcFactoryUtil";

type Props = {
  em: ChatMessageModel
}

const ChatSelfForm = ({ em }: Props) => {

  return (
    <Box key={em.messageSeq} sx={{ display: 'flex', alignItems: 'center', justifyContent: "end" }}>
      <Grid lg={6} md={6} sm={6} xs={6} sx={{ m: "4rem" }}>
        <Card sx={{ borderRadius: "50px" }}>
          <CardContent key={em.messageSeq} sx={{ background: "#fff!important", }}>
            <React.Fragment key={em.messageSeq}>
              {em.messageContent}
              <Grid sx={{ display: "flex", justifyContent: "flex-end", mt: "1rem" }}>
                {convertDatetimeToString(em.messageDatetime)}
              </Grid>
            </React.Fragment>
          </CardContent>
        </Card>
      </Grid>
      <Grid >
        <Box>
        </Box>
        {em.picName}
      </Grid>
    </Box>
  );
}

export default ChatSelfForm;