import React from "react";
import { FormWrapper } from "@/components/FormWrapper";

import { BrandDetailsFormProps } from "@/types";

export function BrandDetailsForm({
  age,
  location,
  brandAssets,
  brandDetails,
  updateFields,
}: BrandDetailsFormProps) {
  const handleInputChange = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;
    updateFields({ [name]: value });
  };

  return (
    <FormWrapper className="flex flex-col gap-2 text-black">
      <label>Since how long have you been in business?</label>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <label>Years</label>
        <input
          className="w-1/2 border rounded-md border-black h-8"
          autoFocus
          required
          type="text"
          name="age"
          value={age}
          onChange={handleInputChange}
        />
        <label>Location</label>
        <input
          className="w-1/2 border rounded-md border-black h-8"
          autoFocus
          required
          type="text"
          name="location"
          value={location}
          onChange={handleInputChange}
        />
      </div>
      <label>Upload your brand assets or merchandise resources below...</label>
      <input
        className="w-full border rounded-md border-black h-8"
        multiple
        onChange={(files) => {
          console.log(files.target.files);
        }}
      />
      <label>Any other details you would like to share about your brand?</label>
      <input
        className="w-full border rounded-md border-black h-8"
        autoFocus
        required
        type="text"
        name="brandDetails"
        value={brandDetails}
        onChange={handleInputChange}
      />
    </FormWrapper>
  );
}
