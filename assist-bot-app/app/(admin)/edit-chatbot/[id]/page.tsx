'use client'


import Avatar from "@/components/Avatar";
import Characteristic from "@/components/Characteristic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/graphql/apolloClient";
import { GET_CHATBOT_BY_ID } from "@/graphql/queries/queries";
import { GetChatbotByIdResponse, GetChatbotByIdVariables } from "@/types/types";
import { useMutation, useQuery } from "@apollo/client";
import { Copy } from "lucide-react";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";

import { use, useEffect, useState } from "react";
import { toast } from "sonner";

function EditChatbot({params:{id}}: {params:{id:string}}) {
  const [url, setUrl] = useState<string>('');
  const [chatbotName, setChatbotName] = useState<string>('');
  const [newCharacteristic, setNewCharacteristic] = useState<string>('');

  const[deleteChatbot] = useMutation(DELETE_CHATBOT, {
    refetchQueries: ["GetChatbotById"],
    //deleting
    awaitRefetchQueries: true,
  });


  const {data, loading, error} = useQuery<
  GetChatbotByIdResponse, 
  GetChatbotByIdVariables
  >(GET_CHATBOT_BY_ID, {variables:{id} },
  );

  useEffect(() => {
    if (data) {
      setChatbotName(data.chatbots.name);
    }
  }, [data]);

  useEffect(() => {
    const url = `${BASE_URL}/chatbot/${id}`;

    setUrl(url);
  }, [id]);

  const handleDelete =async (id:string) =>{
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this chatbot?");
      if(!isConfirmed) return;
    try {
      const promise = deleteChatbot({variables:{id}});
      toast.promise(promise, {
        loading: "Deleting chatbot...",
        success: "Chatbot deleted successfully",
        error: "Failed to delete chatbot",
      });
      
    } catch (error) {
      toast.error("Failed to delete chatbot");
    }
  };

  if (loading)
    return (
      <div className='mx-auto animate-spin p-10'>
        <Avatar seed="loading" />
        <p>Loading...</p>
      </div>
    ); 

    if (error) return <p>Error: {error.message}</p>;
    if (!data?.chatbots) return redirect("/view-chatbots")

    return (
      <div className='px-0 md:p-10'>
      <div className='md:sticky md:top-0 z-50 sm:max-w-sm ml-auto 
      space-y-2 md:border p-5 rounded-b-lg md:rounded-lg bg-[#2991EE]'>
      <h2 className='text-white text-sm font-bold'>Link to Chat</h2>
      <p className='text-sm italic text-white'> Share this link with 
      your customers to start conservations with your chatbot
      </p>
      <div className="flex items-center space-x-2">
        <Link href={url} className="w-full cursor-pointer 
        hover:opacity-50">
          <Input value={url} readOnly className="cursor-pointer" />
        </Link>
        <Button 
        size='sm'
        className="px-3"
        onClick={()=>{
          navigator.clipboard.writeText(url);
          toast.success("Copied to Clipboard");
        }}
        >
        <span className="sr-only">Copy</span>   
        <Copy className="h-4 w-4" />
        </Button>
      </div>
      </div>
      <section className="relartive mt-5 bg-white p-5 md:p-10 rounded-lg">
        <Button variant='destructive' 
        className="absolute-top-2 h-8 w-2"
        onClick ={()=> handleDelete(id)}
        >
          X
          </Button>
        <div className="flex space-x-4">
          <Avatar seed={chatbotName} />
          <form
          // onSubmit={handleUpdateChatbot}
           className="flex flex-1 space-x-2 items-center"
           >
            <Input 
            value={chatbotName}
            onChange={(e)=> setChatbotName(e.target.value)} 
            placeholder={chatbotName}
            className="w-full border-none bg-transparent text-xl font-bold"
            required
            />
            <Button type="submit" disabled={!chatbotName}>
              Update
              </Button>
          </form>
        </div>
        <h2 className="text-xl font-bold mt-10">
          Your chatbot is equipped with the following informations
          </h2>
      <div>
        <form >
         <Input 
         type="text"
         placeholder="Example: If user asks for .."
         value= {newCharacteristic}
         onChange = {(e)=> setNewCharacteristic(e.target.value)} />
        </form>

        <ul className="flex flex-wrap-reverse gap-5">
          {
            data?.chatbots?.chatbot_characteristics?.map
            ((characteristic) =>
               (
             <Characteristic 
             key={characteristic.id} 
             characteristic={characteristic}
             />
            ))
          }
        </ul>
      </div>
      
      </section>
    </div>
    );
}

export default EditChatbot;