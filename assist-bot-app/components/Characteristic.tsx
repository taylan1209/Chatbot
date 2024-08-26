'use client'

import { REMOVE_CHARACTERISTIC } from '@/graphql/mutations/mutations';
import { ChatbotCharacteristic } from '@/types/types'
import { useMutation } from '@apollo/client';
import { OctagonX } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner';

function Characteristic({ characteristic }: { characteristic: ChatbotCharacteristic }) {

    const [removeCharacteristic] = useMutation(REMOVE_CHARACTERISTIC, {
        refetchQueries: ["GetChatbotById"],
    });

    const handleRemoveCharacteristic = async (characteristicId: number) => {
        try {
            const promise = removeCharacteristic({
                variables: {
                    characteristicId,
                },
            });
            await promise;
            return promise;
        } catch (error) {
            console.error("Error removing characteristic", error);
            toast.error("Error removing characteristic");
            throw error;
        }
    }

    return (
        <li key={characteristic.id} className='relative'>
            {characteristic.content}
            <OctagonX
                className='w-6 h-6 text-white fill-red-500 absolute top-1 right-1 cursor-pointer hover:opacity-50'
                onClick={() => {
                    const promise = handleRemoveCharacteristic(characteristic.id);
                    toast.promise(promise, {
                        loading: "Removing characteristic...",
                        success: "Characteristic removed successfully",
                        error: "Error removing characteristic",
                    });
                }}
            />
        </li>
    )
}

export default Characteristic
