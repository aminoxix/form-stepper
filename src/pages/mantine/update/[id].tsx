/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";

import React, { type FormEvent, useState, useEffect } from "react";

import MainLayout from "@/pages/layout";

import type { FormDataType } from "@/types";
import { INITIAL_MANTINE_DATA, initialSteps } from "@/data";

import { Button, Group, Modal } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";

import { useForm } from "@mantine/form";
import { CompanyOverviewForm } from "@/components/mantine/forms/CompanyOverview";
import { SocialMediaForm } from "@/components/mantine/forms/SocialMedia";
import { BrandDetailsForm } from "@/components/mantine/forms/BrandDetails";

import MantineStepper from "@/components/mantine/Stepper";

import { storage } from "@/firebase/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { api } from "@/utils/api";

const UpdateStepperForm = () => {
  const router = useRouter();
  const stepperFormId = router.query.id as string;

  const [active, setActive] = useState(1);
  const [squareLogoFile, setSquareLogoFile] = useState<string>("");
  const [brandAssetsFiles, setBrandAssetsFiles] = useState<string[]>([]);
  const [brandAssetsUrls, setBrandAssetsUrls] = useState<string[]>([]);

  const [facebookLink, setFacebookLink] = useState<string>("");
  const [twitterLink, setTwitterLink] = useState<string>("");
  const [instagramLink, setInstagramLink] = useState<string>("");
  const [linkedinLink, setLinkedInLink] = useState<string>("");
  const [youtubeLink, setYouTubeLink] = useState<string>("");

  const [opened, { open, close }] = useDisclosure(false);

  const { mutate: updateStepperForm } =
    api.stepper.updateStepperForm.useMutation({
      onSuccess: () => {
        router.push("/mantine");
        notifications.show({
          title: "Updated Successfully",
          message: "Form has been updated successfully!",
          color: "green",
        });
      },
      onError: (error) => {
        console.log("Error updating stepper form", error);
        notifications.show({
          title: "Update Unsuccessful",
          message: `Form has been failed to update ${error.message}`,
          color: "red",
        });
      },
    });

  const formData = useForm<FormDataType>({
    initialValues: INITIAL_MANTINE_DATA,
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
      privacyPolicy: (value) =>
        value.length < 2 ? "Privacy policy is too short" : null,
      brandAssets: (value) =>
        value?.length === 0 ? "Please upload brand assets" : null,
      topProductsServicesCategories: (value) =>
        value.length < 2
          ? "Please write more about your top products, services & categories"
          : null,
      socialMediaLinks: (value) =>
        value.length < 0 ? "Please add at least one social media link" : null,
      age: (value) => {
        return /^\d+$/.test(value?.toString())
          ? null
          : "Please enter only numbers";
      },
      location: (value) =>
        value?.length < 2 ? "Target audience location is not valid" : null,
      brandDetails: (value) =>
        value?.length < 2 ? "Market exploration is too short" : null,
    },
  });

  const { data: stepperFormData, mutate: getStepperFormDataMutation } =
    api.stepper.getStepperForm.useMutation({
      onSuccess: (data) => {
        if (data) {
          setFacebookLink(data.socialMedia.facebookLink as string);
          setInstagramLink(data.socialMedia.instagramLink as string);
          setLinkedInLink(data.socialMedia.linkedinLink as string);
          setTwitterLink(data.socialMedia.xLink as string);
          setYouTubeLink(data.socialMedia.youtubeLink as string);
          setBrandAssetsUrls(data.brandDetails.brandAssets ?? []);
          formData.setValues({
            companyName: data.companyOverview.companyName,
            companyURL: data.companyOverview.companyWebsite ?? "",
            companyEmail: data.companyOverview.companyEmail,
            uploadSquareLogo: data.companyOverview.uploadSquareLogo,
            privacyPolicy: data.companyOverview.legalCompliances,
            topProductsServicesCategories:
              data.socialMedia.topProductsServicesCategories,
            age: data.brandDetails.age,
            location: data.brandDetails.location,
            brandDetails: data.brandDetails.brandDetails,
          });
        }
      },
    });

  useEffect(() => {
    getStepperFormDataMutation({
      stepperId: stepperFormId,
    });
  }, [getStepperFormDataMutation, stepperFormId]);

  const updateFieldValue = (name: string, value: any) => {
    formData.setFieldValue(name, value);
  };

  const handleFileUpload = async (
    files: File | File[] | null,
    fieldName: string
  ) => {
    if (!files) return;

    if (files instanceof File) {
      // Single file upload
      const reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = () => {
        const fileUrl = reader.result as string;
        if (fieldName === "uploadSquareLogo") {
          setSquareLogoFile(fileUrl);
        } else {
          console.error("Invalid");
        }
      };
    } else if (Array.isArray(files)) {
      // Multiple file upload
      const fileArray = Array.from(files);
      const fileUrls = await Promise.all(
        fileArray.map(async (file) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          return new Promise<string>((resolve) => {
            reader.onload = () => {
              const fileUrl = reader.result as string;
              resolve(fileUrl);
            };
          });
        })
      );

      if (fieldName === "brandAssets") {
        setBrandAssetsFiles(fileUrls);
      } else {
        console.error("Invalid field name");
      }
    } else {
      console.error("Files parameter is not valid.");
    }
  };

  const uploadFileOnFirebase = async (files: string | string[]) => {
    if (typeof files === "string") {
      // Single file upload
      const response = await fetch(files);
      const blob = await response.blob();

      if (blob.size > 0) {
        const fileRef = ref(
          storage,
          `images/stepper-form/${
            formData.values.companyName
          }-${new Date().getTime()}`
        );
        await uploadBytes(fileRef, blob);
        const attachedFileUrl = await getDownloadURL(fileRef);
        return attachedFileUrl;
      }
      return null;
    } else if (Array.isArray(files)) {
      // Multiple files upload
      const uploadPromises = files.map(async (fileUrl) => {
        const fileRef = ref(
          storage,
          `images/stepper-form/${
            formData.values.companyName
          }-${new Date().getTime()}`
        );
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        await uploadBytes(fileRef, blob);
        const attachedFileUrl = await getDownloadURL(fileRef);
        return attachedFileUrl;
      });
      const attachedFileUrls = await Promise.all(uploadPromises);
      return attachedFileUrls;
    }
    return null;
  };

  const fileUpload = async (e: FormEvent) => {
    e.preventDefault();
    // toggle();
    // Single file upload
    if (squareLogoFile && typeof squareLogoFile === "string") {
      const squareLogoUrl = await uploadFileOnFirebase(squareLogoFile);
      if (squareLogoUrl && typeof squareLogoUrl === "string") {
        // setUploadingOverlay(true);
        formData.setFieldValue("uploadSquareLogo", squareLogoUrl);
      }
    }

    if (Array.isArray(brandAssetsFiles)) {
      // Multiple file upload
      const brandAssetUrls = (await Promise.all(
        brandAssetsFiles.map(async (file) => uploadFileOnFirebase(file))
      )) as string[];
      // setUploadingOverlay(true);

      formData.setFieldValue(
        "brandAssets",
        stepperFormData
          ? [...brandAssetsUrls, ...brandAssetUrls]
          : brandAssetsUrls
      );

      // setUploadingOverlay(true);
    }

    // setUploadingOverlay(false);
    open();
  };

  const onFormSubmit = (e: FormEvent) => {
    formData.values.socialMediaLinks.map((link) => {
      if (link.platform === "Facebook") {
        setFacebookLink(link.url);
      }
      if (link.platform === "Twitter") {
        setTwitterLink(link.url);
      }
      if (link.platform === "Instagram") {
        setInstagramLink(link.url);
      }
      if (link.platform === "LinkedIn") {
        setLinkedInLink(link.url);
      }
      if (link.platform === "YouTube") {
        setYouTubeLink(link.url);
      }
    });

    e.preventDefault();
    updateStepperForm({
      id: stepperFormId,
      companyOverViewData: {
        companyName: formData.values.companyName,
        companyEmail: formData.values.companyEmail,
        companyWebsite: formData.values.companyURL,
        uploadSquareLogo: formData.values.uploadSquareLogo,
        legalCompliances: formData.values.privacyPolicy,
      },
      brandDetailsData: {
        age: formData.values.age,
        location: formData.values.location,
        brandAssets: formData.values.brandAssets,
        brandDetails: formData.values.brandDetails,
      },
      socialMediaData: {
        facebookLink: facebookLink,
        instagramLink: instagramLink,
        linkedinLink: linkedinLink,
        xLink: twitterLink,
        youtubeLink: youtubeLink,
        topProductsServicesCategories:
          formData.values.topProductsServicesCategories,
      },
    });
  };

  const handleFilesUpload = async (e: FormEvent) => {
    e.preventDefault();
    open();
    await fileUpload(e);
  };

  const nextStep = () =>
    setActive((current) =>
      current < initialSteps.length ? current + 1 : current
    );
  const prevStep = () =>
    setActive((current) => (current > 1 ? current - 1 : current));

  const fieldValues = [
    {
      id: 1,
      name: "What is your Company's Name?",
      value:
        formData.values.companyName.charAt(0).toUpperCase() +
        formData.values.companyName.slice(1),
    },
    {
      id: 2,
      name: "What is your company's URL?",
      value: formData.values.companyURL,
    },
    {
      id: 3,
      name: "What is your company's email address?",
      value: formData.values.companyEmail,
    },
    {
      id: 4,
      name: " What are your social media links?",
      value: formData.values.socialMediaLinks.map((val) => {
        return (
          <>
            {stepperFormData ? (
              <div className="flex flex-col gap-2">
                {stepperFormData.socialMedia.facebookLink !== "" && (
                  <>
                    <span className="font-semibold">Facebook: </span>
                    <span>{stepperFormData.socialMedia.facebookLink}</span>
                  </>
                )}
                {stepperFormData.socialMedia.linkedinLink !== "" && (
                  <>
                    <span className="font-semibold">LinkedIn: </span>
                    <span>{stepperFormData.socialMedia.linkedinLink}</span>
                  </>
                )}
                {stepperFormData.socialMedia.instagramLink !== "" && (
                  <>
                    <span className="font-semibold">Instagram: </span>
                    <span>{stepperFormData.socialMedia.instagramLink}</span>
                  </>
                )}
                {stepperFormData.socialMedia.xLink !== "" && (
                  <>
                    <span className="font-semibold">Twitter/ X: </span>
                    <span>{stepperFormData.socialMedia.xLink}</span>
                  </>
                )}
                {stepperFormData.socialMedia.youtubeLink !== "" && (
                  <>
                    <span className="font-semibold">YouTube: </span>
                    <span>{stepperFormData.socialMedia.youtubeLink}</span>
                  </>
                )}
              </div>
            ) : (
              <div key={val.platform}>
                <span className="font-semibold">{val.platform}: </span>
                <span>{val.url}</span>
              </div>
            )}
          </>
        );
      }),
    },
    {
      id: 5,
      name: "Are there any legal, privacy, or compliance requirements we should be aware of?",
      value:
        formData.values.privacyPolicy.charAt(0).toUpperCase() +
        formData.values.privacyPolicy.slice(1),
    },
    {
      id: 6,
      name: "What are your top products, services & categories?",
      value:
        formData.values.topProductsServicesCategories?.charAt(0).toUpperCase() +
        formData.values.topProductsServicesCategories?.slice(1),
    },
  ];

  return (
    <MainLayout>
      <Modal
        opened={opened}
        onClose={close}
        closeOnEscape
        withCloseButton={false}
        size="70%"
        title="Review Company Information"
        styles={{
          title: {
            textAlign: "center",
            color: "#3E3E3E",
            width: "100%",
            fontSize: "24px",
            fontWeight: 600,
          },
        }}
      >
        <div className="mx-2 flex flex-col gap-7 rounded-md border-2 border-black bg-primary px-2 md:mx-10 md:px-10 md:py-5">
          {/* {!isUpdatedBrandGuidelines && ( */}
          {
            <>
              {fieldValues.map((val) => {
                const { id, name, value } = val;
                return (
                  <div className="flex flex-col gap-2" key={id}>
                    <p className="text-lg font-semibold">
                      {name ? name : null}
                    </p>
                    <div>{value ? value : null}</div>
                  </div>
                );
              })}
            </>
          }
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">Uploaded Images:</p>
            <div className="flex flex-col gap-4">
              <div>
                <strong>Logo:</strong>
                <img
                  src={formData.values.uploadSquareLogo}
                  alt="Logo"
                  className="h-20 pt-2 md:h-40"
                />
              </div>
              <div>
                <strong>Brand Assets:</strong>
                <div className="flex gap-3 overflow-y-scroll p-1 md:h-44 md:gap-x-6 md:gap-y-6 md:p-2">
                  {formData.values.brandAssets.map((brandAsset, index) => (
                    <img
                      key={index}
                      src={brandAsset}
                      alt={`Logo ${index + 1}`}
                      className="h-20 md:h-40"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Group position="center" className="pt-3">
          <Button
            className="bg-black px-7 text-sm font-normal hover:bg-black"
            onClick={(e) => {
              close();
              onFormSubmit(e);
            }}
          >
            Submit
          </Button>
        </Group>
      </Modal>
      <MantineStepper active={active} setActive={setActive} />
      {active === 1 && (
        <CompanyOverviewForm
          formData={formData}
          updateFieldValue={updateFieldValue}
          handleFileUpload={handleFileUpload}
        />
      )}
      {active === 2 && (
        <SocialMediaForm
          formData={formData}
          updateFieldValue={updateFieldValue}
          facebookLink={facebookLink}
          setFacebookLink={setFacebookLink}
          linkedinLink={linkedinLink}
          setLinkedInLink={setLinkedInLink}
          twitterLink={twitterLink}
          setTwitterLink={setTwitterLink}
          instagramLink={instagramLink}
          setInstagramLink={setInstagramLink}
          youtubeLink={youtubeLink}
          setYouTubeLink={setYouTubeLink}
        />
      )}
      {active === 3 && (
        <BrandDetailsForm
          formData={formData}
          updateFieldValue={updateFieldValue}
          handleFileUpload={handleFileUpload}
          brandAssetsUrls={brandAssetsUrls}
          setBrandAssetsUrls={setBrandAssetsUrls}
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
          onClick={active < initialSteps.length ? nextStep : handleFilesUpload}
        >
          {active < initialSteps.length ? "Next step" : "Save"}
        </Button>
      </Group>
    </MainLayout>
  );
};

export default UpdateStepperForm;
