import Header from "@/components/Header";
import { Children } from "react"
import React from "react"


function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>
        {/* {Header} */}
        <Header />

        <div>
            {/* {Sidebar} */}
            <div> 
                {children}
                
            </div>
        </div>
    </div>
  )
}

export default AdminLayout