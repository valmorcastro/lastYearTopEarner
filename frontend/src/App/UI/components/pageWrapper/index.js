import classNames from "classnames";
import Footer from "../footer";
import Header from "../header";
import Main from "../main";

const PageWrapper = ({ children = null, pageClassName = null }) => (
  <div className={classNames("te_cmp_PageWrapper", pageClassName)}>
    <Header />
    <Main>{children}</Main>
    <Footer />
  </div>
);

export default PageWrapper;
