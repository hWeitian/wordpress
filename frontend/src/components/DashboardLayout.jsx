import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useGetAccessToken from "../custom_hooks/useGetAccessToken";
import { getConferences } from "../services/conferences";

import { NormalComboBox } from "./NormalComboBox";

import { ProfileIcon } from "./ProfileIcon";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Home, BarChart2, CheckSquare, Flag } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppContext } from "../context/appContext";
const DashboardLayout = () => {
  const { pathname } = useLocation();
  const { logout, user } = useAuth0();

  const [userName, setUserName] = useState("");
  const location = useLocation();
  const { comboBoxValue, setComboBoxValue } = useAppContext();
  const getAccessToken = useGetAccessToken();

  const { data: conferences, isLoading: isConferenceFetching } = useQuery({
    queryKey: ["conferences"],
    queryFn: async () => {
      const accessToken = await getAccessToken();
      return getConferences(accessToken);
    },
    refetchOnWindowFocus: false, // it is not necessary to keep refetching
  });
  useEffect(() => {
    setUserName(user.name);
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen layout">
      <div className="pt-4 pr-6 border ablublu bottom-2">
        <div>
          {!isConferenceFetching && (
            <NormalComboBox
              options={conferences}
              validateProperty={"name"}
              displayProperty={"name"}
              fieldName={"conference"}
              value={comboBoxValue}
              setValue={setComboBoxValue}
            />
          )}
        </div>
        <div className="flex items-center justify-end gap-2 mb-4 ">
          <p className="text-color">{userName}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <ProfileIcon />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={() => logout()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex flex-1">
        <div className="border-r-2 ">
          <div className="flex flex-col items-center gap-6 px-6 pt-8 ">
            <div
              className={cn(
                (pathname.endsWith("dashboard") ||
                  pathname.endsWith("/") ||
                  pathname.endsWith("conferences")) &&
                  "text-[#0D05F2] bg-[#F9FAFB]",
                "flex gap-2 w-[200px] h-[50px] cursor-pointer"
              )}
            >
              <Home />
              <h3 className="font-bold">Conferences</h3>
            </div>
            <div
              className={cn(
                pathname.endsWith("speakers") && "text-[#0D05F2] bg-[#F9FAFB]",
                "flex gap-2 w-[200px] h-[50px] cursor-pointer"
              )}
            >
              <BarChart2 />
              <h3 className="font-bold">Speakers</h3>
            </div>
            <div
              className={cn(
                pathname.endsWith("program") && "text-[#0D05F2] bg-[#F9FAFB]",
                "flex gap-2 w-[200px] h-[50px] cursor-pointer"
              )}
            >
              <CheckSquare />
              <h3 className="font-bold">Program</h3>
            </div>
            <div
              className={cn(
                pathname.endsWith("download") && "text-[#0D05F2] bg-[#F9FAFB]",
                "flex gap-2 w-[200px] h-[50px] cursor-pointer"
              )}
            >
              <Flag />
              <h3 className="font-bold">Download</h3>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
