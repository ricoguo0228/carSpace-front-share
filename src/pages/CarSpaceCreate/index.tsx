import { carSpaceCreateUsingPOST } from '@/services/rico/carSpaceController';
import { history } from '@@/core/history';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Upload,
} from 'antd';
import React from 'react';

const { RangePicker } = DatePicker;
/**
 * 提交
 * @param values
 */
const onFinish = async (values: any) => {
  const res = await carSpaceCreateUsingPOST(values);
  if (res.code === 0) {
    const defaultLoginSuccessMessage = '创建成功！';
    message.success(defaultLoginSuccessMessage);
    const urlParams = new URL(window.location.href).searchParams;
    history.push(urlParams.get('redirect') || '/');
    return;
  } else {
    message.error(res.message);
  }
};
const CarSpaceCreate: React.FC = () => {
  return (
    <div className="create-car-space">
      <Row gutter={24}>
        <Col span={12}>
          <Card></Card>
        </Col>
        <Col span={12}>
          <Card>
            <Form
              onFinish={(values) => {
                onFinish(values as API.CarSpaceCreateRequest);
              }}
            >
              <Form.Item
                label="车位位置"
                name="location"
                rules={[{ required: true, message: '车位位置不可以为空' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="输入价格（元/时）" name="price">
                <InputNumber />
              </Form.Item>
              <Form.Item label="可租赁时间段" name="timeSlots">
                <RangePicker showTime showNow />
              </Form.Item>
              <Form.Item label="车位图片" valuePropName="fileList" name="file">
                <Upload listType="picture-card">
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>上传</div>
                  </div>
                </Upload>
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">创建</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default CarSpaceCreate;
