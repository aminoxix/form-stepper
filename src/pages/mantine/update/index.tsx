import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { Loader } from "@mantine/core";
import MainLayout from "@/pages/layout";

const UpdateIndex = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/mantine");
  }, [router]);

  return (
    <MainLayout>
      <div className="flex flex-1 w-full justify-center items-center">
        <Loader />
      </div>
    </MainLayout>
  );
};

export default UpdateIndex;
