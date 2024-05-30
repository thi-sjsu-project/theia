import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useAppSelector } from 'src/redux/hooks';
import { getGazesAndKeys } from 'src/redux/slices/gazeSlice';
import ApproveDenyButtonElement from './ApproveDenyButtonElement';
import type { ApproveDenyButtonElement as ApproveDenyButtonElementType, EscalationModeElement as EscalationModeElementType } from 'src/types/element';
import MissileIcon from 'src/assets/icons/threats/missile-lg-emph.svg';

type EscalationModeElementProps = {
  element: EscalationModeElementType;
};

const EscalationModeElement = ({ element }: EscalationModeElementProps) => {
  const gazesAndKeys = useAppSelector(getGazesAndKeys);
  const approveDenyButtonElement = {
    id: uuid(),
    h: 156,
    w: 476,
    modality: 'visual',
    type: 'approve-deny-button'
  } satisfies ApproveDenyButtonElementType

  const tablestyle = {
    fontSize: '32px',
    border: '1px solid white',
    padding: '8px', 
    color: '#C1C1C1',
  };

  useEffect(() => {
  }, [gazesAndKeys]);

  return (
    <><div className="alert-element bg-#1E1E1E text-white shadow-lg p-7" style={{ width: '800px', height: '985px', boxShadow: '8px 0px 60px 0px #000000', zIndex: 1000 }}>
          <div className="w-1/2 pr-4">
              <div className="mb-4" style={{ width: '488px', height: '128px' }}>
                <div className="flex items-center mb-4" style={{width: '800px'}}>
                    <img src={MissileIcon} alt="Missile Icon" className="ml-4" style={{ width: '80px', height: '80px', marginLeft: '67px', marginRight: '26px', marginTop: '40px' }} />
                    <h3 className="text-lg font-semibold" style={{ fontSize: '64px', marginBottom: '40px', height: '128px', width: '488px',lineHeight: '64px', marginTop: '80px' }}>Missile Heading Towards Ownship!</h3>
                  </div>
                  <p style={{ fontSize: '38px', marginBottom: '70px' , height: '39px', width: '421px', color: '#BCBCBC', marginLeft: '43px'}}>ACA-7 detected launch</p>
                  <table className="table-auto mb-4" style={{ fontSize: '38px',  width: '708px', height: '120px', marginLeft: '15px'}}>
                    <tbody>
                        <tr>
                        <td style={{ border: '1px solid white', padding: '8px', color: '#BCBCBC' }}>Time to Impact:</td>
                        <td style={{ border: '1px solid white', padding: '8px', fontSize: '38px' }} className="text-lg font-bold">45 seconds</td>
                        </tr>
                        <tr>
                        <td style={{ border: '1px solid white', padding: '8px', color: '#BCBCBC' }}>Missile Type:</td>
                        <td style={{ border: '1px solid white', padding: '8px', fontSize: '38px' }} className="text-lg font-bold">SAM</td>
                        </tr>
                    </tbody>
                  </table>
                  <div style={{ transform: 'scale(1.5)', marginTop: '55px', marginLeft: '106px'}}>
                        <ApproveDenyButtonElement element={approveDenyButtonElement} />
                  </div>
              </div>
          </div>
      </div><div className="alert-element bg-#252526 text-white shadow-lg p-4" style={{ width: '560px', height: '985px' }}>
              <div className="w-1/2 pl-4">
                  <h4 className="font-semibold" style={{ fontSize: '38px', height: '39px', width: '421px', marginBottom: '30px' }}>Additional Information</h4>
                  <table className="table-auto" style={{ fontSize: '32px', height: '711px', width: '443px' }}>
                      <tbody>
                          <tr>
                              <td className="pr-4" style={tablestyle}>reporter:</td>
                              <td style={{ border: '1px solid white', padding: '8px' }}>ACA-7</td>
                          </tr>
                          <tr>
                              <td className="pr-4" style={tablestyle}>threat:</td>
                              <td style={{ border: '1px solid white', padding: '8px' }}>SA_4</td>
                          </tr>
                          <tr>
                              <td className="pr-4" style={tablestyle}>location:</td>
                              <td style={{ border: '1px solid white', padding: '8px' }}>34° N, 118° W</td>
                          </tr>
                          <tr>
                              <td className="pr-4" style={tablestyle}>distance:</td>
                              <td style={{ border: '1px solid white', padding: '8px' }}>620 mi</td>
                          </tr>
                          <tr>
                              <td className="pr-4" style={tablestyle}>altitude:</td>
                              <td style={{ border: '1px solid white', padding: '8px' }}>20,000 ft</td>
                          </tr>
                          <tr>
                              <td className="pr-4" style={tablestyle}>time to impact:</td>
                              <td style={{ border: '1px solid white', padding: '8px' }}>45 sec</td>
                          </tr>
                          <tr>
                              <td className="pr-4" style={tablestyle}>priority:</td>
                              <td style={{ border: '1px solid white', padding: '8px' }}>high</td>
                          </tr>
                          <tr>
                              <td className="pr-4" style={tablestyle}>threat-level:</td>
                              <td style={{ border: '1px solid white', padding: '8px' }}>high</td>
                          </tr>
                          <tr>
                              <td className="pr-4" style={tablestyle}>survivability:</td>
                              <td style={{ border: '1px solid white', padding: '8px' }}>80%</td>
                          </tr>
                          <tr>
                              <td className="pr-4" style={tablestyle}>col. damage:</td>
                              <td style={{ border: '1px solid white', padding: '8px' }}>29%</td>
                          </tr>
                          <tr>
                              <td className="pr-4" style={tablestyle}>missile type:</td>
                              <td style={{ border: '1px solid white', padding: '8px' }}>SAM</td>
                          </tr>
                          <tr>
                              <td className="pr-4" style={tablestyle}>safe zone dist.:</td>
                              <td style={{ border: '1px solid white', padding: '8px' }}>115 mi</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div></>
  );
  
};

export default EscalationModeElement;