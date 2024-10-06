import classNames from "classnames";
import Card from "react-bootstrap/Card";

const SummaryCard = ({
  extraClassnames = null,
  variant = "bg-secondary",
  title = "",
  text = "",
}) => {
  const textClass = ["bg-warning", "bg-light", "bg-white"].includes(variant)
    ? "text-black"
    : "text-white";

  return (
    <Card className={classNames("h-100", variant, textClass, extraClassnames)}>
      <Card.Body>
        <Card.Text>
          <small>{text}</small>
        </Card.Text>
        <Card.Title as={"h4"}>{title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default SummaryCard;
