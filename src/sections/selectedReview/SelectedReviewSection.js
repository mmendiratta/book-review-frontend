import { Layout, Button, Space, Rate } from "antd"
import { useBookSelectionContext } from "../../BookSelectionContext";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { CloseCircleOutlined } from '@ant-design/icons';
const { Content } = Layout;

export const SelectedReviewSection = () => {
    const { selectedBookReview, setSelectedBookReview }= useBookSelectionContext()
    
    if (!selectedBookReview) {
        return (
            <Layout
            style={{
              padding: 24,
              textAlign: 'center',
              backgroundColor: "rgb(229, 105, 82)",
              maxWidth: "400px",
            }}
          >
               </Layout>
        )
    }
    return (
        <Layout
          style={{
            padding: 24,
            textAlign: 'center',
            backgroundColor: "rgb(229, 105, 82)",
            maxWidth: "400px",
          }}
        >
          <Content style={{ marginTop: 0 }}>
            <Space direction="horizontal">
                <Title style={{color: "rgb(255, 253, 241)"}}>
                        {selectedBookReview.review.title} 
                </Title>
                <Space style={{paddingTop: 24}}>
                    <Button 
                        danger shape="circle" 
                        icon={<CloseCircleOutlined />} 
                        onClick={() => setSelectedBookReview(null)}
                    />
                </Space>
            </Space>
            <img src={selectedBookReview.review.url} alt="" width="200" height="300"/>
            <Paragraph style={{ color: "rgb(255, 253, 241)"}}>
                {selectedBookReview.review.review}
            </Paragraph>
            <Rate defaultValue={selectedBookReview.review.rating} disabled/>
          </Content>
        </Layout>
    )
}