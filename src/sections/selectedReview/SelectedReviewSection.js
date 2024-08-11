import { Layout, Button, Space, Rate } from "antd"
import { useBookSelectionContext } from "../../BookSelectionContext";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { CloseCircleOutlined, EditFilled } from '@ant-design/icons';
import { isMobile } from 'react-device-detect';
import { EditReview } from "../books/EditReview";
import { getAccountRoles } from "../../services/accountsApi";
const { Content } = Layout;

export const SelectedReviewSection = () => {
  const {
    selectedBookReview,
    setSelectedBookReview,
    setEditBook
  } = useBookSelectionContext();
  const userRoles = getAccountRoles();

  if (!selectedBookReview) {
    return;
  }

  return (

    <Layout
      style={{
        padding: 24,
        textAlign: 'center',
        backgroundColor: "rgb(229, 105, 82)",
        maxWidth: "400px",
        transition: "transform 0.3s ease-out",
        position: !isMobile ? "-webkit-sticky" : "none", /* for Safari */
        // eslint-disable-next-line no-dupe-keys
        position: !isMobile ? "sticky" : "none",
        top: !isMobile ? "0" : "none",
        alignSelf: !isMobile ? "flex-start" : "none",
        minHeight: "100vh"
      }}
    >
      <Content style={{
        marginTop: 0,
      }}>
        <Space direction="horizontal">
          <Title style={{ color: "rgb(255, 253, 241)" }}>
            {selectedBookReview.review.title}
          </Title>
          <Space style={{ paddingTop: 24 }}>
            <Button
              danger shape="circle"
              icon={<CloseCircleOutlined />}
              onClick={() => setSelectedBookReview(undefined)}
            />
            {userRoles && userRoles.includes("admin-role") &&
              <Button
                danger shape="e"
                icon={<EditFilled />}
                onClick={() => setEditBook(prev => !prev)}
              />
            }
          </Space>
        </Space>
        <img
          src={selectedBookReview.review.url}
          alt=""
          width="200"
          height="300"
          style={{ boxShadow: "5px 5px 5px rgb(60, 47, 106)" }}
        />
        <Paragraph style={{ color: "rgb(255, 253, 241)" }}>
          {selectedBookReview.review.review}
        </Paragraph>
        <Rate defaultValue={selectedBookReview.review.rating} disabled />
      </Content>
      <EditReview selectedBook={selectedBookReview} />
    </Layout>

  )
}