import { GAZE_RADIUS } from 'src/utils/constants';
import type { Position } from 'src/types/support-types';
import { SCREEN_SIZE } from 'src/utils/constants';

type GazeProps = {
  mousePosition: Position;
};

const Gaze = ({ mousePosition }: GazeProps) => {
  const { x, y } = mousePosition;
  const { width, height } = SCREEN_SIZE;

  // Don't render the gaze if the cursor is outside screen
  if (x - GAZE_RADIUS > width || y - GAZE_RADIUS > height) return null;

  return (
    <div
      className={`cursor-none absolute rounded-full ring-4 ring-blue-400 z-50 bg-blue-400 bg-opacity-20`}
      style={{
        width: GAZE_RADIUS * 2,
        height: GAZE_RADIUS * 2,
        top: y - GAZE_RADIUS,
        left: x - GAZE_RADIUS,
      }}
    />
  );
};

export default Gaze;
