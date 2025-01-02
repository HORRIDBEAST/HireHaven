"use client"
import React from 'react'
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Settings, LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/globalContext";
import { Badge } from "./ui/badge";
import axios from "axios";
const Profile = () => {
    const { userProfile, isAuthenticated, setIsAuthenticated } = useGlobalContext();

  const { profilePicture, name, profession, email } = userProfile;
const handleLogout = () => {
  router.push("http://localhost:7895/logout")
 
}
  const router = useRouter();
    return (
        <DropdownMenu>
          <div className="flex items-center gap-4">
            <Badge>{profession}</Badge>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Image
                src={profilePicture ? profilePicture : "/avatar.png"}
                alt="avatar"
                width={36}
                height={36}
                className="rounded-lg"
              />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {email}
                </p>
              </div>
            </DropdownMenuLabel>
    
            <DropdownMenuSeparator />
    
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              // onClick={() => {
              //   router.push("http://localhost:7895/logout");
              // }}
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

export default Profile
