import { DetailsCardProps } from "@/app/types/types";

const DetailsCard = ({ id, data, time, title }: DetailsCardProps) => {
  return (
    <li key={id} className="details-item" data-aos="fade-up">
      <div className="details-time">{time}</div>
      <div className="details-data">
        <h3>{title}</h3>
        <p>{data}</p>
      </div>
    </li>
  );
};

export default DetailsCard;