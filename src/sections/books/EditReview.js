import { Fragment } from "react";
import { Modal, Form, Input, Rate } from "antd";
import { useBookSelectionContext } from "../../BookSelectionContext";
import { getBookBookReviews } from "../../services/accountsApi";
const { TextArea } = Input;

const editBookReview = async (values, url, id) => {
    // const uploadData = await postToImgur(values.upload[0]);

    await fetch(`https://book-review-backend-pl3j.onrender.com/api/book-reviews/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
            title: values.title,
            author: values.author,
            review: values.review,
            rating: values.rating,
            url: url,
        }),
    });
}

export const EditReview = ({selectedBook}) => {
    const { editBook, setEditBook } = useBookSelectionContext();
    const [form] = Form.useForm();

    const handleModalState = () => {
        form.resetFields();
        setEditBook(false);
    }

    console.log(selectedBook);

    return (
        <Fragment>
            <Modal
                open={editBook}
                title="Edit a Book Review"
                okText="Edit"
                cancelText="Cancel"
                onCancel={handleModalState}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            editBookReview(values, selectedBook?.review.url, selectedBook?.review._id);
                            form.resetFields();

                            handleModalState();
                            getBookBookReviews();
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                >
                    <Form.Item
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the title of book!',
                            },
                        ]}
                        initialValue={selectedBook?.review.title}
                    >
                        <Input placeholder="Title" />
                    </Form.Item>
                    <Form.Item
                        name="author"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the author!',
                            },
                        ]}
                        initialValue={selectedBook?.review.author}
                    >
                        <Input placeholder="Author" />
                    </Form.Item>
                    <Form.Item
                        name="review"
                        rules={[
                            {
                                required: true,
                                message: 'Please add your review!',
                            },
                        ]}
                        initialValue={selectedBook?.review.review}
                    >
                        <TextArea
                            showCount placeholder="Review"
                            style={{ height: 120 }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="rating"
                        rules={[
                            {
                                required: true,
                                message: 'Please add your rating!',
                            },
                        ]}
                        initialValue={selectedBook?.review.rating}
                    >
                        <Rate initialValue={0} />
                    </Form.Item>
                    {/* <Form.Item
                    name="upload"
                    getValueFromEvent={normFile}
        
                >
                    <Upload name="bookCover">
                        <Button icon={<UploadOutlined />}>Upload Book Cover</Button>
                    </Upload> 
                </Form.Item> */}
                </Form>
            </Modal>
        </Fragment >
    )
} 