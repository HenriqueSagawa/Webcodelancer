'use client'
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import navItems from "./navItens";
import logo from "@/public/logo.svg";
import Image from "next/image";
import { ToggleTheme } from "../ToggleTheme/ToggleTheme";
import { PiGithubLogoFill } from "react-icons/pi";
import { getUserData } from "@/src/services/saveLogin";
import { useRouter } from "next/navigation";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/dropdown";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";



export function NavBar() {
  const user = getUserData();

  return (
    <Navbar isBlurred className="bg-transparent !max-w-screen-2xl mx-auto">
      <NavbarBrand>
        <Link href="./" className="text-white">
          <Image
            alt="WebCodeLancer"
            src={logo}
            className="w-[4rem] h-fit  !fill-invert-0 dark:!invert"
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
          {user ? (
            <Dropdown>
              <DropdownTrigger className="cursor-pointer">
                <Button color="default" variant="light" className="dark:text-white">
                  <span>Olá {user.name}</span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>
                  <Link className="text-white flex items-center gap-2 *:" href="/Profile"><FaRegUser />Perfil</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link className="text-white flex items-center gap-2 *:" href="/Settings"><IoSettingsOutline /> Configurações</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link className="text-white flex items-center gap-2 *:" href="/logout"><MdLogout /> Sair</Link>
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
  );
}
