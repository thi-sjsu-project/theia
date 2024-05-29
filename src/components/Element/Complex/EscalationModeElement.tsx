import { useEffect, useState } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { getGazesAndKeys } from 'src/redux/slices/gazeSlice';
import INITIAL_KEYFRAME from "./ApproveDenyButtonElement"
import SIZES from "./ApproveDenyButtonElement"
import type { EscalationModeElement as EscalationModeElementType } from 'src/types/element';
import ApproveDenyButtonElement from './ApproveDenyButtonElement';

type EscalationModeElementProps= {
  element: EscalationModeElementType;
};

const EscalationModeElement = ({ element }: EscalationModeElementProps) => {
  //const [keyframe, setKeyframe] = useState(INITIAL_KEYFRAME);
  const gazesAndKeys = useAppSelector(getGazesAndKeys);

  useEffect(() => {
    // Effekt, um den Keyframe zu aktualisieren basierend auf gazesAndKeys oder anderen Bedingungen
  }, [gazesAndKeys]);

  return (
    <div className="alert-element bg-white border border-gray-300 rounded-lg shadow-lg p-4 relative" style={{ width: '300px', height: 'auto' }}>
      <h2 className="text-xl font-bold mb-2">Alert Title</h2>
      <p className="text-gray-700 mb-4">This is the alert message that gives more information to the user.</p>
      <div style={{ transform: 'scale(1.5)', transformOrigin: 'center' }}>
        <EscalationModeElement element={element} />
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700">
        Close
      </button>
    </div>
  );
};

export default EscalationModeElement;