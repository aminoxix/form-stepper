import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { GearIcon } from "@radix-ui/react-icons";
import { MantineIcon } from "../assets/icons/mantine-icon";

const Sidebar = ({ toggleSidebar }: { toggleSidebar: boolean }) => {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [isGearClicked, setIsGearClicked] = useState<boolean>(false);

  const navMenus = [
    {
      icon: <GearIcon className="w-5 h-5" />,
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
      <Modal onClose={close} opened={isGearClicked} title="Are you sure?">
        <div>
          Core haven&apos;t integrated with backend yet, do you still wanna
          continue?
        </div>
        <Group mt="xl" position="right">
          <Button variant="outline" color="dark" onClick={close}>
            Cancel
          </Button>
          <Button
            variant="outline"
            color="red"
            onClick={() => router.push("/core")}
          >
            Let&apos;s Check!
          </Button>
        </Group>
      </Modal>
      <div className="flex flex-col gap-5">
        {navMenus.map((menu) => (
          <div
            className={`flex items-center justify-center rounded-full p-2 ${
              router.pathname === menu.path && "bg-black"
            }`}
            key={menu.name}
          >
            <button
              onClick={() => {
                menu.name === "Mantine"
                  ? router.push(menu.path)
                  : setIsGearClicked(true);
              }}
              className={`w-5 h-5 flex justify-center items-center ${
                router.pathname === menu.path
                  ? "text-white"
                  : "mix-blend-exclusion"
              }`}
            >
              {menu.icon}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
