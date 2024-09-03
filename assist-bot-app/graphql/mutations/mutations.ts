import { gql } from "@apollo/client";

export const CREATE_CHATBOT = gql`
    mutation CreateChatbot($clerk_user_id: String!, $name: String!, $created_at: DateTime!) {
        insertChatbots(clerk_user_id: $clerk_user_id, name: $name, created_at: $created_at) {
            id
            name
            created_at
        } 
   }
`;

export const REMOVE_CHARACTERISTIC = gql`
    mutation RemoveCharacteristic($characteristicId: Int!) {
        deleteChatbot_characteristics(id: $characteristicId) {
            id
        }
    }
`;


    export const DELETE_CHATBOT = gql`
    mutation DeleteChatbot($id: Int!) {
        deleteChatbots(id: $id) {
            id
        }
    }
`;

    export const ADD_CHARACTERISTIC = gql`
    mutation AddCharacteristic($chatbot_id: Int!, $content: String!, $created_at: DateTime!) {
        insertChatbot_characteristics(
            chatbot_id: $chatbot_id, 
            content: $content, 
            created_at: $created_at) {
            id
            content
            created_at
        }
    }
`;

export const UPDATE_CHATBOT = gql`
    mutation UpdateChatbot($id: Int!, $name: String!) {
        updateChatbots(id: $id, name: $name, created_at: $created_at ) {
            id
            name
            created_at
        }
    }
`;

export const INSERT_MESSAGE = gql`
    mutation InsertMessage(
        $chat_session_id: Int!, 
        $content: String!,
        $sender: String!
     ) {
        insertMessages(
            chat_session_id: $chat_session_id,
            content: $content,
            sender: $sender
            ) {
            id
            content
            created_at
            sender
        }
    }
`;


export const INSERT_GUEST = gql`
mutation insertGuest($name: String!, $email: String!) {
 insertGuests(name: $name, email: $email ) {
   id
 }
}
`;

export const INSERT_CHAT_SESSION = gql`
mutation insertChatSession($chatbot_id: Int!, $guest_id: Int!) {
 insertChatSessions(chatbot_id: $chatbot_id, guest_id: $guest_id) {
   id
 }
}
`;