'use client'
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar
} from "@nextui-org/react";
import navItems from "./navItens";
import logo from "@/public/logo.svg";
import Image from "next/image";
import { ToggleTheme } from "../ToggleTheme/ToggleTheme";
import { PiGithubLogoFill } from "react-icons/pi";
import { signOut, useSession } from "next-auth/react";



export function NavBar() {

  const { data: session, status } = useSession();

  return (
    <div>
      <Navbar isBlurred className="bg-transparent !max-w-screen-2xl mx-auto z-50">
        <NavbarBrand>
          <Link href="/" className="text-white">
            <Image
              alt="WebCodeLancer"
              src={logo}
              width={60}
              height={60}
              className="!fill-invert-0 dark:!invert"
            />
            <p className="font-semibold dark text-black dark:text-white">
              WebCodeLancer
            </p>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center" >
          {navItems.map((item: any, index: any) => {
            return (
              <NavbarItem key={index} >
                <Link
                  className="text-black dark dark:text-white"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            );
          })}
          <NavbarItem className="flex gap-1">
            <ToggleTheme />
            <Link href="https://github.com/HenriqueSagawa/webcodelancer" target="_blank">
              <Button
                variant="light"
                className="rounded-full !p-2 !min-w-0 !w-fit !h-fit"
              >
                <PiGithubLogoFill />
              </Button>
            </Link>
          </NavbarItem>
          <NavbarItem>
            {status === "loading" ? (
              <div role="status">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : session ? (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name={session?.user?.name as string}
                    size="sm"
                    src={session?.user?.image as string}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Conectado como</p>
                    <p className="font-semibold">{session?.user?.email}</p>
                  </DropdownItem>
                  <DropdownItem key="settings">My Settings</DropdownItem>
                  <DropdownItem key="team_settings">Team Settings</DropdownItem>
                  <DropdownItem key="analytics">Analytics</DropdownItem>
                  <DropdownItem key="system">System</DropdownItem>
                  <DropdownItem key="configurations">Configurations</DropdownItem>
                  <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                  <DropdownItem onClick={() => signOut()} key="logout" color="danger">
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Link href="/Login">
                <Button variant="flat" color="primary" className="!px-6">
                  Sign in
                </Button>
              </Link>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
