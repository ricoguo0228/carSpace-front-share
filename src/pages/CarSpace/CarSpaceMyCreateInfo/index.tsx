import {useLocation} from 'umi';
import React, {useEffect, useState} from 'react';
import {Button, Card, Col, DatePicker, Descriptions, List, message, Modal, Row, Space} from "antd";
import {PayCircleOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {
  currentReservationsUsingPOST,
} from "@/services/rico/reservationController";
import {carSpaceDeleteUsingPOST, getCurrentCarSpaceUsingPOST} from "@/services/rico/carSpaceController";
import {history} from 'umi';
import {sleep} from "@antfu/utils";
import {timeSlotsIncreaseUsingPOST} from "@/services/rico/ireserveController";

const CarSpaceMyCreateInfo: React.FC = () => {
  const state: any = useLocation().state;
  const carId = state.carId;
  const [currentCarSpace, setCurrentCarSpace] = useState<API.ComplCarspace>();
  const [Reservations, setReservations] = useState<API.Reservation[]>();
  const [loading, setLoading] = useState<boolean>();
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [timeSLots, setTimeSLots] = useState<[]>();
  const loadData = async () => {
    setLoading(true);
    await sleep(500);
    const ComplCarSpaceResponse = await getCurrentCarSpaceUsingPOST({id: carId});
    if (ComplCarSpaceResponse.data) {
      setCurrentCarSpace(ComplCarSpaceResponse.data);
    } else {
      message.error("获取车位信息失败");
    }
    const Reservetions = await currentReservationsUsingPOST({id: carId});
    if (Reservetions.data) {
      setReservations(Reservetions.data);
    } else {
      message.error("获取车位预约信息失败");
    }
    setLoading(false);
  }
  const handleOk = async () => {
    const res = await timeSlotsIncreaseUsingPOST({
      carId: carId,
      timeSlots: timeSLots
    })
    if (res.code === 0) {
      await loadData();
    } else {
      message.error('预约失败，' + res.description);
    }
    setShowMessage(false);
  }

  const showAddMessage = () => {
    setShowMessage(true);
  }
  const handleCancel = () => {
    setShowMessage(false);
    setShowDelete(false);
  }
  const onSelect = (value: any) => {
    setTimeSLots(value);
  }

  const deleteCarSpace = async () => {
    const res = await carSpaceDeleteUsingPOST({id: currentCarSpace?.carspace?.carId})
    if(res.data){
      message.success("删除成功"+res.description);
      await sleep(200);
      history.push('/carSpace/myCreate');
      setShowDelete(false);
    }else{
      message.error("删除失败,"+res.description);
    }
  }
  const showDeleteMessage = ()=>{
    setShowDelete(true);
  }

  useEffect(() => {
      loadData();
    }, []
  )
  return (
    <div className="reserve-car-space">
      <Button size="large" type="link" onClick={() => {
        history.push('/carSpace/myCreate')
      }}>
        返回我的车位
      </Button>
      <div style={{marginBottom: 16}}/>
      <Modal
        title={'删除确认'}
        open={showDelete}
        onCancel={handleCancel}
        onOk={deleteCarSpace}
        okText={'确定'}
        cancelText={'取消'}
      >
        确定要删除这个车位吗
      </Modal>
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
      </Modal>
      <Row gutter={24}>
        <Col push={6} span={12}>
          <Card title={'车位详情'}
                extra={
                  <>
                    <Space>
                      <Button danger ghost onClick={showDeleteMessage}>
                        删除该车位
                      </Button>
                      <Button onClick={showAddMessage}>
                        添加可预约时间
                      </Button>
                    </Space>
                  </>
                }>
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
              <Descriptions.Item label="已被预约的时间">
                <List
                  split={false}
                  loading={loading}
                  dataSource={Reservations}
                  renderItem={(item) => (
                    <List.Item>
                      <DatePicker.RangePicker
                        size={'small'}
                        showTime
                        disabled
                        defaultValue={[dayjs(item.reserveStartTime), dayjs(item.reserveEndTime)]}
                      />
                      <br/>
                    </List.Item>
                  )}
                />
              </Descriptions.Item>
            </Descriptions>

          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CarSpaceMyCreateInfo;
