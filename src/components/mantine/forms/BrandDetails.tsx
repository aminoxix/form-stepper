/* eslint-disable @next/next/no-img-element */

import React from "react";
import { useRouter } from "next/router";

import { type UseFormReturnType } from "@mantine/form";
import type { FormDataType } from "@/types";

import { FormWrapper } from "@/components/FormWrapper";

import { TextInput, FileInput, Text } from "@mantine/core";
import { CrossCircledIcon } from "@radix-ui/react-icons";

export function BrandDetailsForm({
  formData,
  updateFieldValue,
  handleFileUpload,
  brandAssetsUrls,
  setBrandAssetsUrls,
}: // stepperFormData,
{
  formData: UseFormReturnType<
    FormDataType,
    (values: FormDataType) => FormDataType
  >;
  updateFieldValue: (name: string, value: any) => void;
  handleFileUpload: (file: File | File[] | null, logoType: string) => void;
  brandAssetsUrls?: string[];
  setBrandAssetsUrls?: React.Dispatch<React.SetStateAction<string[]>>;
  // stepperFormData?:
  //   | {
  //       companyOverview: {
  //         id: string;
  //         createdAt: Date;
  //         updatedAt: Date;
  //         companyName: string;
  //         companyEmail: string;
  //         companyWebsite: string | null;
  //         uploadSquareLogo: string;
  //         legalCompliances: string;
  //       };
  //       brandDetails: {
  //         id: string;
  //         createdAt: Date;
  //         updatedAt: Date;
  //         age: string;
  //         location: string;
  //         brandAssets: string[];
  //         brandDetails: string;
  //       };
  //       socialMedia: {
  //         id: string;
  //         createdAt: Date;
  //         updatedAt: Date;
  //         topProductsServicesCategories: string;
  //         facebookLink: string;
  //         instagramLink: string;
  //         linkedinLink: string;
  //         xLink: string;
  //         youtubeLink: string;
  //       };
  //     }
  //   | null
  //   | undefined;
}) {
  const router = useRouter();
  const id = router.query.id;

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
        {id && (
          <div className="flex w-full gap-4 overflow-y-scroll bg-primary p-1 md:h-44 md:gap-x-6 md:gap-y-6 md:p-2">
            {brandAssetsUrls?.map((brandAsset, index) => (
              <div key={index} className="relative">
                <img src={brandAsset} alt="" className="h-20 md:h-40" />
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    const updatedUrls = brandAssetsUrls?.filter(
                      (url) => url !== brandAsset
                    );
                    setBrandAssetsUrls && setBrandAssetsUrls(updatedUrls);
                    formData.setValues((prev) => ({
                      ...prev,
                      logos: updatedUrls,
                    }));
                  }}
                  className="absolute bottom-1 left-1 z-20"
                >
                  <CrossCircledIcon />
                </button>
              </div>
            ))}
          </div>
        )}
        <FileInput
          className="w-full"
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
