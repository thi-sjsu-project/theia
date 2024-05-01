import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
  getDrones,
  getOwnship,
  updateWidget,
} from 'src/redux/slices/minimapSlice';
import { OWNSHIP_TRAJECTORY } from 'src/utils/constants';

const useMoveShips = () => {
  const dispatch = useAppDispatch();
  const ownship = useAppSelector(getOwnship);
  const drones = useAppSelector(getDrones);

  useEffect(() => {
    if (!ownship) return;

    // update ownship position every 500ms (0.5s)
    const timer = setInterval(() => {
      if (
        ownship.x + OWNSHIP_TRAJECTORY.xSpeed <= OWNSHIP_TRAJECTORY.end[0] &&
        ownship.y - OWNSHIP_TRAJECTORY.ySpeed >= OWNSHIP_TRAJECTORY.end[1]
      ) {
        // only update ownship position if within bounds
        dispatch(
          updateWidget({
            ...ownship,
            x: ownship.x + OWNSHIP_TRAJECTORY.xSpeed,
            y: ownship.y - OWNSHIP_TRAJECTORY.ySpeed,
          }),
        );
      }
    }, 500);

    return () => clearInterval(timer);
  }, [ownship, dispatch]);

  useEffect(() => {
    if (!drones) return;

    // random drone movement every 1500ms (1.5s)
    const timer = setInterval(() => {
      const bounds = {
        left: 400,
        right: 1920,
        top: 1080,
        bottom: 50,
      };
      const droneMove = {
        x: 5,
        y: 0,
      };

      drones.forEach((drone) => {
        droneMove.x = Math.floor(Math.random() * 10) - 5;
        droneMove.y = Math.floor(Math.random() * 10) - 5;

        if (!drone) return;

        // only move drone if within defined bounds
        if (
          drone.x + droneMove.x < bounds.left ||
          drone.x + droneMove.x > bounds.right
        ) {
          droneMove.x = -droneMove.x;
        }
        if (
          drone.y + droneMove.y < bounds.bottom ||
          drone.y + droneMove.y > bounds.top
        ) {
          droneMove.y = -droneMove.y;
        }

        dispatch(
          updateWidget({
            ...drone,
            x: drone.x + droneMove.x,
            y: drone.y + droneMove.y,
          }),
        );
      });
    }, 1500);

    return () => clearInterval(timer);

    // dependencies omitted because drones array is changing too frequently
    // some warning/issue of selector returning different values despite same parameters
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);
};

export default useMoveShips;
