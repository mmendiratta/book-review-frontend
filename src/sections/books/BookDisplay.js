import { Space, Typography } from "antd"
import { useBookSelectionContext } from "../../BookSelectionContext"

export const BookDisplay = (review) => {
    const { setSelectedBookReview } = useBookSelectionContext();
    return (
        <Space 
            direction="vertical"
            align="center"
            style={{padding: "12px"}}
            onClick={() => setSelectedBookReview(review)}
        >
            <img src={review.review.url} alt="" width="200" height="300"/>
            <Typography.Title level={4} style={{ margin: 0 }}>
                {review.review.title}
            </Typography.Title>
        </Space>
        
    )
}