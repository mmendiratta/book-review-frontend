import { useState, Fragment } from "react";
import { UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Form, Input, Rate, Upload } from "antd";
import { getAccountRoles } from "../../services/accountsApi";
const {TextArea} = Input;

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

const createNewPost = async (values) => {
    const uploadData = await postToImgur(values.upload[0]);

   await fetch("https://book-review-backend-pl3j.onrender.com/api/book-reviews", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
            title: values.title,
            author: values.author,
            review: values.review,
            rating: values.rating,
            url: uploadData.data.media || ""
        }),
    });
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
    const userRoles = getAccountRoles();

    const handleModalState = () => {
        setModalOpen(preVal => !preVal)
        form.resetFields();
    }
    
 

    return (
        <Fragment>
            {userRoles && userRoles.includes("admin-role") && <Button onClick={() => { handleModalState() }}>Create Post</Button>}
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
                        createNewPost(values);
                        form.resetFields();
                      
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
                    getValueFromEvent={normFile}
                >
                    <Upload name="bookCover">
                        <Button icon={<UploadOutlined />}>Upload Book Cover</Button>
                    </Upload> 
                </Form.Item>
            </Form>
            </Modal>
        </Fragment >
    )
} 