import Image from 'next/image';
import React from 'react';
import { createAvatar } from '@dicebear/core';
import { icons } from '@dicebear/collection';


function Avatar({seed, className}:{seed:string; className?:string}) {
  
  const avatar = createAvatar(icons, {
    seed,
    //
  });
    const svg = avatar.toString();

    const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
      
    return (
    <Image 
       src={dataUrl}
       alt="avatar"
       width={30}
       height={30}
       className={className}
    />
);
}

export default Avatar