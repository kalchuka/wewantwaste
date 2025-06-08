/**
 * 
 * Skip Size Screen Component
 * Displays skip size selection and permit check
 * Handles skip confirmation and navigation through steps
 * This component is part of the skip hire module
 * It manages the skip size selection, permit check, and navigation through the skip hiring process
 * 
 * Children components:
 * - SkipSizeListComponent: Displays available skip sizes and allows selection
 * - PermitCheck: Handles permit check based on selected skip size
 * * Dependencies:
 * - SkeletalLoader: Displays a loading skeleton while fetching skip types
 * - SkipHireHeadersProps: Displays headers for the skip hire process
 * - StepIndicator: Displays the current step in the skip hire process
 * Author:Chuka<kalchuka@gmail.com>
 */

import 'react-loading-skeleton/dist/skeleton.css';
import { useEffect, useState } from 'react';
import SkeletalLoader from '../components/skeletalLoader';
import SkipHireHeadersProps from '../components/skip_hire_headers';
import {SkipSizeListComponent} from '../components/skip_size_list_component';
import StepIndicator from '../../../sharedComponents/stepindicator';
import { PermitCheck } from '../components/permit_check';
import { fetchSkipTypes } from '../services/skip_service';

//// SkipSizeScreen component manages the skip size selection and permit check process
export default function SkipSizeScreen() {
  //// indicates the current step for this screen
  const [step, setStep] = useState(3);
  //// states to manage skip types, loading state, confirmation status, selected skip, and modal visibility
  const [skiptypes, setSkipTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [skipConfirmed, setSkipConfirmed] = useState(false);
  const [selectedSkip, setSelectedSkip] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false); 


  //// Function to load skip types from the service
  //// It fetches the skip types and updates the state
  const loadSkips = async () => {
    try {
      const skiptypesCall = await fetchSkipTypes();
      setSkipTypes(Array.isArray(skiptypesCall) ? skiptypesCall : []);
      setLoading(false);
    } catch (error) {

      console.error("Error loading skip types:", error);
      ////Todo: Handle error appropriately, e.g., show a notification or alert and probably send to any error observibilty service
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkips();
  }, []);
  
  //// Handle skip confirmation from modal
  //// Updated to receive the complete skip object
  const handleSkipConfirm = (skip: any) => {
    ///// Store the entire skip object for future use
    setSelectedSkip(skip);
    setSkipConfirmed(true);
    
    ////// Optionally advance to the next step
    setStep(prev => Math.min(prev + 1, 6)); 
  };

  // Handle going back to skip selection with modal open
  const BackToSkipSelection = () => {
    ///// Set the modal to open with the previously selected skip
    setModalOpen(true);
    
    ///// Keep the skip selected but not confirmed
    setSkipConfirmed(false);
    
    ///// Go back to the skip selection step
    setStep(3);
  };
  

  //// Render the component
  return (
    <div className="w-full">
      <StepIndicator 
        currentStep={step} 
        steps={["Post Code","Waste type","Select Skip", "Permit check", "Choose Date", "Payment"]} 
        setStep={setStep} 
      />
      {!skipConfirmed ? (
      <SkipHireHeadersProps header="Choose Your Skip Size" subheader="Select the skip size that best suits your needs">
      </SkipHireHeadersProps>
      ) : (
        <SkipHireHeadersProps header="Where will the skip be placed?" subheader="This helps us determine if you need a permit for your skip">
        </SkipHireHeadersProps>
      )}
      
      {/* Show loading state while fetching skip types */}
      
      {loading ? (
        <SkeletalLoader />
      ) : (
        <>
          {!skipConfirmed ? (
            <>
              <SkipSizeListComponent 
                skiptypes={skiptypes} 
                onSkipConfirm={handleSkipConfirm}
                initialModalOpen={modalOpen}
                initialSelectedSkip={selectedSkip}
              />
            </>
          ) : (
            <PermitCheck 
              selectedSkip={selectedSkip} 
              skipConfirmed={skipConfirmed}
              skiptypes={skiptypes}
              onContinue={() => setStep(prev => Math.min(prev + 1, 6))}
              onBack={BackToSkipSelection} 
            />
          )}
        </>
      )}
    </div>
  );
}

