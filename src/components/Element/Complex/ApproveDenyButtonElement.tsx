import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { getGazesAndKeys } from 'src/redux/slices/gazeSlice';
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
  bigCircleGradientStart: string,
  bigCircleGradientEnd: string,
  smallTurqoiseCircleRadius: number,
  smallTurqoiseCirclePosition: number,
  smallTurqoiseCircleOpacity: number,
  tinyDotOpacity: number,
  tinyDotRadius: number,
  approveButtonPosition: number,
  approveButtonOpacity: number,
  approveArrowOpacity: number,
  denyButtonPosition: number,
  denyButtonOpacity: number,
  denyArrowOpacity: number,
};

const INITIAL_KEYFRAME: KeyframeParameters = {
  bigCircleRadius: SIZES.bigCircle,
  bigCircleGradientStart: "0x646464",
  bigCircleGradientEnd: "0x646464",
  smallTurqoiseCircleRadius: SIZES.smallTurqoiseCircle,
  smallTurqoiseCirclePosition: 0.5,
  smallTurqoiseCircleOpacity: 1,
  tinyDotOpacity: 0.8,
  tinyDotRadius: SIZES.tinyWhiteDot,
  approveButtonPosition: 1,
  approveButtonOpacity: 1,
  approveArrowOpacity: 1,
  denyButtonPosition: 0,
  denyButtonOpacity: 1,
  denyArrowOpacity: 1,
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
      bigCircleGradientStart: "0x646464",
      bigCircleGradientEnd: "0x00C007",
      smallTurqoiseCircleRadius: SIZES.smallTurqoiseCircle,
      smallTurqoiseCirclePosition: 0.7,
      smallTurqoiseCircleOpacity: 1,
      tinyDotOpacity: 0.8,
      tinyDotRadius: SIZES.tinyWhiteDot,
      approveButtonPosition: 1,
      approveButtonOpacity: 1,
      approveArrowOpacity: 1,
      denyButtonPosition: 0,
      denyButtonOpacity: 1,
      denyArrowOpacity: 0.2,
    },
  },
  {
    "time": 1.5,
    "params": {
      bigCircleRadius: SIZES.bigCircle,
      bigCircleGradientStart: "0x00C007",
      bigCircleGradientEnd: "0x00C007",
      smallTurqoiseCircleRadius: SIZES.smallTurqoiseCircle,
      smallTurqoiseCirclePosition: 1,
      smallTurqoiseCircleOpacity: 1,
      tinyDotOpacity: 0,
      tinyDotRadius: SIZES.tinyWhiteDot,
      approveButtonPosition: 0.5,
      approveButtonOpacity: 1,
      approveArrowOpacity: 0,
      denyButtonPosition: 0,
      denyButtonOpacity: 0,
      denyArrowOpacity: 0,
    },
  },
  {
    "time": 2,
    "params": {
      bigCircleRadius: SIZES.bigCircle,
      bigCircleGradientStart: "0x00C007",
      bigCircleGradientEnd: "0x00C007",
      smallTurqoiseCircleRadius: SIZES.smallTurqoiseCircle,
      smallTurqoiseCirclePosition: 1,
      smallTurqoiseCircleOpacity: 0,
      tinyDotOpacity: 0,
      tinyDotRadius: SIZES.tinyWhiteDot,
      approveButtonPosition: 0.5,
      approveButtonOpacity: 1,
      approveArrowOpacity: 0,
      denyButtonPosition: 0,
      denyButtonOpacity: 0,
      denyArrowOpacity: 0,
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
      bigCircleGradientStart: "0x646464",
      bigCircleGradientEnd: "0xBC2503",
      smallTurqoiseCircleRadius: SIZES.smallTurqoiseCircle,
      smallTurqoiseCirclePosition: 0.3,
      smallTurqoiseCircleOpacity: 1,
      tinyDotOpacity: 0.8,
      tinyDotRadius: SIZES.tinyWhiteDot,
      approveButtonPosition: 1,
      approveButtonOpacity: 1,
      approveArrowOpacity: 0.2,
      denyButtonPosition: 0,
      denyButtonOpacity: 1,
      denyArrowOpacity: 1,
    },
  },
  {
    "time": 1.5,
    "params": {
      bigCircleRadius: SIZES.bigCircle,
      bigCircleGradientStart: "0xBC2503",
      bigCircleGradientEnd: "0xBC2503",
      smallTurqoiseCircleRadius: SIZES.smallTurqoiseCircle,
      smallTurqoiseCirclePosition: 1,
      smallTurqoiseCircleOpacity: 1,
      tinyDotOpacity: 0,
      tinyDotRadius: SIZES.tinyWhiteDot,
      approveButtonPosition: 1,
      approveButtonOpacity: 0,
      approveArrowOpacity: 0,
      denyButtonPosition: 0.5,
      denyButtonOpacity: 1,
      denyArrowOpacity: 0,
    },
  },
  {
    "time": 2,
    "params": {
      bigCircleRadius: SIZES.bigCircle,
      bigCircleGradientStart: "0xBC2503",
      bigCircleGradientEnd: "0xBC2503",
      smallTurqoiseCircleRadius: SIZES.smallTurqoiseCircle,
      smallTurqoiseCirclePosition: 1,
      smallTurqoiseCircleOpacity: 0,
      tinyDotOpacity: 0,
      tinyDotRadius: SIZES.tinyWhiteDot,
      approveButtonPosition: 1,
      approveButtonOpacity: 0,
      approveArrowOpacity: 0,
      denyButtonPosition: 0.5,
      denyButtonOpacity: 1,
      denyArrowOpacity: 0,
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

const FRAMETIME = 1.0 / 60.0;

const linInterpolate = (start: number, end: number, t: number) => start * (1 - t) + end * t;

//doesn't work yet
/*const interpolateKeyframes = (keyframe1: KeyframeParameters, keyframe2: KeyframeParameters, t: number): KeyframeParameters => {
  let interpolatedParams: KeyframeParameters = {};
  for (const key in keyframe1) {
    if (Object.prototype.hasOwnProperty.call(keyframe1, key) && Object.prototype.hasOwnProperty.call(keyframe2, key)) {
      interpolatedParams = linInterpolate(keyframe1, keyframe2, t);
    }
  }
  return interpolatedParams;
};*/


const ApproveDenyButtonElement = ({
  element,
}: ApproveDenyButtonElementProps) => {
  const { h, w, id } = element;

  const headerStyle = { fontSize: w * SIZES.fontSize, height: h - w * SIZES.button, lineHeight: `${h - w * SIZES.button - 2}px` };
  const buttonStyle = { fontSize: w * SIZES.fontSize, height: w * SIZES.button - 2, lineHeight: `${w * SIZES.button - 2}px`, width: w * SIZES.sideLabel };

  const [state, setState] = useState(INITIAL_KEYFRAME);
  const [animation, setAnimation] = useState<"approve" | "deny" | undefined>(undefined);
  const [time, setTime] = useState(0);
  const intervalRef = useRef<any>(undefined); // this is really just `number | undefined` but typescript is stoopid

  useEffect(() => {
    let intervalHandle: any;

    const animationTick = () => {
      setState({...state, bigCircleRadius: state.bigCircleRadius + 0.01});
      setTime(prevTime => {
        const newTime = prevTime + FRAMETIME;
        if (newTime >= 1000) {
          stopAnimation();
        }
        return newTime;
      });
    };

    if (animation) {
      intervalRef.current = setInterval(animationTick, FRAMETIME);
    } else  {
      if (intervalRef.current !== undefined) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    }

    return () => {
      if (intervalRef.current !== undefined) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };
  });

  //const [intervalHandle, setIntervalHandle] = useState<number | undefined>(undefined);
  //const [time, setTime] = useState(0);

  //const animationTick = (action: "approve" | "deny") => {
  //  setTime(time + FRAMETIME);
  //  setState({...state, bigCircleRadius: state.bigCircleRadius * 1.1})
  //  if (time >= 1) {
  //    setAnimation(undefined);
  //    clearInterval(intervalHandle);
  //  }
  //}
  
  const stopAnimation = () => {
    setState(INITIAL_KEYFRAME);
    setAnimation(undefined);
    if (intervalRef.current !== undefined) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
    setTime(0);
  };

  const gazeAndKeys = useAppSelector(getGazesAndKeys);
  useEffect(() => {
    for (const i of gazeAndKeys) {
      if (animation !== "deny" && i.keyPress === "0") { // left mouse button
        setAnimation("deny");
        return;
      } else if (animation !== "approve" && i.keyPress === "2") { // right mouse button
        setAnimation("approve");
        return;
      }
    }
    if (!gazeAndKeys.some(x => x.keyPress === "0") && !gazeAndKeys.some(x => x.keyPress === "2")) {
      stopAnimation();
    }
  }, [gazeAndKeys]);

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
          </clipPath>
          <linearGradient id="bigCircleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: state.bigCircleGradientStart, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: state.bigCircleGradientEnd, stopOpacity: 1 }} />
          </linearGradient>
          <circle cx={236} cy={29} r={state.bigCircleRadius * 250} fill="url(#bigCircleGradient)" opacity="0.15"/>
          <circle cx={236} cy={29} r={state.tinyDotRadius * 250} fill="#FFFFFF" opacity={state.tinyDotOpacity}/>
          <polygon points="194,29 210,16 210,42" fill="#FFFFFF" opacity={state.denyArrowOpacity} stroke="black" stroke-width="1.5"/>
          <polygon points="278,29 262,16 262,42" fill="#FFFFFF" opacity={state.approveArrowOpacity} stroke="black" stroke-width="1.5"/>
          <circle cx={236} cy={29} r={state.smallTurqoiseCircleRadius * 250} fill="#19DEBB" opacity={state.smallTurqoiseCircleOpacity} stroke="black" stroke-width="0.5"/>
        </svg>
      </div>
    </div>
  );
};

/* 
      smallTurqoiseCirclePosition: 1,
      approveButtonPosition: 0.5,
      approveButtonOpacity: 1,
      denyButtonPosition: 0,
      denyButtonOpacity: 0,*/

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
