import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { getGazesAndKeys } from 'src/redux/slices/gazeSlice';
import type { ApproveDenyButtonElement as ApproveDenyButtonElementType } from 'src/types/element';

// XXX: When including the approve / deny button in a widget, do NOT add it as a
// regular element that will be rendered via Element.tsx. Instead, put it in
// directly without the Element abstraction, so that you can actually pass the
// onAction prop to it:
//
//   const MyWidget = () => {
//     ...
//     callback = (action) => console.log(`action: ${action}`);
//     ...
//     return <>
//       <ApproveDenyButtonElement element={approveDenyElement} onAction={callback}>
//     </>;
//   }
//
// It should only be called using the Element abstraction when you do not need a
// callback when the button is pressed.

type ApproveDenyButtonElementProps = {
  element: ApproveDenyButtonElementType;
  onAction?: (action: 'approve' | 'deny' | 'moreInfo' | "up") => void;
};

const SIZES = {
  bigCircle: 138 / 472,
  smallTurquoiseCircle: 44 / 472,
  tinyWhiteDot: 8 / 472,
  triangle: 24 / 472,
  button: 58 / 472,
  sideLabel: 167 / 472,
  fontSize: 28 / 472,
  smallFontSize: 24 / 472,
  moreInfoButton: 184 / 472,
  moreInfoButtonHeight: 49 / 472,
} as const;

type KeyframeParameters = {
  bigCircleRadius: number;
  bigCircleGradientStart: number;
  bigCircleGradientEnd: number;
  smallTurquoiseCirclePositionX: number;
  smallTurquoiseCirclePositionY: number;
  smallTurquoiseCircleOpacity: number;
  smallTurquoiseCircleRadius: number;
  tinyDotOpacity: number;
  approveButtonPosition: number;
  approveArrowOpacity: number;
  denyButtonPosition: number;
  denyArrowOpacity: number;
  denyArrowPosition: number;
  denyTextOpacity: number;
  approveTextOpacity: number;
  approveArrowPosition: number;
  downArrowPosition: number;
  downArrowOpacity: number;
  upArrowPosition: number;
  upArrowOpacity: number;
  moreInfoClip: boolean;
};

const INITIAL_KEYFRAME: KeyframeParameters = {
  bigCircleRadius: SIZES.bigCircle,
  bigCircleGradientStart: 0x646464,
  bigCircleGradientEnd: 0x646464,
  smallTurquoiseCirclePositionX: 0.5,
  smallTurquoiseCirclePositionY: 0,
  smallTurquoiseCircleOpacity: 1,
  smallTurquoiseCircleRadius: SIZES.smallTurquoiseCircle,
  tinyDotOpacity: 0.8,
  approveButtonPosition: 1,
  approveArrowOpacity: 1,
  denyButtonPosition: 0,
  denyArrowOpacity: 1,
  denyArrowPosition: 194 / 472,
  denyTextOpacity: 1,
  approveTextOpacity: 1,
  approveArrowPosition: 278 / 472,
  downArrowPosition: 0,
  downArrowOpacity: 1,
  upArrowPosition: 0,
  upArrowOpacity: 1,
  moreInfoClip: false,
} as const;

