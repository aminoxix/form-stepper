/* eslint-disable @next/next/no-img-element */

import React from "react";
import { useRouter } from "next/router";

import { type UseFormReturnType } from "@mantine/form";
import type { FormDataType } from "@/types";

import { FormWrapper } from "@/components/FormWrapper";

import { TextInput, FileInput } from "@mantine/core";

export function CompanyOverviewForm({
  formData,
  updateFieldValue,
  handleFileUpload,
}: {
  formData: UseFormReturnType<
    FormDataType,
    (values: FormDataType) => FormDataType
  >;
  updateFieldValue: (name: string, value: any) => void;
  handleFileUpload: (file: File | File[] | null, logoType: string) => void;
}) {
  const router = useRouter();
  const id = router.query.id;
  return (
    <FormWrapper>
      <form className="flex flex-col gap-4">
        <TextInput
          className="w-full"
          autoFocus
          withAsterisk
          required
          type="text"
          name="companyName"
          {...formData.getInputProps("companyName")}
          label="What is your Company's Name?"
          onChange={(value) =>
            updateFieldValue("companyName", value.currentTarget.value)
          }
        />
        <TextInput
          className="w-full"
          withAsterisk
          required
          name="companyEmail"
          type="text"
          {...formData.getInputProps("companyEmail")}
          label="What is your company's email?"
          onChange={(event) => {
            updateFieldValue("companyEmail", event.currentTarget.value);
          }}
        />
        <TextInput
          className="w-full"
          withAsterisk
          required
          name="companyURL"
          type="text"
          {...formData.getInputProps("companyURL")}
          label="What is your company's URL?"
          onChange={(event) => {
            updateFieldValue("companyURL", event.currentTarget.value);
          }}
        />
        {id && (
          <div className="flex w-full justify-center gap-4 bg-primary p-1 md:h-44 md:gap-x-6 md:gap-y-6 md:p-2">
            <img
              src={formData.values.uploadSquareLogo}
              alt="image"
              className="h-20 md:h-40"
            />
          </div>
        )}
        <FileInput
          className="w-full"
          required
          withAsterisk
          placeholder="Upload Image here"
          name="uploadSquareLogo"
          label="Can you upload a high-resolution Square Logo?"
          accept="image/png,image/jpeg"
          {...formData.getInputProps("uploadSquareLogo")}
          onChange={(file) => {
            updateFieldValue("uploadSquareLogo", file);
            handleFileUpload(file, "uploadSquareLogo");
          }}
        />
        <TextInput
          className="w-full"
          required
          withAsterisk
          type="text"
          name="privacyPolicy"
          {...formData.getInputProps("privacyPolicy")}
          label="Are there any legal, privacy, or compliance requirements we should be aware of?"
          onChange={(event) => {
            updateFieldValue("privacyPolicy", event.currentTarget.value);
          }}
        />
      </form>
    </FormWrapper>
  );
}
