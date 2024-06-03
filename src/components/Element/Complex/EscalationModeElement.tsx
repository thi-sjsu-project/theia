import { type Dispatch, type SetStateAction, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useAppSelector } from 'src/redux/hooks';
import { getGazesAndKeys } from 'src/redux/slices/gazeSlice';
import ApproveDenyButtonElement from './ApproveDenyButtonElement';
import type {
  ApproveDenyButtonElement as ApproveDenyButtonElementType,
  EscalationModeElement as EscalationModeElementType,
} from 'src/types/element';
import MissileIcon from 'src/assets/icons/threats/missile-lg-emph.svg';

type EscalationModeElementProps = {
  element: EscalationModeElementType;
  animation: string;
  animationClass: string;
  setAnimation: (action: 'approve' | 'deny') => void;
  setAnimationClass: Dispatch<SetStateAction<string>>;
  onAction?: (action: 'approve' | 'deny') => void;
};

const EscalationModeElement = ({
  element,
  onAction,
  setAnimation,
  setAnimationClass,
  animation,
  animationClass,
}: EscalationModeElementProps) => {
  const gazesAndKeys = useAppSelector(getGazesAndKeys);
  const approveDenyButtonElement = {
    id: uuid(),
    h: 156,
    w: 476,
    modality: 'visual',
    type: 'approve-deny-button',
    title: 'Switch to AUTO Mode?',
    showMoreInfoButton: false,
    showUpButton: false,
  } satisfies ApproveDenyButtonElementType;

  const tablestyleLeftRow = {
    fontSize: '32px',
    border: '1px solid #585864',
    padding: '8px',
    color: '#C1C1C1',
    borderLeft: '0px',
  };

  const tablestyleRightRow = {
    fontSize: '32px',
    border: '1px solid #585864',
    padding: '8px',
    color: '#DEDEDE',
    borderRight: '0px',
  };

  useEffect(() => {
    if (animation === 'approve' || animation === 'deny') {
      setAnimationClass('animate-blur-away');
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (animation !== 'deny' && e.key === 'h') {
        // left mouse button
        setAnimation('deny');
        onAction?.('deny');
      } else if (animation !== 'approve' && e.key === 'l') {
        // right mouse button
        setAnimation('approve');
        onAction?.('approve');
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [animation, onAction]);

  return (
    <>
      <div style={{ width: '560px' }}></div>
      <>
        <div
          className={`alert-element text-white shadow-lg p-7 ${animationClass}`}
          style={{
            width: '800px',
            height: '970px',
            boxShadow: '8px 0px 60px 0px #000000',
            zIndex: 1000,
            visibility: 'visible',
            backgroundColor: '#1E1E1E',
          }}
        >
          <div className="w-1/2 pr-4">
            <div className="mb-4" style={{ width: '488px', height: '128px' }}>
              <div
                className="flex items-center mb-4"
                style={{ width: '800px' }}
              >
                <img
                  src={MissileIcon}
                  alt="Missile Icon"
                  className="ml-4"
                  style={{
                    width: '80px',
                    height: '80px',
                    marginLeft: '67px',
                    marginRight: '26px',
                    marginTop: '40px',
                  }}
                />
                <h3
                  className="text-lg font-semibold"
                  style={{
                    fontSize: '64px',
                    marginBottom: '40px',
                    height: '128px',
                    width: '488px',
                    lineHeight: '64px',
                    marginTop: '80px',
                  }}
                >
                  Missile Heading Towards Ownship!
                </h3>
              </div>
              <p
                style={{
                  fontSize: '38px',
                  marginBottom: '70px',
                  height: '39px',
                  width: '421px',
                  color: '#BCBCBC',
                  marginLeft: '43px',
                }}
              >
                ACA-7 detected launch
              </p>
              <table
                className="table-auto mb-4 no-outer-border"
                style={{
                  fontSize: '38px',
                  width: '708px',
                  height: '120px',
                  marginLeft: '15px',
                  borderCollapse: 'collapse',
                }}
              >
                <tbody>
                  <tr style={{ background: '#151515' }}>
                    <td
                      style={{
                        border: '1px solid #585864',
                        padding: '8px',
                        color: '#BCBCBC',
                        borderLeft: '0px',
                      }}
                    >
                      Time to Impact:
                    </td>
                    <td
                      style={{
                        border: '1px solid #585864',
                        padding: '8px',
                        fontSize: '38px',
                        borderRight: '0px',
                      }}
                      className="text-lg font-bold"
                    >
                      45 seconds
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: '1px solid #585864',
                        padding: '8px',
                        color: '#BCBCBC',
                        borderLeft: '0px',
                      }}
                    >
                      Missile Type:
                    </td>
                    <td
                      style={{
                        border: '1px solid #585864',
                        padding: '8px',
                        fontSize: '38px',
                        borderRight: '0px',
                      }}
                      className="text-lg font-bold"
                    >
                      SAM
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                style={{
                  transform: 'scale(1.5)',
                  marginTop: '100px',
                  marginLeft: '106px',
                }}
              >
                <ApproveDenyButtonElement element={approveDenyButtonElement} />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`alert-element text-white shadow-lg p-7 ${animationClass}`}
          style={{
            width: '560px',
            height: '970px',
            visibility: 'visible',
            backgroundColor: '#1E1E1E',
          }}
        >
          <div className="w-1/2 pl-4">
            <h4
              style={{
                fontSize: '38px',
                height: '39px',
                width: '421px',
                marginBottom: '30px',
                marginTop: '50px',
                color: '#B7B7B7',
              }}
            >
              Additional Information
            </h4>
            <table
              className="table-auto"
              style={{
                fontSize: '32px',
                height: '711px',
                width: '443px',
                borderCollapse: 'collapse',
              }}
            >
              <tbody>
                <tr style={{ background: '#151515' }}>
                  <td className="pr-4" style={tablestyleLeftRow}>
                    reporter:
                  </td>
                  <td style={tablestyleRightRow}>ACA-7</td>
                </tr>
                <tr>
                  <td className="pr-4" style={tablestyleLeftRow}>
                    threat:
                  </td>
                  <td style={tablestyleRightRow}>SA_4</td>
                </tr>
                <tr style={{ background: '#151515' }}>
                  <td className="pr-4" style={tablestyleLeftRow}>
                    location:
                  </td>
                  <td style={tablestyleRightRow}>34° N, 118° W</td>
                </tr>
                <tr>
                  <td className="pr-4" style={tablestyleLeftRow}>
                    distance:
                  </td>
                  <td style={tablestyleRightRow}>620 mi</td>
                </tr>
                <tr style={{ background: '#151515' }}>
                  <td className="pr-4" style={tablestyleLeftRow}>
                    altitude:
                  </td>
                  <td style={tablestyleRightRow}>20,000 ft</td>
                </tr>
                <tr>
                  <td className="pr-4" style={tablestyleLeftRow}>
                    time to impact:
                  </td>
                  <td style={tablestyleRightRow}>45 sec</td>
                </tr>
                <tr style={{ background: '#151515' }}>
                  <td className="pr-4" style={tablestyleLeftRow}>
                    priority:
                  </td>
                  <td style={tablestyleRightRow}>high</td>
                </tr>
                <tr>
                  <td className="pr-4" style={tablestyleLeftRow}>
                    threat-level:
                  </td>
                  <td style={tablestyleRightRow}>high</td>
                </tr>
                <tr style={{ background: '#151515' }}>
                  <td className="pr-4" style={tablestyleLeftRow}>
                    survivability:
                  </td>
                  <td style={tablestyleRightRow}>80%</td>
                </tr>
                <tr>
                  <td className="pr-4" style={tablestyleLeftRow}>
                    col. damage:
                  </td>
                  <td style={tablestyleRightRow}>29%</td>
                </tr>
                <tr style={{ background: '#151515' }}>
                  <td className="pr-4" style={tablestyleLeftRow}>
                    missile type:
                  </td>
                  <td style={tablestyleRightRow}>SAM</td>
                </tr>
                <tr>
                  <td className="pr-4" style={tablestyleLeftRow}>
                    safe zone dist.:
                  </td>
                  <td style={tablestyleRightRow}>115 mi</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    </>
  );
};

export default EscalationModeElement;
