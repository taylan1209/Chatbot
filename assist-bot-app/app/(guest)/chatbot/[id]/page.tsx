'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Message } from "@/types/types";
import { useState } from "react"


function ChatbotPage({params: {id}}:{params:{id:string}}) {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState("");
  const [chatId, setChatId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);


  
  return (
    <div>ChatbotPage: {id} </div>
  )
}

export default ChatbotPage