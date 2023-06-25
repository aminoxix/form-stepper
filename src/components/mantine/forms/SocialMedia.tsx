import React, { forwardRef } from "react";

import { type UseFormReturnType } from "@mantine/form";
import type { FormDataType } from "@/types";

import { TextInput, Select, Text, Group, Avatar } from "@mantine/core";
import { FormWrapper } from "@/components/FormWrapper";

import { socialIconsData as data } from "@/data";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(function SelectItem(
  { image, label, ...props }: ItemProps,
  ref
) {
  return (
    <div ref={ref} {...props}>
      <Group noWrap>
        <Avatar src={image} />
        <Text size="sm">{label}</Text>
      </Group>
    </div>
  );
});
SelectItem.displayName = "SelectItem";

export function SocialMediaForm({
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
          required
          type="text"
          name="topProductsServicesCategories"
          {...formData.getInputProps("topProductsServicesCategories")}
          onChange={(value) => {
            updateFieldValue(
              "topProductsServicesCategories",
              value.currentTarget.value
            );
          }}
          label="What are your top products, services & categories?"
        />
        <>
          <Text className="text-sm font-medium">
            What are your social media links?
          </Text>
          {formData.values.socialMediaLinks?.map((link, index) => (
            <div className="flex w-full" key={index}>
              <Select
                placeholder="Pick one"
                itemComponent={SelectItem}
                data={data.map((option) => ({
                  ...option,
                  disabled: formData.values.socialMediaLinks?.some(
                    (value) => value.platform === option.value
                  ),
                }))}
                name="platform"
                searchable
                clearable
                required
                withAsterisk
                maxDropdownHeight={400}
                nothingFound="Nobody here"
                filter={(value, item) =>
                  item.label
                    ?.toLowerCase()
                    .includes(value.toLowerCase().trim()) || false
                }
                {...formData.getInputProps(
                  `socialMediaLinks.${index}.platform`
                )}
                onChange={(value) => {
                  updateFieldValue(`socialMediaLinks.${index}.platform`, value);
                }}
              />
              <TextInput
                className="w-full"
                autoFocus
                withAsterisk
                required
                type="text"
                name="url"
                {...formData.getInputProps(`socialMediaLinks.${index}.url`)}
                label=""
                onChange={(value) => {
                  updateFieldValue(
                    `socialMediaLinks.${index}.url`,
                    value.currentTarget.value
                  );
                }}
              />
            </div>
          ))}
          <div className="flex justify-end">
            <button
              className="w-fit text-black"
              onClick={() => {
                const updatedLinks = [
                  ...(formData.values.socialMediaLinks || []),
                  { platform: "", url: "" },
                ];
                formData.setFieldValue("socialMediaLinks", updatedLinks);
              }}
              type="button"
            >
              Add more
            </button>
          </div>
        </>
      </form>
    </FormWrapper>
  );
}
