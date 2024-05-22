import { useState } from 'react';
import type { ApproveDenyButtonElement as ApproveDenyButtonElementType } from 'src/types/element';

type ApproveDenyButtonElementProps = {
  element: ApproveDenyButtonElementType;
};

const SIZES = {
  bigCircle: 138 / 472,
  smallTurqoiseCircle: 44 / 472,
  tinyWhiteDot: 8 / 472,
  triangle: 24 / 472,
  button: 58 / 472,
  sideLabel: 167 / 472,
  fontSize: 28 / 472,
} as const;

type KeyframeParameters = {
  bigCircleRadius: number,
  bigCircleGradientStart: number,
  bigCircleGradientEnd: number,
  smallTurqoiseCirclePosition: number,
  smallTurqoiseCircleOpacity: number,
  tinyDotOpacity: number,
  approveButtonPosition: number,
  approveButtonOpacity: number,
  denyButtonPosition: number,
  denyButtonOpacity: number,
};

const INITIAL_KEYFRAME: KeyframeParameters = {
  bigCircleRadius: SIZES.bigCircle,
  bigCircleGradientStart: 0x646464,
  bigCircleGradientEnd: 0x646464,
  smallTurqoiseCirclePosition: 0.5,
  smallTurqoiseCircleOpacity: 1,
  tinyDotOpacity: 0.8,
  approveButtonPosition: 1,
  approveButtonOpacity: 1,
  denyButtonPosition: 0,
  denyButtonOpacity: 1,
} as const;

const KEYFRAMES_APPROVE = [
  {
    "time": 0,
    "params": INITIAL_KEYFRAME,
  },
  {
    "time": 1,
    "params": {
      bigCircleRadius: SIZES.bigCircle,
      bigCircleGradientStart: 0x646464,
      bigCircleGradientEnd: 0x00C007,
      smallTurqoiseCirclePosition: 0.5,
      smallTurqoiseCircleOpacity: 1,
      tinyDotOpacity: 0.8,
      approveButtonPosition: 1,
      approveButtonOpacity: 1,
      denyButtonPosition: 0,
      denyButtonOpacity: 1,
    },
  },
  {
    "time": 1.5,
    "params": {
      bigCircleRadius: SIZES.bigCircle,
      bigCircleGradientStart: 0x00C007,
      bigCircleGradientEnd: 0x00C007,
      smallTurqoiseCirclePosition: 1,
      smallTurqoiseCircleOpacity: 1,
      tinyDotOpacity: 0,
      approveButtonPosition: 0.5,
      approveButtonOpacity: 1,
      denyButtonPosition: 0,
      denyButtonOpacity: 0,
    },
  },
  {
    "time": 2,
    "params": {
      bigCircleRadius: SIZES.bigCircle,
      bigCircleGradientStart: 0x00C007,
      bigCircleGradientEnd: 0x00C007,
      smallTurqoiseCirclePosition: 1,
      smallTurqoiseCircleOpacity: 0,
      tinyDotOpacity: 0,
      approveButtonPosition: 0.5,
      approveButtonOpacity: 1,
      denyButtonPosition: 0,
      denyButtonOpacity: 0,
    },
  },
];

