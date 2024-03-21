"use client";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Card, CardContent, } from "@mui/material";
import "dayjs/locale/ja";
import { ChatMessageModel } from "../../../gen/spec/model/chat_message_model_pb";
import { convertDatetimeToDayjsNullable } from "../../util/grpcFactoryUtil";

type Props = {
  em: ChatMessageModel
}

const ChatPartnerForm = ({ em }: Props) => {

  return (
    <Box key={em.messageSeq} sx={{ display: 'flex', alignItems: "center" }}>
      <Grid >
        <Box>
        </Box>
        {em.picName}
      </Grid>
      <Grid key={em.messageSeq} lg={6} md={6} sm={6} xs={6} sx={{ display: 'flex', mx: "4rem" }}>
        <Card sx={{ borderRadius: "50px" }}>
          <CardContent key={em.messageSeq} sx={{ background: "#17a2b8!important", color: "#fff!important" }}>
            {em.messageContent}
            <Grid sx={{ display: "flex", justifyContent: "flex-end", mt: "1rem" }}>
              {convertDatetimeToDayjsNullable(em.messageDatetime)?.format("YYYY/MM/DD HH:mm:ss")}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
}

export default ChatPartnerForm;