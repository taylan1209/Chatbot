import { GET_CHAT_SESSION_MESSAGES } from "@/graphql/queries/queries";
import { serverClient } from "@/lib/server/serverClient";
import { GetChatSessionMessagesResponse, GetChatSessionMessagesVariables } from "@/types/types";

export const dynamic = "force-dynamic";

async function ReviewSession ({params: {id}}:{params: {id: string}}) {

  const {
    data: {
      chat_sessions: {
        id: chatSessionId,
        created_at,
        messages,
        chatbots: {name},
        guests: {name: guestName,email},
      },
    },
  } = await serverClient.query<
  GetChatSessionMessagesResponse,
  GetChatSessionMessagesVariables
  >({
    query: GET_CHAT_SESSION_MESSAGES,
    variables: {id: parseInt(id as string) },
  });


  return (
    <div>ReviewSession</div>
  )
}

export default ReviewSession