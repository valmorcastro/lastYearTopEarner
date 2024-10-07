import classNames from "classnames";
import Footer from "../footer";
import Header from "../header";
import { isMobile } from "react-device-detect";
import Main from "../main";
import NotificationsContainer from "../notificationsContainer";

const PageWrapper = ({ children = null, pageClassName = null }) => (
  <>
    <div
      className={classNames(
        "te_cmp_PageWrapper",
        pageClassName,
        isMobile ? "te_is_mobile" : "te_is_not_mobile"
      )}
    >
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
    <NotificationsContainer />
  </>
);

export default PageWrapper;
