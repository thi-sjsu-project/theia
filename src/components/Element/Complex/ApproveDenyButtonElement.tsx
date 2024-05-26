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
  bigCircleRadius: number;
  bigCircleGradientStart: number;
  bigCircleGradientEnd: number;
  smallTurqoiseCirclePosition: number;
  smallTurqoiseCircleOpacity: number;
  tinyDotOpacity: number;
  approveButtonPosition: number;
  approveArrowOpacity: number;
  denyButtonPosition: number;
  denyArrowOpacity: number;
  denyArrowPosition: number;
  denyTextOpacity: number;
  approveTextOpacity: number;
  approveArrowPosition: number;
};

const INITIAL_KEYFRAME: KeyframeParameters = {
  bigCircleRadius: SIZES.bigCircle,
  bigCircleGradientStart: 0x646464,
  bigCircleGradientEnd: 0x646464,
  smallTurqoiseCirclePosition: 0.5,
  smallTurqoiseCircleOpacity: 1,
  tinyDotOpacity: 0.8,
  approveButtonPosition: 1,
  approveArrowOpacity: 1,
  denyButtonPosition: 0,
  denyArrowOpacity: 1,
  denyArrowPosition: 194,
  denyTextOpacity: 1,
  approveTextOpacity: 1,
  approveArrowPosition: 278,
} as const;

