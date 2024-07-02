import React from "react";
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

export function NavBar() {
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
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navItems.map((item: any, index: any) => {
          return (
            <NavbarItem key={index}>
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
          <Link href="/Login">
            <Button variant="flat" color="primary" className="!px-6">
              Sign in
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
