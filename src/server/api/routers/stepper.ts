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
        select: {
          companyOverview: true,
          brandDetails: true,
          socialMedia: true,
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

  updateStepperForm: publicProcedure
    .input(
      z.object({
        id: z.string(),
        companyOverViewData: z
          .object({
            companyName: z.string().optional(),
            companyEmail: z.string().optional(),
            companyWebsite: z.string().optional(),
            uploadSquareLogo: z.string().optional(),
            legalCompliances: z.string().optional(),
          })
          .optional(),
        socialMediaData: z
          .object({
            topProductsServicesCategories: z.string().optional(),
            facebookLink: z.string().optional(),
            instagramLink: z.string().optional(),
            linkedinLink: z.string().optional(),
            xLink: z.string().optional(),
            youtubeLink: z.string().optional(),
          })
          .optional(),
        brandDetailsData: z
          .object({
            age: z.string().optional(),
            location: z.string().optional(),
            brandAssets: z.string().array().optional(),
            brandDetails: z.string().optional(),
          })
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const stepperData = await ctx.db.stepperForm.findUnique({
        where: {
          id: input.id,
        },
        select: {
          companyOverviewId: true,
          socialMediaId: true,
          brandDetailId: true,
        },
      });

      const createdCompanyOverview = await ctx.db.companyOverview.update({
        where: {
          id: stepperData?.companyOverviewId,
        },
        data: {
          ...input.companyOverViewData,
        },
      });
      const createdSocialMedia = await ctx.db.socialMediaDetails.update({
        where: {
          id: stepperData?.socialMediaId,
        },
        data: {
          ...input.socialMediaData,
        },
      });
      const createdBrandGuideline = await ctx.db.brandDetails.update({
        where: {
          id: stepperData?.brandDetailId,
        },
        data: {
          ...input.brandDetailsData,
        },
      });

      const stepperFormExist = await ctx.db.stepperForm.count();

      if (stepperFormExist === 0) {
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
      } else {
        return new TRPCClientError("Stepper form already exist");
      }
    }),
});
