

import { Layout, Space, Rate, Modal, Button } from "antd"
import { useBookSelectionContext } from "../../BookSelectionContext";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { EditFilled } from '@ant-design/icons';
import { getAccountRoles } from "../../services/accountsApi";
import { EditReview } from "../books/EditReview";
const { Content } = Layout;

export const SelectedReviewSectionMobile = () => {
    const { selectedBookReview, setSelectedBookReview, setEditBook }= useBookSelectionContext();
    const userRoles = getAccountRoles();
    
    if (!selectedBookReview) {
        return;
    }

    return (    
    <Modal
        centered
        open={selectedBookReview !== undefined || selectedBookReview !== null}
        onCancel={() => setSelectedBookReview(null)}
        footer={false}
        className="newStyle"

      >
        <Layout
          style={{
            textAlign: 'center',
            borderRadius: "8px",
          }}
        >
            
          <Content style={{ backgroundColor: "rgb(229, 105, 82)",  borderRadius: "8px",  }}>
            <Space direction="horizontal">
                <Title style={{color: "rgb(255, 253, 241)"}}>
                        {selectedBookReview.review.title} 
                </Title>

            </Space>
            {userRoles && userRoles.includes("admin-role") && 
            <Button 
                danger shape="circle" 
                icon={<EditFilled />} 
                onClick={() => setEditBook(prev => !prev)}
            />
        }
            <div>
                <img src={selectedBookReview.review.url} alt="" width="200" height="300"/>
            </div>
            <Paragraph style={{ color: "rgb(255, 253, 241)", padding: "8px"}}>
                {selectedBookReview.review.review}
            </Paragraph>
            <Rate defaultValue={selectedBookReview.review.rating} disabled/>
          </Content>
          <EditReview selectedBook={selectedBookReview} />
        </Layout>
        </Modal>
    )
}