'use client';

import { Chatbot } from "@/types/types";
import { useEffect, useState } from "react";


function ChatBotSessions({ chatbots }: { chatbots: Chatbot[] }) {

    const [sortedChatbots, SetSortedChatbots] = useState<Chatbot[]>([]);

    useEffect(() => {
        const sortedArray = [...chatbots].sort((a, b) =>
             b.chat_sessions.length - a.chat_sessions.length
    );

        SetSortedChatbots(sortedArray);
    }, [chatbots]);
  return (
    <div>ChatBotSessions</div>
  )
}

export default ChatBotSessions