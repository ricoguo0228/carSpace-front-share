import {LogoutOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {history, useModel} from '@umijs/max';
import {message, Modal, Select, Spin} from 'antd';
import {stringify} from 'querystring';
import type {MenuInfo} from 'rc-menu/lib/interface';
import React, {useCallback, useState} from 'react';
import {flushSync} from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import {userLogoutUsingPOST} from "@/services/rico/userController";
import Search from "antd/es/input/Search";
import {AiCreateCarSpaceSureUsingPOST, AiCreateCarSpaceUsingPOST} from "@/services/rico/aiController";

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState || {};
  return <span className="anticon">{currentUser?.nickName}</span>;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children }) => {
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
  const [model, setModel] = useState('create');
  const [sureData, setSureData] = useState<API.AiResponse>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>();

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
    ...(menu
      ? [
        {
          key: 'center',
          icon: <UserOutlined />,
          label: '个人中心',
        },
        {
          key: 'settings',
          icon: <SettingOutlined />,
          label: '个人设置',
        },
        {
          type: 'divider' as const,
        },
      ]
      : []),
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
  const onfinish = async (value: any) => {
    setIsLoading(true);
    if (!value) {
      message.error('您还没有输入内容呢');
      return;
    }
    if (model === 'create') {
      const res = await AiCreateCarSpaceUsingPOST({aiStr: value});
      if (res.code === 0 && res.data) {
        setSureData(res.data);
        setIsModalOpen(true)
      }else{
        message.error(res.description);
      }
    }
    setIsLoading(false);
  }
  return (
    <>
      <Modal
        open={isModalOpen}
        onOk={async () => {
          const res=await AiCreateCarSpaceSureUsingPOST({
            location: sureData?.location,
            price:sureData?.price
          })
          if(model ==='create'){
            if(res.code === 0){
              message.success('已经为您创建车位，您可以前往我的车位查看');
              setIsModalOpen(false);
            }else{
              message.error('创建车位失败，'+res.description);
            }
          }
          if(model ==='search'){
            if(res.code === 0){
              message.success('车位已经展示出来啦');
              setIsModalOpen(false);
            }else{
              message.error('搜索车位失败，'+res.description);
            }
          }

        }}
        onCancel={()=>setIsModalOpen(false)}
      >
        {sureData?.str}
      </Modal>
      <Select
        defaultValue="创建车位"
        size="middle"
        style={{width: 120}}
        onChange={(value) => setModel(value)}
        options={[
          {value: 'create', label: '创建车位'},
          {value: 'search', disabled: true, label: '搜索内容'},
        ]}
      />
      <Search placeholder="一句话，包括位置和价格"
              enterButton="AI"
              size="middle"
              onSearch={(value) => onfinish(value)}
              loading={isLoading}
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
