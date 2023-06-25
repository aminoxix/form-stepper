import { useRouter } from "next/router";

import React, { type FormEvent, useState } from "react";

import MainLayout from "../layout";

import type { FormDataType } from "@/types";
import { INITIAL_DATA, initialSteps } from "@/data";

import { Button, Group, Modal, Notification } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useForm } from "@mantine/form";
import { CompanyOverviewForm } from "@/components/mantine/forms/CompanyOverview";
import { SocialMediaForm } from "@/components/mantine/forms/SocialMedia";
import { BrandDetailsForm } from "@/components/mantine/forms/BrandDetails";

import MantineStepper from "@/components/mantine/Stepper";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/firebase/firebase-config";
import { doc, updateDoc } from "firebase/firestore";

const Onboarding = () => {
  const [active, setActive] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);

  const formData = useForm<FormDataType>({
    initialValues: INITIAL_DATA,
    validateInputOnChange: true,
    validate: {
      companyName: (value) =>
        value.length <= 2 ? "Company name is too short" : null,
      companyURL: (value) => {
        const regex = /^(http(s)?:\/\/)?[\w.-]+\.[a-z]{2,6}(:\d{1,5})?(\/.*)?$/;
        return regex.test(value) ? null : "Invalid URL";
      },
      companyEmail: (value) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(value) ? null : "Invalid email";
      },
      uploadSquareLogo: (value) =>
        value?.length === 0 ? "Please upload a square logo" : null,
      brandAssets: (value) =>
        value?.length === 0 ? "Please upload brand assets" : null,
      socialMediaLinks: (value) =>
        value.length < 0 ? "Please add at least one social media link" : null,
      privacyPolicy: (value) =>
        value.length < 2 ? "Privacy policy is too short" : null,
      age: (value) => {
        return /^\d+$/.test(value.toString())
          ? null
          : "Please enter only numbers";
      },
      location: (value) =>
        value.length < 2 ? "Target audience location is not valid" : null,
      brandDetails: (value) =>
        value.length < 2 ? "Market exploration is too short" : null,
    },
  });

  const updateFieldValue = (name: string, value: any) => {
    formData.setFieldValue(name, value);
  };

  const saveNewOnboardingFormImages = async (files: File[]) => {
    const promises = [];
    for (const file of files) {
      const storageRef = ref(
        storage,
        `images/onboarding-form/${formData.values.companyEmail}/${
          formData.values.companyName
        }-${new Date().getTime()}.zip`
      );

      const uploadPromise = uploadBytes(storageRef, file);
      promises.push(uploadPromise);
    }

    try {
      const snapshots = await Promise.all(promises);
      const downloadURLs = await Promise.all(
        snapshots.map((snapshot) => getDownloadURL(snapshot.ref))
      );

      await updateDoc(doc(db, "onboarding-test", formData.values.companyName), {
        images: downloadURLs,
      });

      console.log("downloadURLs", downloadURLs);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    open();
    void saveNewOnboardingFormImages([
      formData.values?.uploadSquareLogo,
    ] as File[]);
    void saveNewOnboardingFormImages(formData.values?.brandAssets as File[]);
    console.log("data", formData.values);
  };

  const nextStep = () =>
    setActive((current) =>
      current < initialSteps.length ? current + 1 : current
    );
  const prevStep = () =>
    setActive((current) => (current > 1 ? current - 1 : current));
  return (
    <MainLayout>
      <Modal opened={opened} onClose={close} title="Onboarding Form Data">
        <div className="flex flex-col gap-7">
          {Object.entries(formData.values).map(([key, value]) => (
            <div className="font-normal" key={key}>
              <span className="font-bold uppercase">
                {key?.split(/(?=[A-Z])/).join(" ")}
              </span>
              :<>{JSON.stringify(value)}</>
            </div>
          ))}
          <Group position="center">
            <Button
              className="bg-black hover:bg-gray-800"
              onClick={() => {
                close();
                formData.reset();
                alert("Form submitted successfully!");
              }}
            >
              Agree and Continue
            </Button>
          </Group>
        </div>
      </Modal>
      <MantineStepper active={active} setActive={setActive} />
      {active === 1 && (
        <CompanyOverviewForm
          formData={formData}
          updateFieldValue={updateFieldValue}
        />
      )}
      {active === 2 && (
        <SocialMediaForm
          formData={formData}
          updateFieldValue={updateFieldValue}
        />
      )}
      {active === 3 && (
        <BrandDetailsForm
          formData={formData}
          updateFieldValue={updateFieldValue}
        />
      )}
      <Group position="center" mt="xl">
        {active > 1 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        <Button
          className="bg-black hover:bg-gray-800"
          onClick={active < initialSteps.length ? nextStep : onSubmitForm}
        >
          {active < initialSteps.length ? "Next step" : "Save"}
        </Button>
      </Group>
    </MainLayout>
  );
};

export default Onboarding;
