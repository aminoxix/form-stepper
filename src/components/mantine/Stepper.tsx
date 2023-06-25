import React from "react";
import { Stepper, createStyles, rem } from "@mantine/core";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import { initialSteps } from "@/data";

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.md,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  separator: {
    marginLeft: rem(-160),
    marginRight: rem(-158),
    marginTop: rem(20),
    height: rem(2),
    borderTop: `${rem(2)} dashed ${
      theme.colorScheme === "dark" ? "#000" : "#000"
    }`,
    borderRadius: theme.radius.xl,
    backgroundColor: "transparent",
  },

  separatorActive: {
    borderWidth: 0,
    backgroundColor: "#000",
  },

  verticalSeparator: {
    marginTop: rem(-5),
    borderLeft: `${rem(2)} dashed ${
      theme.colorScheme === "dark" ? "#000" : "#000"
    }`,
  },

  verticalSeparatorActive: {
    borderWidth: 0,
    borderLeft: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? "000" : "#000"
    }`,
  },

  stepIcon: {
    borderWidth: 2,
    borderColor: "#000",
    color: "#000",
    backgroundColor: theme.colorScheme === "dark" ? "#000" : theme.white,

    "&[data-progress]": {
      borderColor: "#000",
    },

    "&[data-completed]": {
      borderWidth: 0,
      backgroundColor: "#000",
      color: theme.white,
    },
  },

  stepLabel: {
    marginTop: rem(13),
    color: "#000",
    fontWeight: 400,
  },
}));

const MantineStepper = ({
  active,
  setActive,
}: {
  active: number;
  setActive: (index: number) => void;
}) => {
  const { classes } = useStyles();
  const screenWidth = useScreenWidth();

  return (
    <Stepper
      classNames={classes}
      active={active}
      onStepClick={setActive}
      orientation={screenWidth > 880 ? "horizontal" : "vertical"}
      breakpoint="sm"
      styles={() =>
        screenWidth > 880
          ? {
              step: {
                transition: "transform 150ms ease",
                display: "flex",
                flex: 1,
                width: 0,
                flexDirection: "column",
              },
              stepLabel: {
                textAlign: "center",
                width: rem(200),
              },
              steps: {
                display: "flex",
                alignItems: "start",
              },
            }
          : {
              step: {
                marginTop: 0,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              },
            }
      }
    >
      {initialSteps.map((step, index) => (
        <Stepper.Step
          key={index}
          allowStepSelect={false}
          label={step.label}
          completedIcon={<span>{index + 1}</span>}
        ></Stepper.Step>
      ))}
    </Stepper>
  );
};

export default MantineStepper;
