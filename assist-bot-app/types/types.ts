export interface Chatbot {
    id:number;
    name:string;
    clerk_user_id:string;
    created_at:string;
    chatbot_characteristics: ChatbotCharacteristic[];
    chat_sessions: ChatSession[];
}
export interface ChatbotCharacteristic {
    id:number;
    chatbot_id:number;
    content:string;
    created_at:string;
}
export interface Guest {
    id:number;
    name:string;
    email:string;
    created_at:string;
}

export interface ChatSession {
    id:number;
    chatbot_id:number;
    guest_id:number;
    created_at:string;
    messages: Message[];
    guests: Guest[];
}
export interface Message {
    id:number;
    chat_session_id:number;
    content:string;
    created_at:string;
    sender:"ai" | "user";
}
export interface GetChatbotByIdResponse{
    chatbot: Chatbot;
}
export interface GetChatbotByIdVariables{
    id:string;
}

export interface GetChatbotsByUserData{
    chatbotsByUser: Chatbot[];
}
export interface GetChatbotsByUserDataVariables{
    clerk_user_id:string;
}