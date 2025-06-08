/**
 * StepIndicator Component
 * Displays a step indicator with circles and connecting lines
 * Each step can be clicked to navigate back if completed
 * Icons represent each step visually
 * * Props:
 * - currentStep: The current step number (1-based index)
 * - steps: Array of step labels (default is 6 steps)
 * - setStep: Optional function to set the current step (if provided, clicking a completed step will change the step)
 * * Icons used:
 * - MapPin for Post Code
 * - PackageSearch for Waste type
 * - Truck for Select Skip
 * - FileCheck for Permit check
 * - Calendar for Choose Date
 * - CreditCard for Payment
 * * Circle size adjusts based on number of steps
 * * Responsive design: adjusts layout for more than 4 steps
 * * Usage:
 * <StepIndicator currentStep={1} setStep={setStep} />
 * Author: Chuka <kalchuka@gmail.com>
 * 
 */

import React from 'react';
import { 
  MapPin, PackageSearch, Truck, FileCheck, Calendar, CreditCard 
} from 'lucide-react';


//// StepIndicatorProps interface defines the props for the StepIndicator component
export interface StepIndicatorProps {
  currentStep: number;
  steps?: string[];
  setStep?: React.Dispatch<React.SetStateAction<number>>;
}

///// StepIndicator component displays a step indicator with circles and connecting lines
export default function StepIndicator({ 
  currentStep, 
  steps = ["Post Code", "Waste type", "Select Skip", "Permit check", "Choose Date", "Payment"],
  setStep
}: StepIndicatorProps) {

  // Get circle size based on number of steps
  const circleSize = steps.length > 4 ? 10 : 12; 
  
  //// Function to get step icons
  const getStepIcon = (stepNum: number) => {
    switch(stepNum) {
      case 1: return <MapPin size={18} />;
      case 2: return <PackageSearch size={18} />;
      case 3: return <Truck size={18} />;
      case 4: return <FileCheck size={18} />;
      case 5: return <Calendar size={18} />;
      case 6: return <CreditCard size={18} />;
      default: return stepNum;
    }
  };
  
  ////// Render the step indicator component
  return (
    <div className="mb-8">
      <div className="relative">
        
        <div className="flex justify-between relative z-10">
          {steps.map((label, index) => {
            const stepNum = index + 1;
            const isActive = currentStep === stepNum;
            const isCompleted = currentStep > stepNum;
            const isLast = index === steps.length - 1;
            
            return (
              <div
                key={index}
                className="flex flex-col items-center relative"
                style={{ 
                  flex: steps.length > 4 ? '0 0 auto' : '1',
                  width: steps.length > 4 ? `${100/steps.length}%` : 'auto'
                }}
                onClick={() => setStep && isCompleted && setStep(stepNum)}
              >
                {/* Connecting line to next step - only if not the last step */}
                {!isLast && (
                  <div 
                    className="absolute h-1 top-6 z-0"
                    style={{
                      left: `calc(50% + ${circleSize / 2}px)`,
                      right: `calc(-50% + ${circleSize / 2}px)`
                    }}
                  >
                    <div 
                      className={`h-full ${
                        isCompleted ? 'bg-green-600' : 'bg-gray-200'
                      } rounded-full transition-colors duration-300`}
                    />
                  </div>
                )}

                <div
                  className={`
                    rounded-full flex items-center justify-center relative font-bold z-10
                    ${steps.length > 4 ? 'w-10 h-10' : 'w-12 h-12'} border-2 text-sm
                    transform transition-all duration-300 ease-in-out
                    ${isActive ? 'scale-110' : 'scale-100'}
                    ${isCompleted 
                      ? 'bg-green-600 text-white border-green-600' 
                      : isActive 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-white text-gray-500 border-gray-200'
                    }
                  `}
                >
                  <div className={`
                    absolute rounded-full border
                    ${steps.length > 4 ? 'w-8 h-8' : 'w-9 h-9'} 
                    ${isCompleted 
                      ? 'border-white/40' 
                      : isActive 
                        ? 'border-white/40' 
                        : 'border-gray-300/60'
                    }
                  `}></div>
                  
                  {isCompleted ? (
                    <span className="text-white z-10">
                      {getStepIcon(stepNum)}
                    </span>
                  ) : (
                    <span className="z-10">{getStepIcon(stepNum)}</span>
                  )}
                </div>
                
                <div 
                  className={`
                    mt-2 text-center hidden sm:block
                    ${steps.length > 4 ? 'text-[10px]' : 'text-xs'} leading-tight 
                    ${steps.length > 4 ? 'max-w-[60px]' : 'max-w-[80px]'}
                    transition-colors duration-300 ease-in-out
                    ${isActive 
                      ? 'text-blue-600 font-semibold' 
                      : isCompleted 
                        ? 'text-green-600 font-medium' 
                        : 'text-gray-500'
                    }
                  `}
                >
                  {label}
                </div>
                
                {isActive && (
                  <div 
                    className="bg-blue-600 rounded-full w-1.5 h-1.5 mt-1 animate-pulse"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Step {currentStep} of {steps.length}: {steps[currentStep - 1]}
        </p>
      </div>
    </div>
  );
}