import {history, useLocation} from 'umi';
import React, {useEffect, useState} from 'react';
import {Button, Card, Col, DatePicker, Descriptions, Input, List, message, Modal, notification, Row, Space} from "antd";
import {CarOutlined, PayCircleOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {
  addReservationUsingPOST,
  currentReservationsInReserveUsingPOST,
  deleteReservationUsingPOST
} from "@/services/rico/reservationController";
import {getCurrentCarSpaceUsingPOST} from "@/services/rico/carSpaceController";
import Context from '@ant-design/icons/lib/components/Context';
import {sleep} from "@antfu/utils";

const CarSpaceReserve: React.FC = () => {
  const state: any = useLocation().state;
  const carId  = state.carId;
  const [currentCarSpace, setCurrentCarSpace] = useState<API.ComplCarspace>();
  const [Reservations, setReservations] = useState<API.Reservation[]>();
  const [loading, setLoading] = useState<boolean>();
  const [showMessage, setshowMessage] = useState<boolean>(false);
  const [timeSLots, setTimeSLots] = useState<[]>();
  const [api, contextHolder] = notification.useNotification();
  const btn = (
    <Space>
      <Button type="link" size="small" onClick={() => {
        history.push('/carSpace/myReserve');
      }}>
        前往我的预约
      </Button>
      <Button type="primary" size="small" onClick={() => api.destroy()}>
        关闭
      </Button>
    </Space>
  );
  const loadData = async () => {
    setLoading(true);
    await sleep(500);
    const ComplCarSpaceResponse = await getCurrentCarSpaceUsingPOST({id: carId});
    if(ComplCarSpaceResponse.data){
      setCurrentCarSpace(ComplCarSpaceResponse.data);
    }
    else{
      message.error("获取车位信息失败");
    }
    const Reservetions = await currentReservationsInReserveUsingPOST({id: carId});
    if(Reservetions.data){
      setReservations(Reservetions.data);
    }
    else{
      message.error("获取车位预约信息失败");
    }
    setLoading(false);
  }

  const handleOk = async () => {
    const res = await addReservationUsingPOST({
      carId: carId,
      timeSlots:timeSLots
    })
    if (res.code === 0) {
      api["success"]({
        message: `预约成功！ `,
        description: <Context.Consumer>{() => '您已成功预约，请及时与车主联系并按时归还车位'}</Context.Consumer>,
        btn,
        placement:"topRight"
      });
      setshowMessage(false);
      await loadData();
    } else {
      message.error('预约失败，'+res.description);
    }
  }
  const showAddMessage = () => {
    setshowMessage(true);
  }
  const cancel = async (value:any)=>{
    const res =await deleteReservationUsingPOST({id:value});
    if(res.code === 0){
      message.success('取消预约成功');
      await loadData();
    }else{
      message.error('取消预约失败');
    }
  }
  const handleCancel = () => {
    setshowMessage(false);
  }
  const onSelect = (value: any) => {
    setTimeSLots(value);
  }
  useEffect(() => {
      loadData();
    }, []
  )

  return (
    <div className="reserve-car-space">
      {contextHolder}
      <Button type="ghost" disabled style={{fontSize:"40px"}}>
        预约
      </Button>
      <div style={{marginBottom:24}} />
      <Modal
        title={'预约时间'}
        open={showMessage}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText={'取消'}
        okText={'确定'}
      >
        <DatePicker.RangePicker
          onChange={(value) => {
            onSelect(value);
          }}
          name="timeSlots" showTime/>
        <div style={{marginBottom:12}} />
        <Input placeholder="输入您的车牌号" prefix={<CarOutlined /> } allowClear />
      </Modal>
      <Row gutter={24}>
        <Col span={12}>
          <Card>
            <Descriptions title={currentCarSpace?.carspace?.location} column={1}>
              <Descriptions.Item
                label={
                  <div>
                    <PayCircleOutlined/>
                    {'车位时价'}
                  </div>
                }
              >
                {currentCarSpace?.carspace?.price + '元/时'}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <div>
                    <UserOutlined/>
                    {'车位主人'}
                  </div>
                }
              >
                {currentCarSpace?.ownerName}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <div>
                    <PhoneOutlined/>
                    {'联系电话'}
                  </div>
                }
              >
                {currentCarSpace?.phoneNumber}
              </Descriptions.Item>
              <Descriptions.Item label="可预约时间">
                <List
                  split={false}
                  loading={loading}
                  dataSource={currentCarSpace?.ireseres}
                  renderItem={(item) => (
                    <List.Item>
                      <DatePicker.RangePicker
                        size={'small'}
                        showTime
                        disabled
                        defaultValue={[dayjs(item.startTime), dayjs(item.endTime)]}
                      />
                      <br/>
                    </List.Item>
                  )}
                />
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={'您的预约'} extra={<Button onClick={showAddMessage}>添加预约时间</Button>}>
            <List
              split={false}
              loading={loading}
              dataSource={Reservations}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    description={
                      <div>
                        <Space size={"middle"}>
                          <DatePicker.RangePicker
                            size={'small'}
                            showTime
                            disabled
                            defaultValue={[dayjs(item.reserveStartTime), dayjs(item.reserveEndTime)]}
                          />
                          <Button size={"small"} onClick={()=>cancel(item.reserveId)}>
                            取消预约该时段
                          </Button>
                        </Space>
                      </div>}
                  />
                </List.Item>
              )}/>

          </Card>
        </Col>
      </Row>
    </div>
  );

};

export default CarSpaceReserve;
