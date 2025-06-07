import React from 'react';



interface StepIndicatorProps {
  currentStep: number;
}

const steps = ["Personal Info", "Account Setup", "Confirm"];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-5">
      <div className="row">
        <div className="col-12">
          <div className="position-relative">
            {/* Progress bar background */}
            <div 
              className="position-absolute bg-light rounded-pill"
              style={{
                height: '4px',
                top: '24px',
                left: 'calc(100% / 6)',
                right: 'calc(100% / 6)',
                width: 'calc(100% - 100% / 3)',
                zIndex: 0
              }}
            />
            
            {/* Progress bar fill */}
            <div 
              className="position-absolute bg-primary rounded-pill transition-all"
              style={{
                height: '4px',
                top: '24px',
                left: 'calc(100% / 6)',
                width: `calc((100% - 100% / 3) * ${Math.max(0, (currentStep - 1)) / (steps.length - 1)})`,
                zIndex: 1,
                transition: 'width 0.3s ease-in-out'
              }}
            />
            
            {/* Step circles and labels */}
            <div className="d-flex justify-content-between position-relative" style={{ zIndex: 2 }}>
              {steps.map((label, index) => {
                const stepNum = index + 1;
                const isActive = currentStep === stepNum;
                const isCompleted = currentStep > stepNum;
                const isPending = currentStep < stepNum;
                
                return (
                  <div
                    key={index}
                    className="d-flex flex-column align-items-center"
                    style={{ flex: '1' }}
                  >
                    {/* Step circle */}
                    <div
                      className={`
                        rounded-circle d-flex align-items-center justify-content-center
                        position-relative fw-bold
                        ${isCompleted 
                          ? 'bg-success text-white border-success' 
                          : isActive 
                            ? 'bg-primary text-white border-primary' 
                            : 'bg-white text-muted border-light'
                        }
                      `}
                      style={{
                        width: '48px',
                        height: '48px',
                        border: '3px solid',
                        fontSize: '14px',
                        boxShadow: isActive || isCompleted 
                          ? '0 4px 12px rgba(0, 123, 255, 0.3)' 
                          : '0 2px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease-in-out',
                        transform: isActive ? 'scale(1.1)' : 'scale(1)'
                      }}
                    >
                      {isCompleted ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                        </svg>
                      ) : (
                        stepNum
                      )}
                    </div>
                    
                    {/* Step label */}
                    <div 
                      className={`
                        mt-3 text-center small
                        ${isActive 
                          ? 'text-primary fw-semibold' 
                          : isCompleted 
                            ? 'text-success fw-medium' 
                            : 'text-muted'
                        }
                      `}
                      style={{
                        fontSize: '13px',
                        lineHeight: '1.2',
                        maxWidth: '80px',
                        transition: 'color 0.3s ease-in-out'
                      }}
                    >
                      {label}
                    </div>
                    
                    {/* Active step indicator dot */}
                    {isActive && (
                      <div 
                        className="bg-primary rounded-circle mt-1"
                        style={{
                          width: '6px',
                          height: '6px',
                          animation: 'pulse 2s infinite'
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Step description */}
      <div className="row mt-4">
        <div className="col-12 text-center">
          <small className="text-muted">
            Step {currentStep} of {steps.length}: {steps[currentStep - 1]}
          </small>
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .transition-all {
          transition: all 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}