import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import MainLayout from "./layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <MainLayout>
      <div className="h-full w-full flex justify-center items-center gap-4">
        <Link
          className="flex justify-center items-center w-fit px-2 bg-black h-10 rounded-md border text-white hover:text-black hover:bg-white hover:border-black"
          href="/core"
        >
          Core Form
        </Link>
        <Link
          className="flex justify-center items-center w-fit px-2 bg-black h-10 rounded-md border text-white hover:text-black hover:bg-white hover:border-black"
          href="/mantine"
        >
          Mantine Form
        </Link>
      </div>
    </MainLayout>
  );
}
