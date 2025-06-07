import React from "react";
import 'react-loading-skeleton/dist/skeleton.css';
import { useEffect, useState } from 'react';
import SkeletalLoader from '../components/skeletalLoader';
import {SkipSizeListComponent} from '../components/skip_size_list_component';
import StepIndicator from '../../../sharedComponents/stepindicator';

/// import service
import { fetchSkipTypes } from '../services/skip_service';

export default function Register() {
  const [step, setStep] = useState(1);
  const [skiptypes, setSkipTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSkips = async () => {
    try {
      const skiptypesCall = await fetchSkipTypes();
////check if the skip array contians data
console.log("Is response.data an array:", Array.isArray(skiptypesCall));


      setSkipTypes(Array.isArray(skiptypesCall) ? skiptypesCall : [])

// console log the type of skiptypesCall

    

      // setSkipTypes(Array.isArray(skiptypesCall) ? skiptypesCall : []);

      setLoading(false);
    } catch (error) {
      console.error("Error loading skip types:", error);
      setLoading(false);
    }

    await fetchSkipTypes();

    console.log("Skipszzzzz:",skiptypes);
  };

  /// call loadUser when the component mounts
  useEffect(() => {
    loadSkips();
  }, []);
  
  return (
    <div className="container py-5">
         {/* Header */}
         <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Skip Sizes</h1>
          <p className="text-gray-600">Choose the right skip size for your waste disposal needs</p>
        </div>
     {loading ? (
        <SkeletalLoader />
      ) : (
        <div className="skip-types-container">
          
       <SkipSizeListComponent skiptypes={skiptypes} />
        
        </div>
      )}
    </div>
  );
}

