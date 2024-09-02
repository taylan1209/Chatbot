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
    <div>
      <h1 className="text-xl lg:text-3xl font-semibold">
        Session Review
      </h1>
      <p className="font-light text-xs text-gray-400 mt-2">
      Started at {new Date(created_at).toLocaleString()}
      </p>
    </div>
  )
}

export default ReviewSession