const KEYFRAMES_APPROVE = [
  {
    time: 0,
    params: INITIAL_KEYFRAME,
  },
  {
    time: 4,
    params: {
      ...INITIAL_KEYFRAME,
      bigCircleGradientEnd: 0x00c007,
      smallTurquoiseCirclePositionX: 0.6,
      denyArrowOpacity: 0.2,
      approveArrowPosition: 278 / 472 + 0.1,
      downArrowOpacity: 0.2,
      upArrowOpacity: 0.2,
    },
  },
  {
    time: 6,
    params: {
      ...INITIAL_KEYFRAME,
      bigCircleGradientEnd: 0x00c007,
      smallTurquoiseCirclePositionX: 0.6,
      denyArrowOpacity: 0.2,
      approveArrowPosition: 278 / 472 + 0.1,
      downArrowOpacity: 0.2,
      upArrowOpacity: 0.2,
    },
  },
  {
    time: 7,
    params: {
      ...INITIAL_KEYFRAME,
      bigCircleRadius: 1.1,
      bigCircleGradientStart: 0x00c007,
      bigCircleGradientEnd: 0x00c007,
      smallTurquoiseCirclePositionX: 0.935,
      tinyDotOpacity: 0,
      approveButtonPosition: 0.5,
      approveArrowOpacity: 0,
      denyArrowOpacity: 0,
      denyTextOpacity: 0,
      approveArrowPosition: 1,
      downArrowOpacity: 0.2,
      upArrowOpacity: 0.2,
    },
  },
  {
    time: 10,
    params: {
      ...INITIAL_KEYFRAME,
      bigCircleRadius: 1.1,
      bigCircleGradientStart: 0x00c007,
      bigCircleGradientEnd: 0x00c007,
      smallTurquoiseCirclePositionX: 0.935,
      smallTurquoiseCircleOpacity: 0,
      tinyDotOpacity: 0,
      approveButtonPosition: 0.5,
      approveArrowOpacity: 0,
      denyArrowOpacity: 0,
      denyTextOpacity: 0,
      approveArrowPosition: 1,
      downArrowOpacity: 0.2,
      upArrowOpacity: 0.2,
    },
  },
  {
    time: 15,
    params: {
      ...INITIAL_KEYFRAME,
      bigCircleRadius: 1.1,
      bigCircleGradientStart: 0x00c007,
      bigCircleGradientEnd: 0x00c007,
      smallTurquoiseCirclePositionX: 0.935,
      smallTurquoiseCircleOpacity: 0,
      tinyDotOpacity: 0,
      approveButtonPosition: 0.5,
      approveArrowOpacity: 0,
      denyArrowOpacity: 0,
      denyTextOpacity: 0,
      approveTextOpacity: 1,
      approveArrowPosition: 1,
      downArrowOpacity: 0.2,
      upArrowOpacity: 0.2,
    },
  },
];

const KEYFRAMES_DENY = [
  {
    time: 0,
    params: INITIAL_KEYFRAME,
  },
  {
    time: 4,
    params: {
      ...INITIAL_KEYFRAME,
      bigCircleGradientStart: 0xbc2503,
      smallTurquoiseCirclePositionX: 0.4,
      approveArrowOpacity: 0.2,
      denyArrowPosition: 194 / 472 - 0.1,
      downArrowOpacity: 0.2,
      upArrowOpacity: 0.2,
    },
  },
  {
    time: 6,
    params: {
      ...INITIAL_KEYFRAME,
      bigCircleGradientStart: 0xbc2503,
      smallTurquoiseCirclePositionX: 0.4,
      approveArrowOpacity: 0.2,
      denyButtonPosition: 0,
      denyArrowPosition: 194 / 472 - 0.1,
      downArrowOpacity: 0.2,
      upArrowOpacity: 0.2,
    },
  },
  {
    time: 7,
    params: {
      ...INITIAL_KEYFRAME,
      bigCircleRadius: 1.1,
      bigCircleGradientStart: 0xbc2503,
      bigCircleGradientEnd: 0xbc2503,
      smallTurquoiseCirclePositionX: 0.065,
      tinyDotOpacity: 0,
      approveArrowOpacity: 0,
      denyButtonPosition: 0.5,
      denyArrowOpacity: 0,
      denyArrowPosition: 0,
      approveTextOpacity: 0,
      downArrowOpacity: 0.2,
      upArrowOpacity: 0.2,
    },
  },
  {
    time: 10,
    params: {
      ...INITIAL_KEYFRAME,
      bigCircleRadius: 1.1,
      bigCircleGradientStart: 0xbc2503,
      bigCircleGradientEnd: 0xbc2503,
      smallTurquoiseCirclePositionX: 0.065,
      smallTurquoiseCircleOpacity: 0,
      tinyDotOpacity: 0,
      approveArrowOpacity: 0,
      denyButtonPosition: 0.5,
      denyArrowOpacity: 0,
      denyArrowPosition: 0,
      approveTextOpacity: 0,
      downArrowOpacity: 0.2,
      upArrowOpacity: 0.2,
    },
  },
  {
    time: 15,
    params: {
      ...INITIAL_KEYFRAME,
      bigCircleRadius: 1.1,
      bigCircleGradientStart: 0xbc2503,
      bigCircleGradientEnd: 0xbc2503,
      smallTurquoiseCirclePositionX: 0.065,
      smallTurquoiseCircleOpacity: 0,
      tinyDotOpacity: 0,
      approveArrowOpacity: 0,
      denyButtonPosition: 0.5,
      denyArrowOpacity: 0,
      denyArrowPosition: 0,
      approveTextOpacity: 0,
      downArrowOpacity: 0.2,
      upArrowOpacity: 0.2,
    },
  },
];

