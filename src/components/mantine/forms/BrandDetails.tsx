import React from "react";

import { type UseFormReturnType } from "@mantine/form";
import type { FormDataType } from "@/types";

import { FormWrapper } from "@/components/FormWrapper";

import { TextInput, FileInput, Text } from "@mantine/core";

export function BrandDetailsForm({
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
  return (
    <FormWrapper>
      <form className="flex flex-col gap-4">
        <div className="w-full flex gap-4">
          <TextInput
            className="w-1/2"
            autoFocus
            withAsterisk
            required
            type="text"
            name="age"
            {...formData.getInputProps("age")}
            label="Years in Business"
            onChange={(value) =>
              updateFieldValue("age", value.currentTarget.value)
            }
          />
          <TextInput
            className="w-1/2"
            autoFocus
            withAsterisk
            required
            type="text"
            name="location"
            {...formData.getInputProps("location")}
            label="Location"
            onChange={(value) =>
              updateFieldValue("location", value.currentTarget.value)
            }
          />
        </div>
        <FileInput
          className="w-full"
          autoFocus
          withAsterisk
          placeholder="Upload Image here"
          multiple
          required
          name="uploadHorizontalLogo"
          label="Can you upload brand assets (logo, images, etc.) of your company?"
          accept="image/png,image/jpeg"
          {...formData.getInputProps("brandAssets")}
          onChange={(files) => {
            updateFieldValue("brandAssets", files);
            handleFileUpload(files, "brandAssets");
          }}
        />
        <TextInput
          className="w-full"
          autoFocus
          withAsterisk
          required
          type="text"
          name="brandDetails"
          {...formData.getInputProps("brandDetails")}
          label="Share your brand details & requirements here..."
          onChange={(value) =>
            updateFieldValue("brandDetails", value.currentTarget.value)
          }
        />
      </form>
    </FormWrapper>
  );
}
