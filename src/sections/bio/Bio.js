import Avatar from "antd/es/avatar/avatar"
import { Content } from "antd/es/layout/layout"
import { Layout, Space } from 'antd';
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import bioPicture from "./prachi-bio-image.jpg";
import bookGlass from "./book-review-gif.gif";
import { isMobile } from 'react-device-detect';

export const Bio = () => {
    return (
        <Layout
            style={{
                padding: 24,
                textAlign: 'center',
                background: "rgb(60, 47, 106)",
                maxWidth: !isMobile ? "400px": "none",  
                position: !isMobile ? "-webkit-sticky" : "none", /* for Safari */
                // eslint-disable-next-line no-dupe-keys
                position: !isMobile ? "sticky": "none",
                top: !isMobile ? "0" : "none",
                alignSelf: !isMobile ? "flex-start" : "none",
                minHeight: "100vh"
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
                <Space style={{paddingTop: "24px", paddingBottom: "24px"}}>
                    <img src={bookGlass} alt="" width="250" height="250" />
                </Space>
                <Paragraph style={{ color: "rgb(255, 253, 241)"}}>
                    P.S. the books might take an extra second to load, so please be patient :)
                </Paragraph>
            </Content>
        </Layout>
    );
}