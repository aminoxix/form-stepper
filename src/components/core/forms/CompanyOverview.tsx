import React from "react";
import Image from "next/image";
import { FormWrapper } from "@/components/FormWrapper";
import { CompanyOverviewFormProps } from "@/types";
import FileInput from "../FileInput";

export const CompanyOverviewForm = ({
  companyName,
  companyURL,
  companyEmail,
  uploadSquareLogo,
  privacyPolicy,
  updateFields,
}: CompanyOverviewFormProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    const updatedValue =
      name === "uploadSquareLogo" ? (files ? files[0] : null) : value;
    updateFields({ [name]: updatedValue });
  };

  return (
    <FormWrapper className="flex flex-col gap-2 text-black">
      <label>What is your Company&apos;s Name?</label>
      <input
        className="w-full border rounded-md border-black h-8"
        autoFocus
        type="text"
        name="companyName"
        value={companyName}
        onChange={handleInputChange}
      />
      <label>What is your company&apos;s URL?</label>
      <input
        className="w-full border rounded-md border-black h-8"
        autoFocus
        name="companyURL"
        type="text"
        value={companyURL}
        onChange={handleInputChange}
      />
      <label>What is your company&apos;s e-mail?</label>
      <input
        className="w-full border rounded-md border-black h-8"
        autoFocus
        name="companyEmail"
        type="text"
        value={companyEmail}
        onChange={handleInputChange}
      />
      <label>Can you upload a high-resolution Square Logo?</label>
      <FileInput
        type="file"
        className="w-full border rounded-md border-black h-8"
        autoFocus
        multiple={false}
        placeholder="Upload Image here"
        name="uploadSquareLogo"
        accept="image/png,image/jpeg"
        onChange={handleInputChange}
        value={uploadSquareLogo?.name}
      />
      <label>
        Are there any legal, privacy, or compliance requirements we should be
        aware of?
      </label>
      <input
        className="w-full border rounded-md border-black h-8"
        autoFocus
        type="text"
        value={privacyPolicy || ""}
        name="privacyPolicy"
        onChange={handleInputChange}
      />
    </FormWrapper>
  );
};
