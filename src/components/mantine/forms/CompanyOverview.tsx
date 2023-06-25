import React from "react";

import { type UseFormReturnType } from "@mantine/form";
import type { FormDataType } from "@/types";

import { FormWrapper } from "@/components/FormWrapper";

import { TextInput, FileInput } from "@mantine/core";

export function CompanyOverviewForm({
  formData,
  updateFieldValue,
}: {
  formData: UseFormReturnType<
    FormDataType,
    (values: FormDataType) => FormDataType
  >;
  updateFieldValue: (name: string, value: any) => void;
}) {
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
          autoFocus
          withAsterisk
          required
          name="companyEmail"
          type="text"
          {...formData.getInputProps("companyEmail")}
          label="What is your company's email?"
          onChange={(value) => {
            updateFieldValue("companyEmail", value.currentTarget.value);
          }}
        />
        <TextInput
          className="w-full"
          autoFocus
          withAsterisk
          required
          name="companyURL"
          type="text"
          {...formData.getInputProps("companyURL")}
          label="What is your company's URL?"
          onChange={(value) => {
            updateFieldValue("companyURL", value.currentTarget.value);
          }}
        />
        <FileInput
          className="w-full"
          autoFocus
          required
          withAsterisk
          placeholder="Upload Image here"
          name="uploadSquareLogo"
          label="Can you upload a high-resolution Square Logo?"
          accept="image/png,image/jpeg"
          {...formData.getInputProps("uploadSquareLogo")}
          onChange={(files) => {
            updateFieldValue("uploadSquareLogo", files);
          }}
        />
        <TextInput
          className="w-full"
          autoFocus
          required
          withAsterisk
          type="text"
          name="privacyPolicy"
          {...formData.getInputProps("privacyPolicy")}
          label="Are there any legal, privacy, or compliance requirements we should be aware of?"
          onChange={(value) => {
            updateFieldValue("privacyPolicy", value.currentTarget.value);
          }}
        />
      </form>
    </FormWrapper>
  );
}
