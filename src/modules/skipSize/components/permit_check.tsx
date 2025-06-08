import 'react-loading-skeleton/dist/skeleton.css';
import { Button } from './buttons_components';
import { 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  TrafficConeIcon as Road,
} from 'lucide-react';

/////
interface SkipPermitCheckProps {
  selectedSkip: any; 
  skipConfirmed: boolean;
  skiptypes?: any[];
  onContinue?: () => void;
  onBack?: () => void;
}

export function PermitCheck({ 
  selectedSkip, 
  onContinue, 
  onBack 
}: SkipPermitCheckProps) {
  if (!selectedSkip) {
    return <div>No skip selected</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
      <div className="mb-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all">
            <div className="font-medium mb-2 flex items-center gap-2">
              <Home size={18} className="text-blue-600" />
              <span>Private Property</span>
            </div>
            <p className="text-sm text-gray-600 text-left">
              No permit required when placed on private property.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all">
            <div className="font-medium mb-2 flex items-center gap-2">
              <Road size={18} className="text-amber-600" />
              <span>Public Road</span>
            </div>
            <p className="text-sm text-gray-600 text-left">
             Permit required for placement on public roads.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button
          variant="secondary"
          size="md"
          icon={ArrowLeft}
          onClick={onBack}
        >
          Back to Skip Selection
        </Button>
        
        <Button
          variant="primary"
          size="md"
          icon={ArrowRight}
          iconPosition="right"
          onClick={onContinue}
        >
          Continue to Next Step
        </Button>
      </div>
    </div>
  );
}


