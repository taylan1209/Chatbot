import { GET_CHATBOT_BY_ID, GET_MESSAGES_BY_CHAT_SESSION_ID } from "@/graphql/queries/queries";
import { serverClient } from "@/lib/server/serverClient";
import { GetChatbotByIdResponse, MessagesByChatSessionIdResponse } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req:NextRequest){
    const {
        chat_session_id,
        chatbot_id,
        content, 
        name} = await req.json();

    
console.log(`Received message from chat session ${chat_session_id}:
${content} (chatbot:${chatbot_id})`);

try {
    //Step 1: Fetch chatbot characteristics
    const {data} = await serverClient.query<GetChatbotByIdResponse>({
        query: GET_CHATBOT_BY_ID,
        variables: {id: chatbot_id},
    });
       
    const chatbot = data.chatbots;

    if (!chatbot) {
        return NextResponse.json({error: "Chatbot not found"}, {status:404})
    }

    //Step 2: Fetch previous messages
    const {data: messagesData} = await serverClient.query<MessagesByChatSessionIdResponse>({
        query: GET_MESSAGES_BY_CHAT_SESSION_ID,
        variables: {chat_session_id},
        fetchPolicy: "no-cache",
    })

    const previousMessages = messagesData.chat_sessions.messages;

} catch (error) {
    console.log(error);
    return NextResponse.json({error}, {status:500})
}
}