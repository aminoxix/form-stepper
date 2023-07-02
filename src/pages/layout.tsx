import React, { type ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/router";

import Sidebar from "@/components/Sidebar";
import { useScreenWidth } from "@/hooks/useScreenWidth";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const screenWidth = useScreenWidth();

  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  useEffect(() => {
    screenWidth < 768 && setToggleSidebar((prev) => !prev);
  }, [screenWidth]);

  return (
    <div className="flex min-h-screen w-full bg-primary">
      <Sidebar toggleSidebar={toggleSidebar} />
      <section className="relative flex w-full flex-col bg-white md:top-5 md:mx-2 md:h-[calc(100vh-5vh)] md:w-[calc(100vw-100px)] md:overflow-y-scroll md:rounded-xl xl:w-[calc(100vw-180px)]">
        {router.pathname !== "/" && (
          <button
            className="absolute top-5 right-5 z-10 text-black"
            onClick={() => router.back()}
          >
            Back
          </button>
        )}
        <main className="relative h-screen px-2 pt-3 md:px-20 flex flex-col justify-between my-5 gap-5">
          {children}
        </main>
      </section>
    </div>
  );
}
