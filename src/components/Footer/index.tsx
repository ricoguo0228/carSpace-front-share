import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
const Footer: React.FC = () => {
  const defaultMessage = '要不要访问我的GitHub？';
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${defaultMessage}`}
      links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/ricoguo0228',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
