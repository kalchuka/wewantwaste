import { useState } from "react";
import { X, ShoppingCart } from "lucide-react";

interface SkipHireModalProps {
  selected: any[];
  onClose: () => void;
  onConfirm?: (id: string) => void;
}

export const SkipHireModal = ({ selected, onClose, onConfirm }: SkipHireModalProps) => {
  const selectedSkip = selected[0];
  
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(selectedSkip.id);
    } else {
      onClose();
    }
  };

  if (!selectedSkip) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-xl overflow-hidden animate-fadeIn">
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
                alt={selectedSkip.name || "Skip"} 
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            <div className="md:w-2/3">
              <h4 className="text-xl font-bold text-gray-800 mb-2">{selectedSkip.name || `${selectedSkip.size} Yard Skip`}</h4>
              
              {selectedSkip.description && (
                <p className="text-gray-600 mb-4">{selectedSkip.description}</p>
              )}
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Skip Price (Before VAT):</span>
                  <span className="font-semibold">£{selectedSkip.price_before_vat.toFixed(2)}</span>
                </div>
                
                {selectedSkip.transport_cost != null && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Transport Cost:</span>
                    <span className="font-semibold">£{selectedSkip.transport_cost.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">£{(selectedSkip.price_before_vat + (selectedSkip.transport_cost || 0)).toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">VAT ({selectedSkip.vat}%):</span>
                  <span className="font-semibold">£{((selectedSkip.price_before_vat + (selectedSkip.transport_cost || 0)) * (selectedSkip.vat/100)).toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="text-gray-800 font-bold">Total:</span>
                  <span className="text-gray-800 font-bold">£{((selectedSkip.price_before_vat + (selectedSkip.transport_cost || 0)) * (1 + selectedSkip.vat/100)).toFixed(2)}</span>
                </div>
              </div>

              <div className="mb-4">
                {selectedSkip.allowed_on_road !== undefined && (
                  <div className={`mb-3 px-3 py-2 rounded-lg ${
                    selectedSkip.allowed_on_road 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    <p className="text-sm font-medium">
                      {selectedSkip.allowed_on_road 
                        ? '✓ This skip can be placed on public roads with proper permits' 
                        : '✗ This skip must be placed on private property only'}
                    </p>
                  </div>
                )}
                
                {selectedSkip.allows_heavy_waste !== undefined && (
                  <div className={`mb-3 px-3 py-2 rounded-lg ${
                    selectedSkip.allows_heavy_waste 
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                      : 'bg-gray-50 text-gray-600 border border-gray-200'
                  }`}>
                    <p className="text-sm font-medium">
                      {selectedSkip.allows_heavy_waste 
                        ? '✓ Suitable for heavy waste (soil, concrete, bricks)' 
                        : '✗ Not suitable for heavy waste materials'}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={handleConfirm}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Confirm Selection
                </button>
                <button 
                  onClick={onClose}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};