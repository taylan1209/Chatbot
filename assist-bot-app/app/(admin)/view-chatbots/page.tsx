import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";

import { GET_CHATBOT_BY_USER} from "@/graphql/queries/queries";
import {serverClient} from "@/lib/server/serverClient";
import {
    Chatbot,
    GetChatbotsByUserData,
    GetChatbotsByUserDataVariables,
} from "@/types/chatbot";

import {auth} from "@clerk/nextjs/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function ViewChatbots() {
  const { userId } = auth();
  if (!userId) return;

  const { data:{chatbotsByUser} } = await serverClient.query<
    GetChatbotsByUserData,
    GetChatbotsByUserDataVariables
  >({
    query: GET_CHATBOT_BY_USER,
    variables: { clerkUserId: userId },
  });

  const sortedChatbotsByUser: Chatbot[] = [...chatbotsByUser].sort(
    (a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  return (
    <div className="flex-1 pb-20 p-10">
        <h1 className="text-2xl font-bold mb-4">
            Active Bots
        </h1>

        {sortedChatbotsByUser.length === 0 && (

            <div>
                <p>
                    You have not created any chatbot yet, 
                    Click on the button below to create one.
                </p>
                <Link href="/create-chatbot">
                    <Button className="bg-[#64B5F5] text-white 
                    p-3 rounded-md mt-5">
                        Create Chatbot
                    </Button>
                </Link>
            </div>
        )}
        <ul>
            {sortedChatbotsByUser.map ((chatbot)=>(
                <Link key = {chatbot.id} href={`/edit-chatbot/${chatbot.id}`}>
                    <li>
                        <div>
                            <Avatar seed={chatbot.name}/>
                            <h2 className="text-xl font-bold "> {chatbot.name}</h2>
                        </div>

                        <p className="absolute top-5 
                        right-5 text-xs text-gray-400">
                            Created: {new Date(chatbot.created_at).
                            toLocaleString()}

                        </p>
                    </li>
                </Link>
            ))}
        </ul>
    </div>
  );
} 

export default ViewChatbots
