import {carSpaceCreateUsingPOST} from '@/services/rico/carSpaceController';
import {history} from '@@/core/history';
import {PlusOutlined} from '@ant-design/icons';
import {Button, Card, Col, DatePicker, Form, Input, InputNumber, message, Row, Upload,} from 'antd';
import React, {useState} from 'react';
const {RangePicker} = DatePicker;
const CarSpaceCreate: React.FC = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const onFinish = async (values: any) => {
    if (submitting) {
      message.error("正在创建中，请勿重复创建");
      return;
    }
    setSubmitting(true);
    const res = await carSpaceCreateUsingPOST(values);
    if (res.code === 0) {
      //todo:设计成功页面
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
      return;
    } else {
      message.error(res.message);
    }
    setSubmitting(false);
  };
  return (
    <div className="create-car-space">
      <Button type="ghost" disabled style={{fontSize:"40px"}}>
        创建车位
      </Button>
      <div style={{marginBottom:24}} />
      <Row gutter={24}>
        <Col span={16}>
          <Card></Card>
        </Col>
        <Col span={8}>
          <Card>
            <Form
              onFinish={(values) => {
                onFinish(values as API.CarSpaceCreateRequest);
              }}
            >
              <Form.Item
                label="车位位置"
                name="location"
                rules={[{required: true, message: '车位位置不可以为空'}]}
              >
                <Input/>
              </Form.Item>
              <Form.Item label="输入价格（元/时）" name="price">
                <InputNumber/>
              </Form.Item>
              <Form.Item label="可租赁时间段" name="timeSlots">
                <RangePicker showTime showNow/>
              </Form.Item>
              <Form.Item label="车位图片" valuePropName="fileList" name="file">
                <Upload listType="picture-card"> disabled={true}
                  <div>
                    <PlusOutlined/>
                    <div style={{marginTop: 8}}>上传</div>
                  </div>
                </Upload>
              </Form.Item>
              <Form.Item>
                <Button disabled={submitting} htmlType="submit">创建</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default CarSpaceCreate;
