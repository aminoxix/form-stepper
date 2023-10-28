import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCClientError } from "@trpc/client";

export const stepperFormRouter = createTRPCRouter({
  addStepperForm: publicProcedure
    .input(
      z.object({
        companyOverViewData: z.object({
          companyName: z.string(),
          companyEmail: z.string(),
          companyWebsite: z.string().optional(),
          uploadSquareLogo: z.string(),
          legalCompliances: z.string(),
        }),
        socialMediaData: z.object({
          topProductsServicesCategories: z.string(),
          facebookLink: z.string(),
          instagramLink: z.string(),
          linkedinLink: z.string(),
          xLink: z.string(),
          youtubeLink: z.string(),
        }),
        brandDetailsData: z.object({
          age: z.string(),
          location: z.string(),
          brandAssets: z.string().array(),
          brandDetails: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const createdCompanyOverview = await ctx.db.companyOverview.create({
        data: {
          ...input.companyOverViewData,
        },
      });

      const createdSocialMedia = await ctx.db.socialMediaDetails.create({
        data: {
          ...input.socialMediaData,
        },
      });
      const createdBrandGuideline = await ctx.db.brandDetails.create({
        data: {
          ...input.brandDetailsData,
        },
      });

      return await ctx.db.stepperForm.create({
        data: {
          companyOverview: {
            connect: {
              id: createdCompanyOverview?.id,
            },
          },
          socialMedia: {
            connect: {
              id: createdSocialMedia?.id,
            },
          },
          brandDetails: {
            connect: {
              id: createdBrandGuideline?.id,
            },
          },
        },
      });
    }),
  getStepperForm: publicProcedure
    .input(
      z.object({
        stepperId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const stepperForm = await ctx.db.stepperForm.findUnique({
        where: {
          id: input.stepperId,
        },
      });
      return stepperForm;
    }),
  getAllStepperForm: publicProcedure.query(async ({ ctx }) => {
    const formData = await ctx.db.stepperForm.findMany({
      select: {
        id: true,
        brandDetails: true,
        companyOverview: true,
        socialMedia: true,
      },
    });
    return formData;
  }),
  deleteMultipleStepperForm: publicProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const deletedStepperFormData = await ctx.db.stepperForm.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });

      return deletedStepperFormData.count;
    }),

  // TODO: update
  // updateStepperForm: publicProcedure
  //   .input(
  //     z.object({
  //       companyOverViewData: z
  //         .object({
  //           companyName: z.string().optional(),
  //           displayedCompanyName: z.string().optional(),
  //           companyWebsite: z.string().optional(),
  //           // uploadSquareLogo: z.string(),
  //           // horizontalLogo: z.string(),
  //           facebookLink: z.string().optional(),
  //           instagramLink: z.string().optional(),
  //           linkedinLink: z.string().optional(),
  //           twitterLink: z.string().optional(),
  //           youtubeLink: z.string().optional(),
  //           briefHistoryAndBackground: z.string().optional(),
  //           competitorsUrl: z.string().array().optional(),
  //           betterThanCompetitors: z.string().optional(),
  //           toneOfCompany: z.string().optional(),
  //           legalCompliances: z.string().optional(),
  //         })
  //         .optional(),
  //       socialMediaData: z
  //         .object({
  //           productsAndServicesOffered: z.string().optional(),
  //           topProducts: z.string().optional(),
  //         })
  //         .optional(),
  //       targetAudienceData: z
  //         .object({
  //           targetAudienceAge: z.number().optional(),
  //           targetAudienceGender: z.string().optional(),
  //           targetAudienceLocation: z.string().optional(),
  //           secondaryMarketToExplore: z.string().optional(),
  //           targetingBusinessesOrIndividuals: z.string().optional(),
  //           targetEntitiesDetails: z.string().optional(),
  //         })
  //         .optional(),
  //       measurementAndReportingData: z
  //         .object({
  //           successOfMarketingEfforts: z.string().optional(),
  //           expectationsForMarketing: z
  //             .array(
  //               z.object({
  //                 type: z.string().optional(),
  //                 details: z.string().optional(),
  //               })
  //             )
  //             .optional(),
  //         })
  //         .optional(),
  //       brandDetailsData: z
  //         .object({
  //           logos: z.string().array().optional(),
  //           colorPalette: z.string().array().optional(),
  //           designIntegrationLibrary: z.string().array().optional(),
  //           brandIllustrations: z.string().array().optional(),
  //           font: z.string().optional(),
  //           tagline: z.string().optional(),
  //           iconography: z.string().optional(),
  //           advertisingGraphicDesignFile: z.string().optional(),
  //           brandGuidelineDocument: z.string().optional(),
  //         })
  //         .optional(),
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     if (!ctx.session.user.organizationId) {
  //       throw new TRPCClientError("No organization found for this user.");
  //     }
  //     const organizationData = await ctx.db.organization.findUnique({
  //       where: {
  //         id: ctx.session.user.organizationId,
  //       },
  //       select: {
  //         StepperForm: true,
  //       },
  //     });
  //     if (!organizationData?.StepperForm) {
  //       throw new TRPCClientError(
  //         "No stepper form found for this organization."
  //       );
  //     }

  //     const stepperData = await ctx.db.stepperForm.findUnique({
  //       where: {
  //         id: organizationData.StepperForm.id,
  //       },
  //       select: {
  //         companyOverviewId: true,
  //         productsAndServicesId: true,
  //         targetAudienceId: true,
  //         measurementAndReportingId: true,
  //         brandGuidelineId: true,
  //       },
  //     });

  //     const createdCompanyOverview = await ctx.db.companyOverview.update({
  //       where: {
  //         id: stepperData?.companyOverviewId,
  //       },
  //       data: {
  //         ...input.companyOverViewData,
  //       },
  //     });
  //     const createdProductsAndServices =
  //       await ctx.db.socialMedia.update({
  //         where: {
  //           id: stepperData?.productsAndServicesId,
  //         },
  //         data: {
  //           ...input.socialMediaData,
  //         },
  //       });
  //     const createdTargetAudience = await ctx.db.targetAudience.update({
  //       where: {
  //         id: stepperData?.targetAudienceId,
  //       },
  //       data: {
  //         ...input.targetAudienceData,
  //       },
  //     });
  //     const createdMeasurementAndReporting =
  //       await ctx.db.measurementAndReporting.update({
  //         where: {
  //           id: stepperData?.measurementAndReportingId,
  //         },
  //         data: {
  //           ...input.measurementAndReportingData,
  //         },
  //       });
  //     const createdBrandGuideline = await ctx.db.brandDetails.update({
  //       where: {
  //         id: stepperData?.brandGuidelineId,
  //       },
  //       data: {
  //         ...input.brandDetailsData,
  //       },
  //     });

  //     if (ctx.session.user.organizationId === null) {
  //       throw new TRPCClientError("No organization found for this user.");
  //     }
  //     const stepperFormExist = await ctx.db.stepperForm.count({
  //       where: {
  //         organization: {
  //           id: ctx.session.user.organizationId,
  //         },
  //       },
  //     });

  //     if (stepperFormExist === 0) {
  //       if (ctx.session.user.organizationId === null) {
  //         throw new TRPCClientError("No organization found for this user.");
  //       }
  //       return await ctx.db.stepperForm.create({
  //         data: {
  //           companyOverview: {
  //             connect: {
  //               id: createdCompanyOverview?.id,
  //             },
  //           },
  //           socialMedia: {
  //             connect: {
  //               id: createdProductsAndServices?.id,
  //             },
  //           },
  //           targetAudience: {
  //             connect: {
  //               id: createdTargetAudience?.id,
  //             },
  //           },
  //           measurementAndReporting: {
  //             connect: {
  //               id: createdMeasurementAndReporting?.id,
  //             },
  //           },
  //           brandDetails: {
  //             connect: {
  //               id: createdBrandGuideline?.id,
  //             },
  //           },
  //           organization: {
  //             connect: {
  //               id: ctx.session.user.organizationId,
  //             },
  //           },
  //         },
  //       });
  //     } else {
  //       return new TRPCClientError("Stepper form already exist");
  //     }
  //   }),
  // updateCompanyOverview: publicProcedure
  //   .input(
  //     z.object({
  //       companyName: z.string().optional(),
  //       displayedCompanyName: z.string().optional(),
  //       companyWebsite: z.string().optional(),
  //       facebookLink: z.string().optional(),
  //       instagramLink: z.string().optional(),
  //       linkedinLink: z.string().optional(),
  //       twitterLink: z.string().optional(),
  //       youtubeLink: z.string().optional(),
  //       briefHistoryAndBackground: z.string().optional(),
  //       competitorsUrl: z.string().array().optional(),
  //       betterThanCompetitors: z.string().optional(),
  //       toneOfCompany: z.string().optional(),
  //       legalCompliances: z.string().optional(),
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     if (!ctx.session.user.organizationId) {
  //       throw new TRPCClientError("No organization found for this user.");
  //     }
  //     const organizationData = await ctx.db.organization.findUnique({
  //       where: {
  //         id: ctx.session.user.organizationId,
  //       },
  //       select: {
  //         StepperForm: true,
  //       },
  //     });
  //     if (!organizationData?.StepperForm) {
  //       throw new TRPCClientError(
  //         "No stepper form found for this organization."
  //       );
  //     }

  //     const stepperData = await ctx.db.stepperForm.findUnique({
  //       where: {
  //         id: organizationData.StepperForm.id,
  //       },
  //       select: {
  //         companyOverviewId: true,
  //       },
  //     });

  //     return await ctx.db.companyOverview.update({
  //       where: {
  //         id: stepperData?.companyOverviewId,
  //       },
  //       data: {
  //         ...input,
  //       },
  //     });
  //   }),
  // updateProductsAndServices: publicProcedure
  //   .input(
  //     z.object({
  //       productsAndServicesOffered: z.string().optional(),
  //       topProducts: z.string().optional(),
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     if (!ctx.session.user.organizationId) {
  //       throw new TRPCClientError("No organization found for this user.");
  //     }
  //     const organizationData = await ctx.db.organization.findUnique({
  //       where: {
  //         id: ctx.session.user.organizationId,
  //       },
  //       select: {
  //         StepperForm: true,
  //       },
  //     });
  //     if (!organizationData?.StepperForm) {
  //       throw new TRPCClientError(
  //         "No stepper form found for this organization."
  //       );
  //     }

  //     const stepperData = await ctx.db.stepperForm.findUnique({
  //       where: {
  //         id: organizationData.StepperForm.id,
  //       },
  //       select: {
  //         productsAndServicesId: true,
  //       },
  //     });

  //     return await ctx.db.socialMedia.update({
  //       where: {
  //         id: stepperData?.productsAndServicesId,
  //       },
  //       data: {
  //         ...input,
  //       },
  //     });
  //   }),
  // updateTargetAudiences: publicProcedure
  //   .input(
  //     z.object({
  //       targetAudienceAge: z.number().optional(),
  //       targetAudienceGender: z.string().optional(),
  //       targetAudienceLocation: z.string().optional(),
  //       secondaryMarketToExplore: z.string().optional(),
  //       targetingBusinessesOrIndividuals: z.string().optional(),
  //       targetEntitiesDetails: z.string().optional(),
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     if (!ctx.session.user.organizationId) {
  //       throw new TRPCClientError("No organization found for this user.");
  //     }
  //     const organizationData = await ctx.db.organization.findUnique({
  //       where: {
  //         id: ctx.session.user.organizationId,
  //       },
  //       select: {
  //         StepperForm: true,
  //       },
  //     });
  //     if (!organizationData?.StepperForm) {
  //       throw new TRPCClientError(
  //         "No stepper form found for this organization."
  //       );
  //     }

  //     const stepperData = await ctx.db.stepperForm.findUnique({
  //       where: {
  //         id: organizationData.StepperForm.id,
  //       },
  //       select: {
  //         targetAudienceId: true,
  //       },
  //     });

  //     return await ctx.db.targetAudience.update({
  //       where: {
  //         id: stepperData?.targetAudienceId,
  //       },
  //       data: {
  //         ...input,
  //       },
  //     });
  //   }),
  // updateMeasurementAndReporting: publicProcedure
  //   .input(
  //     z.object({
  //       successOfMarketingEfforts: z.string().optional(),
  //       expectationsForMarketing: z
  //         .array(
  //           z.object({
  //             type: z.string().optional(),
  //             details: z.string().optional(),
  //           })
  //         )
  //         .optional(),
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     if (!ctx.session.user.organizationId) {
  //       throw new TRPCClientError("No organization found for this user.");
  //     }
  //     const organizationData = await ctx.db.organization.findUnique({
  //       where: {
  //         id: ctx.session.user.organizationId,
  //       },
  //       select: {
  //         StepperForm: true,
  //       },
  //     });
  //     if (!organizationData?.StepperForm) {
  //       throw new TRPCClientError(
  //         "No stepper form found for this organization."
  //       );
  //     }

  //     const stepperData = await ctx.db.stepperForm.findUnique({
  //       where: {
  //         id: organizationData.StepperForm.id,
  //       },
  //       select: {
  //         measurementAndReportingId: true,
  //       },
  //     });

  //     return await ctx.db.measurementAndReporting.update({
  //       where: {
  //         id: stepperData?.measurementAndReportingId,
  //       },
  //       data: {
  //         ...input,
  //       },
  //     });
  //   }),
  // updateBrandGuideline: publicProcedure
  //   .input(
  //     z.object({
  //       logos: z.string().array().optional(),
  //       colorPalette: z.string().array().optional(),
  //       designIntegrationLibrary: z.string().array().optional(),
  //       brandIllustrations: z.string().array().optional(),
  //       font: z.string().optional(),
  //       tagline: z.string().optional(),
  //       iconography: z.string().optional(),
  //       advertisingGraphicDesignFile: z.string().optional(),
  //       brandGuidelineDocument: z.string().optional(),
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     if (!ctx.session.user.organizationId) {
  //       throw new TRPCClientError("No organization found for this user.");
  //     }
  //     const organizationData = await ctx.db.organization.findUnique({
  //       where: {
  //         id: ctx.session.user.organizationId,
  //       },
  //       select: {
  //         StepperForm: true,
  //       },
  //     });
  //     if (!organizationData?.StepperForm) {
  //       throw new TRPCClientError(
  //         "No stepper form found for this organization."
  //       );
  //     }

  //     const stepperData = await ctx.db.stepperForm.findUnique({
  //       where: {
  //         id: organizationData.StepperForm.id,
  //       },
  //       select: {
  //         brandGuidelineId: true,
  //       },
  //     });

  //     return await ctx.db.brandDetails.update({
  //       where: {
  //         id: stepperData?.brandGuidelineId,
  //       },
  //       data: {
  //         ...input,
  //       },
  //     });
  //   }),
});