const KEYFRAMES_MORE_INFO = [
  {
    time: 0,
    params: INITIAL_KEYFRAME,
  },
  {
    time: 4,
    params: {
      ...INITIAL_KEYFRAME,
      smallTurquoiseCirclePositionY: 0.125,
      downArrowOpacity: 1,
      downArrowPosition: 0.25,
      upArrowOpacity: 0.2,
      approveArrowOpacity: 0.2,
      denyArrowOpacity: 0.2,
    },
  },
  {
    time: 5,
    params: {
      ...INITIAL_KEYFRAME,
      smallTurquoiseCirclePositionY: 0.125,
      downArrowOpacity: 1,
      downArrowPosition: 0.25,
      upArrowOpacity: 0.2,
      approveArrowOpacity: 0.2,
      denyArrowOpacity: 0.2,
    },
  },
  {
    time: 6,
    params: {
      ...INITIAL_KEYFRAME,
      smallTurquoiseCirclePositionY: 0.125,
      smallTurquoiseCircleRadius: 5 * SIZES.smallTurquoiseCircle,
      downArrowOpacity: 0,
      downArrowPosition: 0.25,
      moreInfoClip: true,
      upArrowOpacity: 0.2,
      approveArrowOpacity: 0.2,
      denyArrowOpacity: 0.2,
    },
  },
  {
    time: 10,
    params: {
      ...INITIAL_KEYFRAME,
      smallTurquoiseCirclePositionY: 0.125,
      smallTurquoiseCircleRadius: 5 * SIZES.smallTurquoiseCircle,
      downArrowOpacity: 0,
      downArrowPosition: 0.25,
      moreInfoClip: true,
      upArrowOpacity: 0.2,
      approveArrowOpacity: 0.2,
      denyArrowOpacity: 0.2,
    },
  },
];

const FRAMETIME = 1.0 / 60.0;
const SPEED = 0.15;

const formatColor = (color: number) =>
  `#${('000000' + color.toString(16)).slice(-6)}`;

const linInterpolate = (start: number, end: number, t: number) =>
  start * (1 - t) + end * t;

const rgbInterpolate = (start: number, end: number, t: number) => {
  const rs = (start >> 16) & 0xff,
    gs = (start >> 8) & 0xff,
    bs = start & 0xff,
    re = (end >> 16) & 0xff,
    ge = (end >> 8) & 0xff,
    be = end & 0xff,
    r = (linInterpolate(rs, re, t) & 0xff) << 16,
    g = (linInterpolate(gs, ge, t) & 0xff) << 8,
    b = linInterpolate(bs, be, t) & 0xff;
  return r | g | b;
};

