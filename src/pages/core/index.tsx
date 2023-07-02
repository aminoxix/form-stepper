import React, { FormEvent, useState } from "react";

// Layout
import MainLayout from "../layout";
import { FormData } from "@/types";
import { initialSteps, INITIAL_DATA } from "@/data";

// Hooks
import { useMultiStepForm } from "@/hooks/useMultistepForm";

// Components
import Stepper from "@/components/core/Stepper";

// forms
import { CompanyOverviewForm } from "@/components/core/forms/CompanyOverview";
import { SocialMediaForm } from "@/components/core/forms/SocialMedia";
import { BrandDetailsForm } from "@/components/core/forms/BrandDetails";

const Core = () => {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [steps, setSteps] = useState(initialSteps); // State to store the steps

  function updateFields(fields: Partial<FormData>) {
    setFormData((prevData) => {
      return { ...prevData, ...fields };
    });
  }

  const { currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <CompanyOverviewForm key={0} {...formData} updateFields={updateFields} />,
      <SocialMediaForm key={1} {...formData} updateFields={updateFields} />,
      <BrandDetailsForm key={2} {...formData} updateFields={updateFields} />,
    ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    setSteps((prevSteps) => {
      const updatedSteps = [...prevSteps];
      updatedSteps[currentStepIndex]!.status = "complete";
      return updatedSteps;
    });
  }

  return (
    <MainLayout>
      <div className="font-inter mx-2 my-5 flex flex-1 flex-col justify-between md:ml-12 md:mr-24 ">
        <div className="flex flex-col flex-1 justify-between">
          <Stepper steps={steps} currentStep={currentStepIndex} />
          <div className="w-full rounded px-4">
            <form onSubmit={onSubmit}>
              {step}
              <div className="mt-16 flex justify-around gap-4">
                {!isFirstStep && (
                  <button
                    type="button"
                    onClick={back}
                    className="flex w-32 justify-center rounded-md bg-gray-300 px-8 py-2 font-bold text-gray-800 hover:bg-gray-400"
                  >
                    Back
                  </button>
                )}
                <button
                  className="flex w-32 justify-center rounded-md bg-black px-8 py-2 font-bold text-white hover:bg-black"
                  type="button"
                  onClick={
                    !isLastStep
                      ? next
                      : () => {
                          console.log(formData);
                        }
                  }
                >
                  {steps.length - 1 === currentStepIndex && isLastStep
                    ? "Save"
                    : "Next"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Core;
