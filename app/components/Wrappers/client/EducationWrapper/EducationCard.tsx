const EducationCard = ({ time, place, name }) => {
  return (
    <li className="details-item" data-aos="fade-up">
      <div className="details-time">{time}</div>
      <div className="details-data">
        <h3>{name}</h3>
        <p>{place}</p>
      </div>
    </li>
  );
};

export default EducationCard;
