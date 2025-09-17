const ExperienceCard = ({ company, jobTitle, date }) => {
  return (
    <li className="details-item" data-aos="fade-up">
      <div className="details-time">{date}</div>
      <div className="details-data">
        <h3>{jobTitle}</h3>
        <p>{company}</p>
      </div>
    </li>
  );
};

export default ExperienceCard;
