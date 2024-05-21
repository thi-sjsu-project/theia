import airfieldKnots from "../assets/airfield_knots.png";
import altmeter from "../assets/altmeter.png";
import planeDirection from "../assets/plane_direction.png";
import target from "../assets/target.png";
import turnCoordinator from "../assets/turn_coordinator.png";
import verticalSpeed from "../assets/vertical_speed.png";






const RightScreen = () => {
  return (
<div className="flex h-screen items-center justify-start" style={{ backgroundColor: '#1E1E1E' }}>
  <div className="grid grid-cols-2 gap-4">
       <img src={airfieldKnots} alt="Airfield Knots" />
       <img src={target} alt="Target" />
        <img src={turnCoordinator} alt="Turn Coordinator" />
        <img src={altmeter} alt="Altmeter" />
        <img src={planeDirection} alt="Plane Direction" />
        <img src={verticalSpeed} alt="Vertical Speed" />
  </div>
</div>
  );
};

export default RightScreen;
