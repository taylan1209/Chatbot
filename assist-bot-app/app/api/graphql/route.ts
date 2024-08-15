import client from "@/graphql/apolloClient";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; 

export async function POST(request: NextRequest){
    const  {query, variables} = await request.json();

    try {
        if (query.trim().startsWith("mutation")){
            //Handle mutations
            client 
            
        }else {
            //Handle queries
        }
    } catch (error) {
        
    }

}