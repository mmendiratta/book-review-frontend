import { Fragment, useState } from "react";
import { Modal, Form, Input, Rate,  Upload, Button } from "antd";
import { useBookSelectionContext } from "../../BookSelectionContext";
import { getBookBookReviews } from "../../services/accountsApi";
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const THUMBSNAP_POST_URL = "https://thumbsnap.com/api";


const postToImgur = async (file) => {
    console.log(file.originFileObj);
    const formData = new FormData();

    formData.append('media', file.originFileObj);
    formData.append('key', "00002954e39a965411afb3077e9f2ad5");
    const response = await fetch(`${THUMBSNAP_POST_URL}/upload`, {
        method: "POST",
        async: true,
        crossDomain: true,
        body: formData
    });
    return response.json();
}
    

const editBookReview = async (values, url, id, newImg) => {
    const uploadData = newImg ? await postToImgur(values.upload[0]) : url;

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
            url: newImg ? uploadData.data.media || "" : url,
        }),
    });
}

export const EditReview = ({selectedBook}) => {
    const { editBook, setEditBook } = useBookSelectionContext();
    const [form] = Form.useForm();
    const [newImg, setNewImg] = useState(false);

    const handleModalState = () => {
        form.resetFields();
        setEditBook(false);
    }

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

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
                            editBookReview(values, selectedBook?.review.url, selectedBook?.review._id, newImg);
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
                    <Form.Item
                    name="upload"
                    getValueFromEvent={normFile}
        
                >
                    <Upload name="bookCover">
                        <Button icon={<UploadOutlined />} onClick={() => setNewImg(true)}>Edit Book Cover</Button>
                    </Upload> 
                </Form.Item>
                </Form>
            </Modal>
        </Fragment >
    )
} 