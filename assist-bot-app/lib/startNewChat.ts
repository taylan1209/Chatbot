import client from "@/graphql/apolloClient"
import { gql } from "@apollo/client"
import {INSERT_CHAT_SESSION, INSERT_GUEST, INSERT_MESSAGE} from "@/graphql/mutations/mutations";

async function startNewChat(
    guestName:string,
    guestEmail:string,
    chatbotId:number
) {
    try {
    // 1. Create a new guest entry
    const guestResult = await client.mutate({
        mutation: INSERT_GUEST,
        variables: {
            name: guestName,
            email: guestEmail,
        },
    })

    const guestId = guestResult.data.insertGuests.id;

    // 2. Initialize a new chat session
    const chatSessionResult = await client.mutate({
        mutation: INSERT_CHAT_SESSION,
        variables: {
            chatbot_id: chatbotId,
            guest_id: guestId,
        },
    });
    const chatSessionId = chatSessionResult.data.insertChat_sessions.id;

    // 3. Insert a welcome message
     await client.mutate({
        mutation: INSERT_MESSAGE,
        variables: {
            chat_session_id: chatSessionId,
            content: "Welcome to the Tanıtma chat! Ask me and I can give you any information about our travel destinations",
            sender: "ai",
        },
    });
    console.log ("New chat session started successfully");
    return chatSessionId;

    } catch (error) {
        console.log(error)
    }
}


export default startNewChat;