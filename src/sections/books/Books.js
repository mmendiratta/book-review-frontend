import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import { CreateReview } from './CreateReview';
const { Content } = Layout;

export const Books = () => {
    const [reviews, setReviews] = useState([]);
    // api call to get book details
    // api call when book details arrive to get the image
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

    console.log(reviews)

   return (
    <Layout
        style={{ padding: 24, background: "rgb(255, 253, 241)" }}
    >
        <Content>
            <div>
                {`${reviews.length} Reviews`}
                <CreateReview />
            </div>
            {reviews.map(review => {
                return <div>review</div>
            })}
        </Content>
    </Layout>
   )
}