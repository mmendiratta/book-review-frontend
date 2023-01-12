import { useState, Fragment } from "react";
import { UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Form, Input, Rate, Upload } from "antd";
const {TextArea} = Input;

const IMGUR_POST_URL = "https://api.imgur.com/3";

const postToImgur = async (file) => {
    console.log(file);
    const formData = new FormData();

    formData.append('image', file.thumbUrl);
    const response = await fetch(`${IMGUR_POST_URL}/upload`, {
        method: "POST",
        async: true,
        crossDomain: true,
        headers: {
            "Authorization": "Client-ID 043e2c759f7929c",
        },
        body: formData,
    });
    return response.json();
}

const createNewPost = async (values) => {
    const imgurData = await postToImgur(values.upload[0]);

//    await fetch("https://book-review-backend-pl3j.onrender.com/api/book-reviews", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json; charset=utf-8',
//         },
//         body: JSON.stringify({
//             title: values.title,
//             author: values.author,
//             review: values.review,
//             rating: values.rating,
//             url: imgurData.data.id || ""
//         }),
//     });
}

const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
};

export const CreateReview = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [form] = Form.useForm();

    const handleModalState = () => {
        setModalOpen(preVal => !preVal)
        form.resetFields();
    }
 

    return (
        <Fragment>
            <Button onClick={() => { handleModalState() }}>Create Post</Button>
            <Modal
                open={modalOpen}
                title="Create a Book Review"
                okText="Create"
                cancelText="Cancel"
                onCancel={handleModalState}
                onOk={() => {
                    form
                      .validateFields()
                      .then((values) => {
                        form.resetFields();
                        createNewPost(values);
                        handleModalState();
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
                >
                    <Input placeholder="Title"/>
                </Form.Item>
                <Form.Item
                    name="author"
                    rules={[
                        {
                        required: true,
                        message: 'Please input the author!',
                        },
                    ]}
                >
                    <Input placeholder="Author"/>
                </Form.Item>
                <Form.Item  
                    name="review"
                    rules={[
                        {
                        required: true,
                        message: 'Please add your review!',
                        },
                    ]}
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
                >
                    <Rate initialValue={0}/>
                </Form.Item> 
                <Form.Item
                    name="upload"
                    valuePropName="file"
                    getValueFromEvent={normFile}
                >
                    <Upload name="bookCover" listType="picture" >
                        <Button icon={<UploadOutlined />}>Upload Book Cover</Button>
                    </Upload>
                </Form.Item>
            </Form>
            </Modal>
        </Fragment >
    )
} 