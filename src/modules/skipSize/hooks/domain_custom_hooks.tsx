import { useEffect } from 'react';

/**
 * Hook to initialize modal state based on external props
 * @param initialOpen Whether the modal should be open initially
 * @param initialSelection The initially selected item for the modal
 * @param setSelected Function to set the selected item
 * @param setOpen Function to set the modal open state
 */
export function useModalInit(
  initialOpen: boolean,
  initialSelection: any,
  setSelected: (item: any) => void,
  setOpen: (isOpen: boolean) => void
) {
  useEffect(() => {
    if (initialOpen && initialSelection) {
      setSelected(initialSelection);
      setOpen(true);
    }
  }, [initialOpen, initialSelection, setSelected, setOpen]);
}