const KEYFRAMES_DENY = [
  {
    "time": 0,
    "params": INITIAL_KEYFRAME,
  },
  {
    "time": 1,
    "params": {
      bigCircleRadius: SIZES.bigCircle,
      bigCircleGradientStart: 0x646464,
      bigCircleGradientEnd: 0xBC2503,
      smallTurqoiseCirclePosition: 0.5,
      smallTurqoiseCircleOpacity: 1,
      tinyDotOpacity: 0.8,
      approveButtonPosition: 1,
      approveButtonOpacity: 1,
      denyButtonPosition: 0,
      denyButtonOpacity: 1,
    },
  },
  {
    "time": 1.5,
    "params": {
      bigCircleRadius: SIZES.bigCircle,
      bigCircleGradientStart: 0xBC2503,
      bigCircleGradientEnd: 0xBC2503,
      smallTurqoiseCirclePosition: 1,
      smallTurqoiseCircleOpacity: 1,
      tinyDotOpacity: 0,
      approveButtonPosition: 1,
      approveButtonOpacity: 0,
      denyButtonPosition: 0.5,
      denyButtonOpacity: 1,
    },
  },
  {
    "time": 2,
    "params": {
      bigCircleRadius: SIZES.bigCircle,
      bigCircleGradientStart: 0xBC2503,
      bigCircleGradientEnd: 0xBC2503,
      smallTurqoiseCirclePosition: 1,
      smallTurqoiseCircleOpacity: 0,
      tinyDotOpacity: 0,
      approveButtonPosition: 1,
      approveButtonOpacity: 0,
      denyButtonPosition: 0.5,
      denyButtonOpacity: 1,
    },
  },
];

// keyframes
// - approve:
//   - 0: pos turqoise circle center, gray background
//   - 1: pos turqoise circle right of big circle, gray-green gradient background, arrows fade out
//   - 2: pos turqoise circle right of entire button, "approve" in middle of button, button green
//   - 3: no turqoise circle, "approve" in middle of button, button green, rest disappears
// - deny:
//   - 0: pos turqoise circle center, gray background
//   - 1: pos turqoise circle left of big circle, gray-red gradient background, arrows fade out
//   - 2: pos turqoise circle left of entire button, "deny" in middle of button, button red
//   - 3: no turqoise circle, "deny" in middle of button, button red

const ApproveDenyButtonElement = ({
  element,
}: ApproveDenyButtonElementProps) => {
  const { h, w, id } = element;

  const headerStyle = { fontSize: w * SIZES.fontSize, height: h - w * SIZES.button, lineHeight: `${h - w * SIZES.button - 2}px` };
  const buttonStyle = { fontSize: w * SIZES.fontSize, height: w * SIZES.button - 2, lineHeight: `${w * SIZES.button - 2}px`, width: w * SIZES.sideLabel };

  const [state, setState] = useState(INITIAL_KEYFRAME);

  return (
    <div
      id={id}
      className="absolute mt-[-100%] text-[#f5f5f5]"
      style={{
        height: h,
        width: w,
      }}
    >
      <div className="bg-[#282828] bg-opacity-90 border-2 border-black rounded-xl">
        <div style={headerStyle} className="font-medium text-center">
          <div>Approve kinetic attack?</div>
        </div>
        <div style={{ height: w * SIZES.button }} className="flex">
          <div style={buttonStyle} className="font-medium text-center">DENY</div>
          <div className="grow" />
          <div style={buttonStyle} className="font-medium text-center">APPROVE</div>
        </div>
        <svg className="" style={{ width: w, height: w * SIZES.button, marginTop: -w * SIZES.button }}>
          <clipPath id="clip">
            <rect />
          </clipPath>
        </svg>
      </div>
    </div>
  );
};

// rot: #BC2503, grün: #00C007, schwarz: #282828 90%, türkis: #19DEBB, linear gradient rot: #FFFFFF 10% & #BC2402 100%, linear gradient grün: #00C007 100% & #FFFFFF 10%

export default ApproveDenyButtonElement;
/* 
background schrift: #F5F5F5;
background: #282828E5;
background: #19DEBB;
background: #00C007;
background: #BC2503;
background: #FFFFFF;
background: #3E3E42;
background: #000000;
background: linear-gradient(90deg, rgba(40, 40, 40, 0) 0%, rgba(76, 76, 76, 0.9) 30.34%, rgba(76, 76, 76, 0.9) 70%, rgba(40, 40, 40, 0) 100%);
background: linear-gradient(270.42deg, #00C007 0.39%, rgba(255, 255, 255, 0.1) 99.67%);
background: linear-gradient(270.42deg, rgba(255, 255, 255, 0.1) 0.39%, #BC2402 99.67%);
background: #FFFFFF26;
*/
