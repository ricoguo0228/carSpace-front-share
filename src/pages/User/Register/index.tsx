import Footer from '@/components/Footer';

import {
  getCurrentUserUsingPOST,
  userLoginUsingPOST,
  userRegisterUsingPOST
} from '@/services/rico/userController';
import {Link} from '@@/exports';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {LoginForm, ProFormText} from '@ant-design/pro-components';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {Helmet, history, useModel} from '@umijs/max';
import {message, Tabs} from 'antd';
import React, {useState} from 'react';
import {flushSync} from 'react-dom';
import Settings from '../../../../config/defaultSettings';
import {sleep} from "@antfu/utils";

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const {setInitialState} = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });
  const fetchUserInfo = async () => {
    const userInfo = await getCurrentUserUsingPOST();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo.data,
        }));
      });
    }
  };
  const handleSubmit = async (values: API.UserRegisterRequest) => {
    // 注册
    const RegisterRes = await userRegisterUsingPOST(values);
    if (RegisterRes.code === 0) {
      message.success('注册成功！即将为您自动登录');
      const LoginRes = await userLoginUsingPOST(
        {
          userAccount:values.userAccount,
          userPassword:values.userPassword
        }
      );
      if(LoginRes.code === 0){
        await fetchUserInfo();
        await sleep(1000);
        history.push('/');
      } else{
        message.error('自动登录失败，请重新手动登录');
        await sleep(1000);
        history.push('/user/login');
      }
    } else {
      message.error(RegisterRes.description);
    }
  };
  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'注册'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg"/>}
          title="车享"
          subTitle={'车享 开启您的新生活'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '注册',
              },
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                placeholder={'请输入用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText
                name="userPhone"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                placeholder={'请输入手机号'}
                rules={[
                  {
                    required: true,
                    message: '手机号不可以为空',
                  },
                  {
                    len: 11,
                    message: '请输入正确的手机号',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码不可以为空',
                  },
                  {
                    min: 8,
                    message: '密码至少是8位！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userCheckPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码不可以为空',
                  },
                  {
                    min: 8,
                    message: '确认密码至少是8位！',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Link
              style={{
                float: 'right',
              }}
              to={'/user/login'}
            >
              已经有账号了？登录
            </Link>
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};
export default Login;