// prettier-ignore
const interpolateKeyframes = (keyframe1: KeyframeParameters, keyframe2: KeyframeParameters, t: number): KeyframeParameters => {
  return {
    bigCircleRadius: linInterpolate(keyframe1.bigCircleRadius, keyframe2.bigCircleRadius, t),
    bigCircleGradientStart: rgbInterpolate(keyframe1.bigCircleGradientStart, keyframe2.bigCircleGradientStart, t), 
    bigCircleGradientEnd: rgbInterpolate(keyframe1.bigCircleGradientEnd, keyframe2.bigCircleGradientEnd, t),
    smallTurquoiseCirclePositionX: linInterpolate(keyframe1.smallTurquoiseCirclePositionX, keyframe2.smallTurquoiseCirclePositionX, t),
    smallTurquoiseCirclePositionY: linInterpolate(keyframe1.smallTurquoiseCirclePositionY, keyframe2.smallTurquoiseCirclePositionY, t),
    smallTurquoiseCircleOpacity: linInterpolate(keyframe1.smallTurquoiseCircleOpacity, keyframe2.smallTurquoiseCircleOpacity, t),
    smallTurquoiseCircleRadius: linInterpolate(keyframe1.smallTurquoiseCircleRadius, keyframe2.smallTurquoiseCircleRadius, t),
    tinyDotOpacity: linInterpolate(keyframe1.tinyDotOpacity, keyframe2.tinyDotOpacity, t),
    approveButtonPosition: linInterpolate(keyframe1.approveButtonPosition, keyframe2.approveButtonPosition, t),
    approveArrowOpacity: linInterpolate(keyframe1.approveArrowOpacity, keyframe2.approveArrowOpacity, t),
    approveArrowPosition: linInterpolate(keyframe1.approveArrowPosition, keyframe2.approveArrowPosition, t),
    approveTextOpacity: linInterpolate(keyframe1.approveTextOpacity, keyframe2.approveTextOpacity, t), 
    denyButtonPosition: linInterpolate(keyframe1.denyButtonPosition, keyframe2.denyButtonPosition, t),
    denyArrowOpacity: linInterpolate(keyframe1.denyArrowOpacity, keyframe2.denyArrowOpacity, t),
    denyArrowPosition: linInterpolate(keyframe1.denyArrowPosition, keyframe2.denyArrowPosition, t),
    denyTextOpacity: linInterpolate(keyframe1.denyTextOpacity, keyframe2.denyTextOpacity, t), 
    downArrowPosition: linInterpolate(keyframe1.downArrowPosition, keyframe2.downArrowPosition, t), 
    downArrowOpacity: linInterpolate(keyframe1.downArrowOpacity, keyframe2.downArrowOpacity, t), 
    upArrowPosition: linInterpolate(keyframe1.upArrowPosition, keyframe2.upArrowPosition, t), 
    upArrowOpacity: linInterpolate(keyframe1.upArrowOpacity, keyframe2.upArrowOpacity, t), 
    moreInfoClip: keyframe2.moreInfoClip,
  };
};

