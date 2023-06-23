import {LogoutOutlined, UserOutlined} from '@ant-design/icons';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {history, useModel} from '@umijs/max';
import {Select, Spin} from 'antd';
import {stringify} from 'querystring';
import type {MenuInfo} from 'rc-menu/lib/interface';
import React, {useCallback, useState} from 'react';
import {flushSync} from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import {userLogoutUsingPOST} from "@/services/rico/userController";
import Search from "antd/es/input/Search";

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState || {};
  return <span className="anticon">{currentUser?.nickName}</span>;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({children}) => {
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    await userLogoutUsingPOST();
    const {search, pathname} = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };
  const actionClassName = useEmotionCss(({token}) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });
  const {initialState, setInitialState} = useModel('@@initialState');
const {model,setModel} = useState<string>('create');
  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const {key} = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({...s, currentUser: undefined}));
        });
        loginOut();
        return;
      }
      if (key === 'center') {
        history.push('/user/center');
      }
    },
    [setInitialState],
  );

  const loading = (
    <span className={actionClassName}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const {currentUser} = initialState;

  if (!currentUser || !currentUser.nickName) {
    return loading;
  }

  const menuItems = [
    {
      key: 'center',
      icon: <UserOutlined/>,
      label: '个人中心',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined/>,
      label: '退出登录',
    },

  ];
const changeModel = (value:any)=>{
  setModel(value);
}
  return (
    <>
      <Select
        defaultValue="创建车位"
        size="middle"
        style={{width: 120}}
        onChange={(value)=>changeModel(value)}
        options={[
          {value: 'create', label: '创建车位'},
          {value: 'search', disabled: true, label: '搜索内容'},
        ]}
      />
      <Search placeholder="让AI帮你完成"
              enterButton="Search"
              size="middle"
      />
      <div style={{marginRight: 24}}/>
      <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: onMenuClick,
          items: menuItems,
        }}
      >
        {children}
      </HeaderDropdown>
    </>
  );
};
