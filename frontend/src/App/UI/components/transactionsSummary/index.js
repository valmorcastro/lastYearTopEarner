import { LuCalendarDays, LuCalendarRange } from "react-icons/lu";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { FaClipboardList } from "react-icons/fa";
import { formatCurrency } from "../../../utils";
import Row from "react-bootstrap/Row";
import SummaryCard from "../summaryCard";
import { TbAlpha } from "react-icons/tb";
import { transactionsSelector } from "../../../store/selectors";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const TransactionsSummary = () => {
  const transactions = useSelector(transactionsSelector);

  const summaryInfo = useMemo(() => {
    const {
      alphaCount = 0,
      alphaValue = 0,
      totalCount = 0,
      totalValue = 0,
      lastYearAlphaValue = 0,
      lastYearAlphaCount = 0,
      lastYearTotalValue = 0,
      lastYearTotalCount = 0,
    } = transactions;

    return {
      total: {
        id: "everytimeTotal",
        extraClassnames: "bg-opacity-75",
        icon: (
          <div className="icon">
            <LuCalendarDays size={30} />
          </div>
        ),
        variant: "bg-success",
        title: formatCurrency(totalValue),
        text: `Everytime Total Transactions (${totalCount})`,
      },
      alphaTotal: {
        id: "everytimeAlphaTotal",
        icon: (
          <div className="icon">
            <TbAlpha size={30} />
            <LuCalendarDays size={30} />
          </div>
        ),
        title: formatCurrency(alphaValue),
        text: `Everytime Alpha Transactions (${alphaCount})`,
      },
      totalPastYear: {
        id: "lastYearTotal",
        icon: (
          <div className="icon">
            <LuCalendarRange size={30} />
          </div>
        ),
        title: formatCurrency(lastYearTotalValue),
        text: `Last Year Total Transactions (${lastYearTotalCount})`,
      },
      alphaTotalPastYear: {
        id: "lastYearAlphaTotal",
        icon: (
          <div className="icon">
            <TbAlpha size={30} />
            <LuCalendarRange size={30} />
          </div>
        ),
        title: formatCurrency(lastYearAlphaValue),
        text: `Last Year Alpha Transactions (${lastYearAlphaCount})`,
      },
    };
  }, [transactions]);

  const renderSummaryInfo = () =>
    Object.values(summaryInfo).map((cardInfo) => (
      <Col key={cardInfo.id} xs={12} sm={3} className="my-1 my-sm-0">
        <SummaryCard {...cardInfo} />
      </Col>
    ));

  return (
    <Container fluid className="te_cmp_TransactionsSummary">
      <Row className="mt-3">
        <Col>
          <h3 className="d-flex align-items-center">
            <FaClipboardList />
            &nbsp;Summary
          </h3>
        </Col>
      </Row>
      <Row className="mt-3">{renderSummaryInfo()}</Row>
    </Container>
  );
};

export default TransactionsSummary;