const KEYFRAMES_APPROVE = [
  {
    time: 0,
    params: INITIAL_KEYFRAME,
  },
  {
    time: 4,
    params: {
      bigCircleRadius: SIZES.bigCircle,
      bigCircleGradientStart: 0x646464,
      bigCircleGradientEnd: 0x00c007,
      smallTurqoiseCirclePosition: 0.63,
      smallTurqoiseCircleOpacity: 1,
      tinyDotOpacity: 0.8,
      approveButtonPosition: 1,
      approveArrowOpacity: 1,
      denyButtonPosition: 0,
      denyArrowOpacity: 0.2,
      denyArrowPosition: 194,
      denyTextOpacity: 1,
      approveTextOpacity: 1,
      approveArrowPosition: 278 + 0.13 * 472,
    },
  },
  {
    time: 6,
    params: {
      bigCircleRadius: SIZES.bigCircle,
      bigCircleGradientStart: 0x646464,
      bigCircleGradientEnd: 0x00c007,
      smallTurqoiseCirclePosition: 0.63,
      smallTurqoiseCircleOpacity: 1,
      tinyDotOpacity: 0.8,
      approveButtonPosition: 1,
      approveArrowOpacity: 1,
      denyButtonPosition: 0,
      denyArrowPosition: 194,
      denyArrowOpacity: 0.2,
      denyTextOpacity: 1,
      approveTextOpacity: 1,
      approveArrowPosition: 278 + 0.13 * 472,
    },
  },
  {
    time: 7,
    params: {
      bigCircleRadius: 1.1,
      bigCircleGradientStart: 0x00c007,
      bigCircleGradientEnd: 0x00c007,
      smallTurqoiseCirclePosition: 0.935,
      smallTurqoiseCircleOpacity: 1,
      tinyDotOpacity: 0,
      approveButtonPosition: 0.5,
      approveArrowOpacity: 0,
      denyButtonPosition: 0,
      denyArrowOpacity: 0,
      denyArrowPosition: 194,
      denyTextOpacity: 0,
      approveTextOpacity: 1,
      approveArrowPosition: 472,
    },
  },
  {
    time: 10,
    params: {
      bigCircleRadius: 1.1,
      bigCircleGradientStart: 0x00c007,
      bigCircleGradientEnd: 0x00c007,
      smallTurqoiseCirclePosition: 0.935,
      smallTurqoiseCircleOpacity: 0,
      tinyDotOpacity: 0,
      approveButtonPosition: 0.5,
      approveArrowOpacity: 0,
      denyButtonPosition: 0,
      denyArrowOpacity: 0,
      denyArrowPosition: 194,
      denyTextOpacity: 0,
      approveTextOpacity: 1,
      approveArrowPosition: 472,
    },
  },
  {
    time: 15,
    params: {
      bigCircleRadius: 1.1,
      bigCircleGradientStart: 0x00c007,
      bigCircleGradientEnd: 0x00c007,
      smallTurqoiseCirclePosition: 0.935,
      smallTurqoiseCircleOpacity: 0,
      tinyDotOpacity: 0,
      approveButtonPosition: 0.5,
      approveArrowOpacity: 0,
      denyButtonPosition: 0,
      denyArrowOpacity: 0,
      denyArrowPosition: 194,
      denyTextOpacity: 0,
      approveTextOpacity: 1,
      approveArrowPosition: 472,
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
      bigCircleRadius: SIZES.bigCircle,
      bigCircleGradientStart: 0xbc2503,
      bigCircleGradientEnd: 0x646464,
      smallTurqoiseCirclePosition: 0.37,
      smallTurqoiseCircleOpacity: 1,
      tinyDotOpacity: 0.8,
      approveButtonPosition: 1,
      approveArrowOpacity: 0.2,
      denyButtonPosition: 0,
      denyArrowOpacity: 1,
      denyArrowPosition: 194 - 0.13 * 472,
      denyTextOpacity: 1,
      approveTextOpacity: 1,
      approveArrowPosition: 278,
    },
  },
  {
    time: 6,
    params: {
      bigCircleRadius: SIZES.bigCircle,
      bigCircleGradientStart: 0xbc2503,
      bigCircleGradientEnd: 0x646464,
      smallTurqoiseCirclePosition: 0.37,
      smallTurqoiseCircleOpacity: 1,
      tinyDotOpacity: 0.8,
      approveButtonPosition: 1,
      approveArrowOpacity: 0.2,
      denyButtonPosition: 0,
      denyArrowOpacity: 1,
      denyArrowPosition: 194 - 0.13 * 472,
      denyTextOpacity: 1,
      approveTextOpacity: 1,
      approveArrowPosition: 278,
    },
  },
  {
    time: 7,
    params: {
      bigCircleRadius: 1.1,
      bigCircleGradientStart: 0xbc2503,
      bigCircleGradientEnd: 0xbc2503,
      smallTurqoiseCirclePosition: 0.065,
      smallTurqoiseCircleOpacity: 1,
      tinyDotOpacity: 0,
      approveButtonPosition: 1,
      approveArrowOpacity: 0,
      denyButtonPosition: 0.5,
      denyArrowOpacity: 0,
      denyArrowPosition: 0,
      denyTextOpacity: 1,
      approveTextOpacity: 0,
      approveArrowPosition: 278,
    },
  },
  {
    time: 10,
    params: {
      bigCircleRadius: 1.1,
      bigCircleGradientStart: 0xbc2503,
      bigCircleGradientEnd: 0xbc2503,
      smallTurqoiseCirclePosition: 0.065,
      smallTurqoiseCircleOpacity: 0,
      tinyDotOpacity: 0,
      approveButtonPosition: 1,
      approveArrowOpacity: 0,
      denyButtonPosition: 0.5,
      denyArrowOpacity: 0,
      denyArrowPosition: 0,
      denyTextOpacity: 1,
      approveTextOpacity: 0,
      approveArrowPosition: 278,
    },
  },
  {
    time: 15,
    params: {
      bigCircleRadius: 1.1,
      bigCircleGradientStart: 0xbc2503,
      bigCircleGradientEnd: 0xbc2503,
      smallTurqoiseCirclePosition: 0.065,
      smallTurqoiseCircleOpacity: 0,
      tinyDotOpacity: 0,
      approveButtonPosition: 1,
      approveArrowOpacity: 0,
      denyButtonPosition: 0.5,
      denyArrowOpacity: 0,
      denyArrowPosition: 0,
      denyTextOpacity: 1,
      approveTextOpacity: 0,
      approveArrowPosition: 278,
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
    smallTurqoiseCirclePosition: linInterpolate(keyframe1.smallTurqoiseCirclePosition, keyframe2.smallTurqoiseCirclePosition, t),
    smallTurqoiseCircleOpacity: linInterpolate(keyframe1.smallTurqoiseCircleOpacity, keyframe2.smallTurqoiseCircleOpacity, t),
    tinyDotOpacity: linInterpolate(keyframe1.tinyDotOpacity, keyframe2.tinyDotOpacity, t),
    approveButtonPosition: linInterpolate(keyframe1.approveButtonPosition, keyframe2.approveButtonPosition, t),
    approveArrowOpacity: linInterpolate(keyframe1.approveArrowOpacity, keyframe2.approveArrowOpacity, t),
    approveArrowPosition: linInterpolate(keyframe1.approveArrowPosition, keyframe2.approveArrowPosition, t),
    approveTextOpacity: linInterpolate(keyframe1.approveTextOpacity, keyframe2.approveTextOpacity, t), 
    denyButtonPosition: linInterpolate(keyframe1.denyButtonPosition, keyframe2.denyButtonPosition, t),
    denyArrowOpacity: linInterpolate(keyframe1.denyArrowOpacity, keyframe2.denyArrowOpacity, t),
    denyArrowPosition: linInterpolate(keyframe1.denyArrowPosition, keyframe2.denyArrowPosition, t),
    denyTextOpacity: linInterpolate(keyframe1.denyTextOpacity, keyframe2.denyTextOpacity, t), 
  };
};

const ApproveDenyButtonElement = ({
  element,
}: ApproveDenyButtonElementProps) => {
  const { h, w, id } = element;

  const headerStyle = {
    fontSize: w * SIZES.fontSize,
    height: h - w * SIZES.button,
    lineHeight: `${h - w * SIZES.button - 2}px`,
  };

  const [state, setState] = useState(INITIAL_KEYFRAME);
  const [animation, setAnimation] = useState<'approve' | 'deny' | undefined>(
    undefined,
  );
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
      else return stopAnimation();

      let idx;
      for (idx = 0; idx < keyframes.length; idx++) {
        if (idx >= keyframes.length - 1) return stopAnimation();
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
      if (animation !== 'deny' && i.keyPress === '0') {
        // left mouse button
        setAnimation('deny');
        return;
      } else if (animation !== 'approve' && i.keyPress === '2') {
        // right mouse button
        setAnimation('approve');
        return;
      }
    }
    if (
      !gazeAndKeys.some((x) => x.keyPress === '0') &&
      !gazeAndKeys.some((x) => x.keyPress === '2')
    ) {
      stopAnimation();
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
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

        {/* prettier-ignore */}
        <svg className="" style={{ width: w, height: w * SIZES.button }}>
          <clipPath id="clip">
            <rect x={0} y={0} width={w - 2} height={w * SIZES.button} rx={12} />
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
          <circle cx={w * 0.5} cy={w * SIZES.button * 0.5} r={state.bigCircleRadius * w * 0.5} fill="url(#bigCircleGradient)" clipPath="url(#clip)" />
          <circle cx={w * 0.5} cy={w * SIZES.button * 0.5} r={SIZES.tinyWhiteDot * w * 0.5} fill="#FFFFFF" opacity={state.tinyDotOpacity} />
          <circle cx={w * state.smallTurqoiseCirclePosition} cy={w * SIZES.button * 0.5} r={w * SIZES.smallTurqoiseCircle / 2} fill="url(#turquoiseCircleGradient)" opacity={state.smallTurqoiseCircleOpacity} />
          <polygon points={`${state.denyArrowPosition - 8},29 ${state.denyArrowPosition + 8},16 ${state.denyArrowPosition + 8},42`} fill="#FFFFFF" opacity={state.denyArrowOpacity} stroke="black" stroke-width="1.5" />
          <polygon points={`${state.approveArrowPosition + 8},29 ${state.approveArrowPosition - 8},16 ${state.approveArrowPosition - 8},42`} fill="#FFFFFF" opacity={state.approveArrowOpacity} stroke="black" stroke-width="1.5" />
        </svg>

        <div
          style={{
            ...buttonStyle,
            marginLeft: (w - buttonStyle.width) * state.denyButtonPosition,
          }}
          className="font-medium text-center"
        >
          <span style={{ opacity: state.denyTextOpacity }}>DENY</span>
        </div>
        <div
          style={{
            ...buttonStyle,
            marginLeft: (w - buttonStyle.width) * state.approveButtonPosition,
          }}
          className="font-medium text-center"
        >
          <span style={{ opacity: state.approveTextOpacity }}>APPROVE</span>
        </div>
      </div>
    </div>
  );
};
// "194,29 210,16 210,42"

export default ApproveDenyButtonElement;
