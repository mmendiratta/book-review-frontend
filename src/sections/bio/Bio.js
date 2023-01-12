import Avatar from "antd/es/avatar/avatar"
import { Content } from "antd/es/layout/layout"
import { Layout } from 'antd';
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import bioPicture from "./prachi-bio-image.jpg";
import bookGlass from "./book-review-gif.gif";

export const Bio = () => {
    return (
        <Layout
            style={{
                padding: 24,
                textAlign: 'center',
                background: "rgb(60, 47, 106)",
                maxWidth: "400px",
                height: "100%"
            }}
        >
            <Content>
                <Avatar src={bioPicture} size={200} />
                <Title style={{color: "rgb(255, 253, 241)"}}>Prachi Raina</Title>
                <Paragraph style={{ color: "rgb(255, 253, 241)"}}>
                    My name is Prachi Raina! I am an avid reader of all genres, but my favorites include fiction based
                    thrillers, murder mysteries, and business-related non-fiction. My favorite authors are Lucy Foley and 
                    Malcolm Gladwell :)
                </Paragraph>
                <img src={bookGlass} alt="" width="200" height="200"/>
            </Content>
        </Layout>
    );
}