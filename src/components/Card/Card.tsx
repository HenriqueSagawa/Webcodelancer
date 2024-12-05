import { Button } from "@nextui-org/react";
import Link from "next/link";
import { ReactNode } from "react";
import { Card } from "@nextui-org/card";
import color from "./pageCards";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function CardComponent({
  icon,
  title,
  href,
}: {
  icon: ReactNode;
  title: string;
  href: string;
}) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <Card 
      isBlurred 
      className="border dark:border-0 flex flex-col gap-6 items-center pt-5 rounded-lg shadow-md w-full m-6 overflow-hidden sm:w-52"
      data-aos="fade-up"
    > 
      <div>{icon}</div>
      <h2 className="text-center text-dark dark:text-white font-semibold text-xl px-2 pb-5">{title}</h2>
      <Link href={href}>
        <Button variant="solid" color="primary" className={`!bg-[${color}] !rounded-none w-screen`}>
          Acessar
        </Button>
      </Link>
    </Card>
  );
}
