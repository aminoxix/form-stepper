import React, { use, useState } from "react";
import Link from "next/link";

import { MantineIcon } from "../assets/icons/mantine-icon";
import { useRouter } from "next/router";

const Sidebar = ({ toggleSidebar }: { toggleSidebar: boolean }) => {
  const router = useRouter();

  const navMenus = [
    {
      icon: <i className="symbol">settings</i>,
      name: "Core",
      path: "/core",
    },
    {
      icon: <MantineIcon className="rounded-full" />,
      name: "Mantine",
      path: "/mantine",
    },
  ];

  return (
    <div
      className={`fixed inset-y-0 top-0 z-30 min-w-[100px] transform flex-col items-center overflow-y-auto rounded-br-xl rounded-tr-xl bg-white p-6 justify-start transition duration-300 md:relative md:top-5 md:ml-2 md:flex md:h-[95vh] md:translate-x-0 md:rounded-xl xl:min-w-[140px] ${
        toggleSidebar
          ? "h-full translate-x-0 ease-out"
          : "-translate-x-full ease-in"
      }`}
    >
      <div className="flex flex-col gap-5">
        {navMenus.map((menu) => (
          <div
            className={`flex items-center justify-center rounded-md p-2 ${
              router.pathname === menu.path && "bg-black"
            }`}
            key={menu.name}
          >
            <Link
              className={`${
                router.pathname === menu.path
                  ? "text-white"
                  : "mix-blend-exclusion"
              }`}
              href={menu.path}
            >
              {menu.icon}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
