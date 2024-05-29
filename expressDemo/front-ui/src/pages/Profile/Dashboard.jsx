import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Profile } from "./Profile";
import { Orders } from "./Orders";
import { Review } from "./Review";
import { Password } from "./Password";

export const Dashboard = () => {
  const user = useSelector((state) => state.user.value);
  return (
    <div className="col-12">
      <div className="row">
        <div className="col-12 mt-3 text-center text-uppercase">
          <h2>{user.name}'s Profile</h2>
        </div>
      </div>

      <main className="row">
        <div className="col-12 bg-white py-3 mb-3">
          <Row>
            <Col xl={6} lg={8} md={10} className="mx-auto">
              <Tabs
                defaultActiveKey="orders"
                id="uncontrolled-tab-example"
                className="mb-3"
                justify
              >
                <Tab
                  eventKey="orders"
                  title={
                    <>
                      <i className="fa-solid fa-gifts me-2"></i>Orders
                    </>
                  }
                >
                  <Orders />
                </Tab>
                <Tab
                  eventKey="reviews"
                  title={
                    <>
                      <i className="fa-solid fa-comments me-2"></i>Reviews
                    </>
                  }
                >
                  <Review />
                </Tab>
                <Tab
                  eventKey="profile"
                  title={
                    <>
                      <i className="fa-solid fa-user-edit me-2"></i>Edit Profile
                    </>
                  }
                >
                  <Profile />
                </Tab>
                <Tab
                  eventKey="password"
                  title={
                    <>
                      <i className="fa-solid fa-key me-2"></i>Change Password
                    </>
                  }
                >
                  <Password />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </div>
      </main>
    </div>
  );
};
