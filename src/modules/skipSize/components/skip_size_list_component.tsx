import { Button } from './buttons_components';
import { useModalInit } from '../hooks/domain_custom_hooks';
import { useState } from "react";
import { ShoppingCart, Banknote, Truck, TrafficCone, TriangleAlert, Weight } from "lucide-react";
import { SkipHireModal } from './skip_hire_modal';

interface SkipSizeListComponentProps {
  skiptypes: any[];
  onSkipConfirm?: (skip: any) => void;
  initialModalOpen?: boolean; 
  initialSelectedSkip?: any; 
}

export function SkipSizeListComponent({ 
  skiptypes = [], 
  onSkipConfirm,
  initialModalOpen = false,
  initialSelectedSkip = null
}: SkipSizeListComponentProps) {

// print the skiptypes array to console
  console.log("Skip kjghiuhkhkljhkjhgkjghkljgjkhgjhgjhgjhgjhgjhggjhg:", skiptypes);

  const [selectedSkip, setSelectedSkip] = useState<any>(initialSelectedSkip);
  const [modalOpen, setModalOpen] = useState(initialModalOpen);
  
  // Effect to handle prop changes for modal state
  useModalInit(initialModalOpen, initialSelectedSkip, setSelectedSkip, setModalOpen);

  const handleOpenModal = (skiptype: any) => {
    setSelectedSkip(skiptype);
    setModalOpen(true);
  };

  const addToCart = (id: string) => {
    const skip = skiptypes.find(skip => skip.id === id);
    if (skip) {
      handleOpenModal(skip);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {skiptypes.map((skiptype) => (
            <div
              key={skiptype.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-gray-400/20 hover:-translate-y-2 transform cursor-pointer group"
              style={{
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)';
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={skiptype.image_url}
                  alt={skiptype.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                <div className="absolute top-0 left-0 bg-blue-600/90 text-white px-4 py-2 rounded-br-lg backdrop-blur-sm shadow-lg flex items-center font-bold">
                  <span className="text-3xl mr-1">{skiptype.size}</span>
                  <span className="text-sm uppercase tracking-wide">Yard Skip</span>
                </div>             
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="pl-6 pr-6 pt-3 pb-6">
                <div className="mb-4 flex justify-between items-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {skiptype.size} Yard Skip
                  </span>
                  
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {skiptype.hire_period_days} {skiptype.hire_period_days === 1 ? 'day' : 'days'} hire
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Banknote className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-bold text-gray-800">
                    £{skiptype.price_before_vat+skiptype.vat}
                  </span>
                </div>

                {skiptype.transport_cost != null ? (
                  <div className="flex items-center text-amber-600 text-sm mt-1 mb-2">
                                        <Truck className="h-6 w-6 mr-1" />

                    <span>Additional transport cost: £{skiptype.transport_cost.toFixed(2)}</span>
                  </div>
                ): (
                                    <div className="flex items-center text-grey-600 text-sm mt-1 mb-2">
                    <Truck className="h-6 w-6 mr-1" />
                    <span>No additional transport cost</span>
                  </div>
                )}


                <div className={`mb-4 flex items-center gap-2   ${
                  skiptype.allowed_on_road 
                    ? ' text-green-700  ' 
                    : ' text-amber-700 '
                }`}>
                  {skiptype.allowed_on_road 
                    ?  <TrafficCone></TrafficCone>
                    : <TriangleAlert></TriangleAlert>
                  }
                  <span className="text-sm font-medium">
                    {skiptype.allowed_on_road 
                      ? 'Allowed on the road' 
                      : 'Not Allowed on the road'}
                  </span>
                </div>

                {skiptype.allows_heavy_waste !== undefined && (
                  <div className={`mb-4 flex items-center gap-2 ${
                    skiptype.allows_heavy_waste 
                      ? ' text-indigo-700  ' 
                      : ' text-gray-600  '
                  }`}>
                    {skiptype.allows_heavy_waste 
                      ? (
                        <Weight></Weight>
                      ) 
                      : (
                        /// couldnt find a good icon for not suitable for heavy waste so i used SVG
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                      )
                    }
                    <span className="text-sm font-medium">
                      {skiptype.allows_heavy_waste 
                        ? 'Suitable for heavy waste' 
                        : 'Not suitable for heavy waste'}
                    </span>
                  </div>
                )}

                <Button
                  variant="primary"
                  size="md"
                  icon={ShoppingCart}
                  fullWidth
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(skiptype.id);
                  } }
                 children={"Hire This Skip"} >
                  
                 </Button>
              
              </div>
            </div>
          ))}
        </div>

        {skiptypes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No skip sizes available at the moment.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && selectedSkip && (
        <SkipHireModal 
          selected={[selectedSkip]} 
          onClose={() => setModalOpen(false)}
          onConfirm={(skipData) => {
            // Close the modal
            setModalOpen(false);
            
            // Pass the complete skip data up to parent component
            if (onSkipConfirm) {
              onSkipConfirm(skipData);
            }
          }}
        />
      )}
    </div>
  );
}
