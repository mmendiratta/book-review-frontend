import React from 'react';
import { Layout } from 'antd';
import { Bio } from './sections/bio/Bio';
import { Books } from './sections/books/Books';
const { Content } = Layout;

const App = () => {
  return (
    <Layout hasSider>
      <Bio />
      <Books />
      <Layout
        style={{
          padding: 24,
          textAlign: 'center',
          backgroundColor: "rgb(229, 105, 82)",
          maxWidth: "300px"
        }}
      >
        <Content>

        </Content>
      </Layout>
    </Layout >
  );
};
export default App;