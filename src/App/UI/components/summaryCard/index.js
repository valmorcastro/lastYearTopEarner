import classNames from "classnames";
import Card from "react-bootstrap/Card";

const SummaryCard = ({
  extraClassnames = null,
  icon = null,
  variant = "bg-secondary",
  title = "",
  text = "",
}) => {
  const textClass = ["bg-warning", "bg-light", "bg-white"].includes(variant)
    ? "text-black"
    : "text-white";

  return (
    <Card className={classNames("h-100 te_cmp_SummaryCard", variant, textClass, extraClassnames)}>
      <Card.Body>
        {icon}
        <Card.Text>
          <small>{text}</small>
        </Card.Text>
        <Card.Title as={"h4"}>{title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default SummaryCard;
