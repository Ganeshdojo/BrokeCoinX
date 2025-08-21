import { DollarSign } from "lucide-react";
import "./StatCard.css";

const StatCard = ({
  id,
  value,
  label,
  icon = <DollarSign size={24} />,
}) => {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span className="stat-icon">{icon}</span>
        <span className="stat-id">{id}</span>
      </div>
      <span className="stat-card-value">{value}</span>
      <span className="stat-card-label">{label}</span>
      {/* <span
        className="stat-card-change"
        style={{
          color: change < 0 ? "hsl(3, 68%, 58%)" : "hsl(150, 40%, 52%)",
          backgroundColor:
            change < 0 ? "hsla(3, 68%, 58%, 0.1)" : "hsla(150, 40%, 52%, 0.1)",
          padding: "0.3rem 0.5rem",
          borderRadius: "0.25rem",
        }}
      >
        {change > 0 ? `+${change}%` : `${change}%`}
      </span> */}
    </div>
  );
};

export default StatCard;
