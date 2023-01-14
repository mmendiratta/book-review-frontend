import { Layout, Row, Space, Typography  } from 'antd';
import { useEffect, useState } from 'react';
import { BookDisplay } from './BookDisplay';
import { CreateReview } from './CreateReview';
const { Content } = Layout;

export const Books = () => {
    const [reviews, setReviews] = useState([]);
    const getBookBookReviews = () => {
        fetch("https://book-review-backend-pl3j.onrender.com/api/book-reviews")
            .then((reviewsResponse) => {
                reviewsResponse.json().then((data) => {
                    setReviews(data)
                })
            });
    }

    useEffect(() => {
        getBookBookReviews();
    }, []);

   return (
    <Layout
        style={{ padding: 24, background: "rgb(255, 253, 241)" }}
    >
        <Content>
            <Space size="middle">
                <Typography.Title level={1} style={{ margin: 0 }}>
                    {`${reviews.length} Reviews`}
                </Typography.Title>       
                <CreateReview />
            </Space>
            <Row gutter={16}>
                {reviews.map(review => {
                    return <BookDisplay review={review} key={review._id}/>
                })}            
            </Row>
        </Content>
    </Layout>
   )
}