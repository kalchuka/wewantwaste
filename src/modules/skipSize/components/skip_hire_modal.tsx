import { X, ShoppingCart } from "lucide-react";
import { Button } from "./buttons_components";
import { useScrollLock } from '../../../globalhooks/customhooks';



interface SkipHireModalProps {
  selected: any[];
  onClose: () => void;
  onConfirm?: (selected: any[]) => void;
}

export const SkipHireModal = ({ selected, onClose, onConfirm }: SkipHireModalProps) => {
  const selectedSkip = selected[0];
  
  ///// Lock body scroll when modal is open
  useScrollLock();

  
  // Update the handleConfirm function to pass the entire skip object
  const handleConfirm = () => {
    if (onConfirm && selectedSkip) {
      // Pass the entire selected skip object directly
      onConfirm(selectedSkip);
    } else {
      onClose();
    }
  };

  if (!selectedSkip) {
    return null;
  }

  ///// Render the modal with skip details
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-xl font-bold text-gray-800">Hire this skip</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img 
                  src={selectedSkip.image_url} 
                  alt={selectedSkip.name} 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              
              <div className="md:w-2/3">
              <div className="p-3 rounded-lg border bg-blue-50 border-blue-200">
                    <div className="flex items-center gap-2 text-blue-700">
                      <span className="font-medium">{selectedSkip.size} Yard Skip</span>
                      <span className="text-xs px-2 py-0.5 bg-blue-100 rounded-full">
                        {selectedSkip.hire_period_days || 14} {selectedSkip.hire_period_days === 1 ? 'day' : 'days'} hire
                      </span>
                    </div>
                  </div>
                
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Skip Price:</span>
                    <span className="font-semibold">£{selectedSkip.price_before_vat?.toFixed(2) || "0.00"}</span>
                  </div>
                  
                  {selectedSkip.transport_cost != null && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Transport Cost:</span>
                      <span className="font-semibold">£{selectedSkip.transport_cost.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">VAT ({selectedSkip.vat || 20}%):</span>
                    <span className="font-semibold">
                      £{((selectedSkip.price_before_vat || 0) * ((selectedSkip.vat || 20)/100)).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span className="text-gray-800 font-bold">Total:</span>
                    <span className="text-gray-800 font-bold">
                      £{((selectedSkip.price_before_vat || 0) * (1 + (selectedSkip.vat || 20)/100) + (selectedSkip.transport_cost || 0)).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  {selectedSkip.allowed_on_road !== undefined && (
                    <div className={`p-3 rounded-lg border ${
                      selectedSkip.allowed_on_road 
                        ? 'bg-green-50 border-green-200 text-green-700' 
                        : 'bg-amber-50 border-amber-200 text-amber-700'
                    }`}>
                      <p className="text-sm">
                        {selectedSkip.allowed_on_road 
                          ? 'This skip can be placed on public roads with proper permits' 
                          : 'This skip must be placed on private property only'}
                      </p>
                    </div>
                  )}
                  
                  {selectedSkip.allows_heavy_waste !== undefined && (
                    <div className={`p-3 rounded-lg border ${
                      selectedSkip.allows_heavy_waste 
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                    }`}>
                      <p className="text-sm">
                        {selectedSkip.allows_heavy_waste 
                          ? 'Suitable for heavy waste (soil, concrete, bricks)' 
                          : 'Not suitable for heavy waste materials'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t">
            <div className="flex gap-3">
              <Button 
                variant="primary"
                size="md"
                icon={ShoppingCart}
                fullWidth
                onClick={handleConfirm}
              >
                Confirm Selection
              </Button>
              
              <Button 
                variant="secondary"
                size="md"
                fullWidth
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};