import React from "react";

interface Step {
  name: string;
  description: string;
  status: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export default function Stepper({
  steps,
  currentStep,
}: StepperProps): JSX.Element {
  return (
    <div className="flex flex-col justify-center gap-10 pl-4 md:items-center md:pl-0">
      <div
        className="items-center justify-center md:ml-24 md:flex md:h-40"
        aria-label="Progress"
      >
        <ol
          role="list"
          className="w-full overflow-hidden md:flex md:w-[550px] md:overflow-visible"
        >
          {steps.map((step, stepIdx) => (
            <li
              key={step.name}
              className={`w-2/3 flex-grow ${
                stepIdx !== steps.length - 1 ? "md:pb-0 pb-10" : ""
              } relative`}
            >
              {currentStep >= stepIdx ? (
                <>
                  {stepIdx !== steps.length - 1 ? (
                    <div
                      className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-black md:top-5 md:h-1 md:w-full"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a className="group relative flex items-start md:flex-col">
                    <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white group-hover:bg-gray-700 md:h-12 md:w-12">
                      {stepIdx + 1}
                    </span>
                    <span className="ml-4 flex min-w-0 flex-col md:-ml-8 md:w-2/3 md:items-center md:text-center">
                      <span className="text-sm font-bold text-black">
                        {step.name}
                      </span>
                    </span>
                  </a>
                </>
              ) : currentStep === stepIdx ? (
                <>
                  {stepIdx !== steps.length - 1 ? (
                    <div
                      className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 border-dashed md:top-5 md:h-0 md:w-full md:border-2"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    className="group relative flex items-start md:flex-col"
                    aria-current="step"
                  >
                    <span className="relative z-0 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-white md:h-12 md:w-12">
                      {stepIdx + 1}
                    </span>
                    <span className="ml-4 flex min-w-0 flex-col md:-ml-8 md:w-2/3 md:items-center md:text-center">
                      <span className="text-sm font-normal text-black">
                        {step.name}
                      </span>
                    </span>
                  </a>
                </>
              ) : (
                <>
                  {stepIdx !== steps.length - 1 ? (
                    <div
                      className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 border border-dashed border-black md:top-5 md:h-0 md:w-full md:border-2"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a className="group relative flex items-start md:flex-col">
                    <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-black bg-white text-black group-hover:border-gray-400 md:h-12 md:w-12">
                      {stepIdx + 1}
                    </span>
                    <span className=" ml-4 flex min-w-0 flex-col md:-ml-8 md:w-2/3 md:items-center md:text-center">
                      <span className="text-sm font-normal text-black">
                        {step.name}
                      </span>
                    </span>
                  </a>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