const ApproveDenyButtonElement = ({
  element,
  onAction,
}: ApproveDenyButtonElementProps) => {
  const { h, w, id } = element;

  const headerStyle = {
    fontSize: w * SIZES.fontSize,
    height: h - w * SIZES.button,
    lineHeight: `${h - w * SIZES.button - 2}px`,
  };

  const [state, setState] = useState(INITIAL_KEYFRAME);
  const [animation, setAnimation] = useState<'approve' | 'deny' | 'moreInfo' | 'up' | undefined>(
    undefined,
  );
  const [moreInfoButtonActive, setMoreInfoButtonActive] = useState(element.showMoreInfoButton);
  const [time, setTime] = useState(0);
  const intervalRef = useRef<any>(undefined); // this is really just `number | undefined` but typescript is stoopid

  const buttonStyle = {
    fontSize: w * SIZES.fontSize,
    height: w * SIZES.button,
    lineHeight: `${w * SIZES.button - 2}px`,
    width: w * SIZES.sideLabel,
    marginTop: -w * SIZES.button,
  };

  useEffect(() => {
    const animationTick = () => {
      let keyframes;
      if (animation === 'approve') keyframes = KEYFRAMES_APPROVE;
      else if (animation === 'deny') keyframes = KEYFRAMES_DENY;
      else if (animation === 'moreInfo') keyframes = KEYFRAMES_MORE_INFO;
      else if (animation === 'up') return stopAnimation();
      else return stopAnimation();

      let idx;
      for (idx = 0; idx < keyframes.length; idx++) {
        if (idx >= keyframes.length - 1) {
          if (onAction) onAction(animation);
          if (animation === 'moreInfo') setMoreInfoButtonActive(false);
          return stopAnimation();
        }
        if (keyframes[idx].time <= time && keyframes[idx + 1].time >= time) {
          break;
        }
      }

      const keyframeTimeSpan = keyframes[idx + 1].time - keyframes[idx].time;
      const elapsedKeyframeTime = time - keyframes[idx].time;
      setState(
        interpolateKeyframes(
          keyframes[idx].params,
          keyframes[idx + 1].params,
          elapsedKeyframeTime / keyframeTimeSpan,
        ),
      );

      setTime((prevTime) => {
        const newTime = prevTime + FRAMETIME * SPEED;
        if (newTime >= 1000) {
          stopAnimation();
        }
        return newTime;
      });
    };

    if (animation) {
      intervalRef.current = setInterval(animationTick, FRAMETIME);
    } else {
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
      if (animation !== 'deny' && i.keyPress === 'KeyH') { // left mouse button
        setAnimation('deny'); // TODO change to '0' - also a few lines further down !!!
      } else if (animation !== 'approve' && i.keyPress === 'KeyL') { // right mouse button
        setAnimation('approve'); // TODO change to '2'
      } else if (animation !== 'moreInfo' && i.keyPress === 'KeyJ' && moreInfoButtonActive) { // middle mouse button
        setAnimation('moreInfo'); // TODO change to '1'
      } else if (animation !== 'up' && i.keyPress === 'KeyK' && element.showUpButton) { // k
        setAnimation('up');
      } else continue;
      return;
    }
    if (
      !gazeAndKeys.some((x) => x.keyPress === 'KeyH') &&
      !gazeAndKeys.some((x) => x.keyPress === 'KeyJ') &&
      !gazeAndKeys.some((x) => x.keyPress === 'KeyK') &&
      !gazeAndKeys.some((x) => x.keyPress === 'KeyL')
    ) {
      stopAnimation();
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [gazeAndKeys]);

  return (
    <div
      id={id}
      className="text-[#f5f5f5] border-2 border-[#282828] rounded-xl"
      style={{
        height: h + 3,
        width: w + 3,
        marginLeft: -3,
        marginTop: -3,
      }}
    >
      <div className="bg-[#282828] bg-opacity-90 border-black rounded-xl" style={{ borderWidth: 3 }}>
        {element.title
          ? <div style={headerStyle} className="font-medium text-center">
              <div>Approve kinetic attack?</div>
            </div>
          : <></>
        }

        {/* prettier-ignore */}
        <div style={{ height: w * SIZES.button }}>
          <div style={{
            height: w * SIZES.button,
            width: w,
            background: "linear-gradient(90deg, rgba(40, 40, 40, 0.00) 0%, rgba(76, 76, 76, 0.90) 40%, rgba(76, 76, 76, 0.90) 60%, rgba(40, 40, 40, 0.00) 100%)"
          }}></div>
          <svg style={{ width: w, height: 1.5 * w, position: "absolute", marginTop: -w * (1 + SIZES.button) }} viewBox={`0 ${-0.5 * w} ${w} ${0.5 * w}`}>
            <clipPath id="clip">
              <rect x={0} y={0} width={w - 2} height={w * SIZES.button} rx={12} />
            </clipPath>

            <clipPath id="moreInfoClip">
              <rect x={w * 0.5 * (1 - SIZES.moreInfoButton) + 2} y={w * (SIZES.button + 0.01) + 2} width={w * SIZES.moreInfoButton - 4} height={w * SIZES.moreInfoButtonHeight - 4} fill="#282828" rx={10} opacity={0.9} stroke="black" strokeWidth={2} />
            </clipPath>

            <linearGradient id="bigCircleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: formatColor(state.bigCircleGradientStart), stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: formatColor(state.bigCircleGradientEnd), stopOpacity: 1 }} />
            </linearGradient>

            <radialGradient id="turquoiseCircleGradient">
              <stop offset="0%" stop-color="#19debb" />
              <stop offset="60%" stop-color="#19debb" />
              <stop offset="75%" stop-color="#17cfad" />
              <stop offset="90%" stop-color="#14b89a" />
              <stop offset="100%" stop-color="#0f8a73" />
            </radialGradient>

            {moreInfoButtonActive ? <rect x={w * 0.5 * (1 - SIZES.moreInfoButton)} y={w * (SIZES.button + 0.01)} width={w * SIZES.moreInfoButton} height={w * SIZES.moreInfoButtonHeight} fill="#282828" rx={10} opacity={0.9} stroke="black" strokeWidth={2} /> : <></>}

            <circle cx={w * 0.5} cy={w * SIZES.button * 0.5} r={state.bigCircleRadius * w * 0.5} fill="url(#bigCircleGradient)" clipPath="url(#clip)" />
            <circle cx={w * 0.5} cy={w * SIZES.button * 0.5} r={SIZES.tinyWhiteDot * w * 0.5} fill="#FFFFFF" opacity={state.tinyDotOpacity} />
            <circle cx={w * state.smallTurquoiseCirclePositionX} cy={w * (SIZES.button * 0.5 + state.smallTurquoiseCirclePositionY)} r={w * state.smallTurquoiseCircleRadius / 2} fill="url(#turquoiseCircleGradient)" opacity={state.smallTurquoiseCircleOpacity} clipPath={state.moreInfoClip ? 'url(#moreInfoClip)' : undefined} />

            <polygon fill="#FFFFFF" opacity={state.denyArrowOpacity} stroke="black" stroke-width="1.5"
              points={`${w * (state.denyArrowPosition - 0.125 * SIZES.triangle)},${0.5 * w * SIZES.button} ` +
                      `${w * (state.denyArrowPosition + 0.375 * SIZES.triangle)},${0.5 * w * (SIZES.button - SIZES.triangle)} ` +
                      `${w * (state.denyArrowPosition + 0.375 * SIZES.triangle)},${0.5 * w * (SIZES.button + SIZES.triangle)}`} />
            <polygon fill="#FFFFFF" opacity={state.approveArrowOpacity} stroke="black" stroke-width="1.5"
              points={`${w * (state.approveArrowPosition + 0.125 * SIZES.triangle)},${0.5 * w * SIZES.button} ` +
                      `${w * (state.approveArrowPosition - 0.375 * SIZES.triangle)},${0.5 * w * (SIZES.button - SIZES.triangle)} ` +
                      `${w * (state.approveArrowPosition - 0.375 * SIZES.triangle)},${0.5 * w * (SIZES.button + SIZES.triangle)}`} />
            {moreInfoButtonActive ? <polygon fill="#FFFFFF" opacity={state.downArrowOpacity} stroke="black" stroke-width="1.5"
              points={`${0.5 * w * (1 - SIZES.triangle)},${0.5 * w * (SIZES.button + SIZES.smallTurquoiseCircle + state.downArrowPosition + 0.05)} ` +
                      `${0.5 * w * (1 + SIZES.triangle)},${0.5 * w * (SIZES.button + SIZES.smallTurquoiseCircle + state.downArrowPosition + 0.05)} ` +
                      `${0.5 * w},${0.5 * w * (SIZES.button + SIZES.smallTurquoiseCircle + state.downArrowPosition + 0.05 + SIZES.triangle)}`} /> : <></>}
            {element.showUpButton ? <polygon fill="#FFFFFF" opacity={state.upArrowOpacity} stroke="black" stroke-width="1.5"
              points={`${0.5 * w * (1 - SIZES.triangle)},${0.5 * w * (SIZES.button - SIZES.smallTurquoiseCircle - state.upArrowPosition - 0.05)} ` +
                      `${0.5 * w * (1 + SIZES.triangle)},${0.5 * w * (SIZES.button - SIZES.smallTurquoiseCircle - state.upArrowPosition - 0.05)} ` +
                      `${0.5 * w},${0.5 * w * (SIZES.button - SIZES.smallTurquoiseCircle - state.upArrowPosition - 0.05 - SIZES.triangle)}`} /> : <></>}
          </svg>
        </div>

        <div
          style={{
            ...buttonStyle,
            marginLeft: (w - buttonStyle.width) * state.denyButtonPosition,
          }}
          className="absolute font-medium text-center"
        >
          <span style={{ opacity: state.denyTextOpacity }}>DENY</span>
        </div>

        <div
          style={{
            ...buttonStyle,
            marginLeft: (w - buttonStyle.width) * state.approveButtonPosition,
          }}
          className="absolute font-medium text-center"
        >
          <span style={{ opacity: state.approveTextOpacity }}>APPROVE</span>
        </div>

        {moreInfoButtonActive
          ?
            <div
              style={{
                fontSize: w * SIZES.smallFontSize,
                width: w,
                marginTop: w * 0.025,
              }}
              className="absolute font-medium text-center absolute"
            >
              REQUEST VIDEO
            </div>
          : <></>
        }
      </div>
    </div>
  );
};
// "194,29 210,16 210,42"

export default ApproveDenyButtonElement;
