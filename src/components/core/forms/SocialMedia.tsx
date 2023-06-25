import React from "react";
import { FormWrapper } from "@/components/FormWrapper";

import { socialIconsData } from "@/data";
import { SocialMediaLink, CompanyOverviewFormProps } from "@/types";

import { SocialsServicesFormProps } from "@/types";

export function SocialMediaForm({
  topProductsServicesCategories,
  socialMediaLinks,
  updateFields,
}: SocialsServicesFormProps) {
  const handleInputChange = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;
    updateFields({ [name]: value });
  };

  const handleSocialPlatformChange = (
    index: number,
    field: keyof SocialMediaLink,
    value: string
  ) => {
    const updatedLinks = [...(socialMediaLinks || [])];
    updatedLinks[index] = {
      ...(updatedLinks[index] || ({} as SocialMediaLink)),
      [field]: value,
    };
    updateFields({ socialMediaLinks: updatedLinks });
  };

  const handleAddSocialPlatform = () => {
    const updatedLinks = [
      ...(socialMediaLinks || []),
      { platform: "", url: "" },
    ];
    updateFields({ socialMediaLinks: updatedLinks });
  };

  return (
    <FormWrapper className="flex flex-col gap-2 text-black">
      <label>What are your top products, services & categories?</label>
      <input
        className="w-full border rounded-md border-black h-8"
        autoFocus
        required
        type="text"
        name="topProductsServicesCategories"
        value={topProductsServicesCategories}
        onChange={handleInputChange}
      />
      <>
        <label>What are your social media links?</label>
        {socialMediaLinks?.map((link, index) => (
          <div className="flex w-ful" key={index}>
            <select
              className="w-1/3 border rounded-md border-black h-8"
              placeholder="Pick one"
              name="platform"
              value={link.platform || ""}
              onChange={(e) =>
                handleSocialPlatformChange(
                  index,
                  "platform",
                  e.target.value || ""
                )
              }
            >
              {socialIconsData.map((social, index) => (
                <option
                  key={index}
                  className="flex gap-4 border rounded-md border-black h-8"
                  value={link.platform}
                  selected={link.platform === social.label}
                >
                  {social.label}
                </option>
              ))}
            </select>
            <input
              className="w-full border rounded-md border-black h-8"
              autoFocus
              type="text"
              name="url"
              value={link.url || ""}
              onChange={(e) =>
                handleSocialPlatformChange(index, "url", e.target.value)
              }
            />
          </div>
        ))}
        <div className="flex justify-end">
          <button
            className="w-fit text-black border rounded-md border-black h-8"
            onClick={handleAddSocialPlatform}
            type="button"
          >
            Add more
          </button>
        </div>
      </>
    </FormWrapper>
  );
}
