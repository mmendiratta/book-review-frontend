import { Layout, Row, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { BookDisplay } from './BookDisplay';
import { CreateReview } from './CreateReview';
import { getBookBookReviews } from '../../services/accountsApi';

const { Content } = Layout;

export const Books = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const getAndSetReviews = async () => {
            const data = await getBookBookReviews();
            setReviews(data);
        }
        getAndSetReviews();
    }, []);

    if (!reviews) {
        return null;
    }

    return (
        <Layout
            style={{ padding: 24, background: "rgb(255, 253, 241)" }}
        >
            <Content style={{}}>
                <Space size="middle">
                    <Typography.Title level={1} style={{ margin: 0 }}>
                        {`${reviews.length} Reviews`}
                    </Typography.Title>
                    <CreateReview getBookBookReviews={getBookBookReviews} />
                </Space>
                <Row style={{ display: "flex", direction: "row", gap: "70px", justifyContent: "center" }}>
                    {reviews.map(review => {
                        return <BookDisplay review={review} key={review._id} />
                    })}
                </Row>
            </Content>
        </Layout>
    )
}