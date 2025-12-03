"use client"
import React from "react";
import { useState} from "react"
import PatientsLayout from "@/components/PatientsLayout";
// import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import VitalsPatientPopup from "@/components/vitalsPopUp";

const Page = () => {
  const[isopen, setIsOpen] = useState(false);
  return (
    <PatientsLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#253D90] flex items-center ">
           You can see Alert here to your Condition
          </h1>

          <div className=""> 
            <Button className="">
              <VitalsPatientPopup isopen ={isopen} setIsOpen={setIsOpen}/>
            </Button>
            
          </div>
        </div>
      </div>
    </PatientsLayout>
  );
};

export default Page;
