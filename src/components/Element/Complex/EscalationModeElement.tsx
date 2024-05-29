import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useAppSelector } from 'src/redux/hooks';
import { getGazesAndKeys } from 'src/redux/slices/gazeSlice';
import ApproveDenyButtonElement from './ApproveDenyButtonElement';
import type { ApproveDenyButtonElement as ApproveDenyButtonElementType, EscalationModeElement as EscalationModeElementType } from 'src/types/element';

type EscalationModeElementProps = {
  element: EscalationModeElementType;
};

const EscalationModeElement = ({ element }: EscalationModeElementProps) => {
  const gazesAndKeys = useAppSelector(getGazesAndKeys);
  const approveDenyButtonElement = {
    id: uuid(),
    h: 100,
    w: 200,
    modality: 'visual',
    type: 'approve-deny-button'
  } satisfies ApproveDenyButtonElementType

  useEffect(() => {
  }, [gazesAndKeys]);

  return (
    <div className="alert-element bg-gray-900 text-white rounded-lg shadow-lg p-4 relative" style={{ width: '300px', height: 'auto' }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">ALERT</h2>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Missile Heading Towards Ownship!</h3>
        <p>ACA-7 detected launch</p>
        <p>Time to Impact: 45 seconds</p>
        <p>Missile Type: SAM</p>
      </div>
      <ApproveDenyButtonElement element={approveDenyButtonElement} /> {/* Vergrößere das ApproveDenyButtonElement um das 1.5-fache */}
      <div className="mt-4">
        <h4 className="font-semibold">Additional Information</h4>
        <p>reporter: ACA-7</p>
        <p>threat: SA_4</p>
        <p>location: 34° N, 118° W</p>
        <p>distance: 620 mi</p>
        <p>altitude: 20,000 ft</p>
        <p>time to impact: 45 sec</p>
        <p>priority: high</p>
        <p>threat-level: high</p>
        <p>survivability: 80%</p>
        <p>col. damage: 29%</p>
        <p>missile type: SAM</p>
        <p>safe zone dist.: 115 mi</p>
      </div>
    </div>
  );
};

export default EscalationModeElement;
