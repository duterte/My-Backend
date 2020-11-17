import { FloorArea } from '../font-icons';
import { FaBed, FaBath } from 'react-icons/fa';
import { GiHomeGarage } from 'react-icons/gi';
import './snippets.css';

export function InfoSnippets() {
  return (
    <div className="info-snippets">
      <div className="floorarea">
        <FloorArea className="icon" />
        <div className="context">139 sqm</div>
      </div>
      <div className="bathroom">
        <FaBath className="icon" />
        <div className="context">2 Bathroom</div>
      </div>
      <div className="bedroom">
        <FaBed className="icon" />
        <div className="context">3 Beds</div>
      </div>
      <div className="garage">
        <GiHomeGarage className="icon" />
        <div className="context">1 Garage</div>
      </div>
    </div>
  );
}
