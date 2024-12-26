
const DetailsCard = ({ data, time, title }: DetailsCardProps) => {
  return (
    <li className="details-item" data-aos="fade-up">
      <div className="details-time">{time}</div>
      <div className="details-data">
        <h3>{title}</h3>
        <p>{data}</p>
      </div>
    </li>
  );
};

export default DetailsCard;
