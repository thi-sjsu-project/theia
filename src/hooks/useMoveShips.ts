import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
  getDrones,
  getOwnship,
  updateShipPosition,
} from 'src/redux/slices/cmSlice';
import type { VehicleWidget } from 'src/types/widget';
import { SHIP_BOUNDS } from 'src/utils/constants';

const useMoveShips = () => {
  const dispatch = useAppDispatch();
  const ownship = useAppSelector(getOwnship);
  const drones = useAppSelector(getDrones);

  const updatePosition = (ship: VehicleWidget) => {
    let dx = Math.cos(ship.rotation) * ship.speed;
    let dy = Math.sin(ship.rotation) * ship.speed;
    if (ship.x <= SHIP_BOUNDS.left) dx = Math.abs(dx);
    else if (ship.x >= SHIP_BOUNDS.right) dx = -Math.abs(dx);
    if (ship.y <= SHIP_BOUNDS.top) dy = -Math.abs(dy);
    else if (ship.y >= SHIP_BOUNDS.bottom) dy = Math.abs(dy);
    const newRotation = Math.atan2(dy, dx);

    dispatch(
      updateShipPosition(ship.id, ship.x + dx, ship.y - dy, newRotation),
    );
  };

  useEffect(() => {
    console.log('drones', drones);
  }, [drones.length]);

  useEffect(() => {
    if (!ownship || ownship.type !== 'vehicle') return;

    const timer = setInterval(() => {
      updatePosition(ownship);
    }, 100);

    return () => clearInterval(timer);
  }, [ownship, dispatch]);

  useEffect(() => {
    if (!drones || drones.some((widget) => widget.type !== 'vehicle')) return;

    // random drone movement every 100ms
    const timer = setInterval(() => {
      drones.forEach((drone) => {
        updatePosition(drone as VehicleWidget);
      });
    }, 100);

    return () => clearInterval(timer);

    // dependencies omitted because drones array is changing too frequently
    // some warning/issue of selector returning different values despite same parameters
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [drones[0], drones.length]);
};

export default useMoveShips;
