'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Import the Label component
import { Message } from "@/types/types";
import { useState } from "react"

function ChatbotPage({params: {id}}:{params:{id:string}}) {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Changed to boolean
  const [chatId, setChatId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form >

          <DialogHeader>
            <DialogTitle>
            Lets help you out
            </DialogTitle>
            <DialogDescription>
              I just need a few details to get started
            </DialogDescription>
          </DialogHeader>
          
          <div>
          <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
          className="col-span-3"
           />
          </div>

           <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Email
          </Label>
          <Input id="username" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          className="col-span-3"
           />
          </div>
          </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ChatbotPage