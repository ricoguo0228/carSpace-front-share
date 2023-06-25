import {history, useLocation} from 'umi';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Descriptions,
  Drawer,
  Form,
  Input,
  List,
  message,
  Modal,
  Popconfirm,
  Row,
  Space
} from "antd";
import {DeleteOutlined, EditOutlined, PayCircleOutlined, UserOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {
  carSpaceDeleteUsingPOST,
  carSpaceUpdateUsingPOST,
  getCurrentCarSpaceUsingPOST
} from "@/services/rico/carSpaceController";
import {sleep} from "@antfu/utils";
import {timeSlotsDeleteUsingPOST, timeSlotsIncreaseUsingPOST} from "@/services/rico/ireserveController";
import {currentReservationsInCreateUsingPOST} from "@/services/rico/reservationController";
import {getCurrentUserUsingPOST} from "@/services/rico/userController";

const CarSpaceMyCreateInfo: React.FC = () => {
  const state: any = useLocation().state;
  const carId = state.carId;
  const [currentCarSpace, setCurrentCarSpace] = useState<API.ComplCarspace>();
  const [currentIreserve, setCurrentIreserve] = useState<API.Ireserve>();
  const [Reservations, setReservations] = useState<API.Reservation[]>();
  const [timeSLots, setTimeSLots] = useState<[]>();
  const [loading, setLoading] = useState<boolean>();
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [showCarSpaceDelete, setShowCarSpaceDelete] = useState<boolean>(false);
  const [showTimeSlotDelete, setShowTimeSlotDelete] = useState<boolean>(false);
  const [reservedUser, setReservedUser] = useState<API.User>();
  const [edit, setEdit] = useState<boolean>(false);


  const loadData = async () => {
    setLoading(true);
    await sleep(500);
    const ComplCarSpaceResponse = await getCurrentCarSpaceUsingPOST({id: carId});
    if (ComplCarSpaceResponse.data) {
      setCurrentCarSpace(ComplCarSpaceResponse.data);
    } else {
      message.error("获取车位信息失败");
    }
    const Reservetions = await currentReservationsInCreateUsingPOST({id: carId});
    if (Reservetions.data) {
      setReservations(Reservetions.data);
    } else {
      message.error("获取车位预约信息失败");
    }
    setLoading(false);
  }

  useEffect(() => {
      loadData();
    }, []
  )
  const onfinish = async (values: any) => {
    const res = await carSpaceUpdateUsingPOST(values);
    if (res.code === 0) {
      message.success("修改成功");
      setEdit(false);
      await loadData();
    } else {
      message.error("修改失败，" + res.description);
    }
  }
  const handleOk = async () => {
    const res = await timeSlotsIncreaseUsingPOST({
      carId: carId,
      timeSlots: timeSLots
    })
    console.log(res);
    if (res.code === 0) {
      message.success("添加成功");
      setShowMessage(false);
      await loadData();
    } else {
      message.error('添加失败，' + res.description);
    }
  }

  const onSelect = (value: any) => {
    setTimeSLots(value);
  }

  const deleteCarSpace = async () => {
    const res = await carSpaceDeleteUsingPOST({id: currentCarSpace?.carspace?.carId})
    if (res.data) {
      message.success("删除成功" + res.description);
      await sleep(200);
      history.push('/carSpace/myCreate');
      setShowCarSpaceDelete(false);
    } else {
      message.error("删除失败，" + res.description);
    }
  }

  const deleteTimeSlot = async () => {
    const res = await timeSlotsDeleteUsingPOST({id: currentIreserve?.iid});
    if (res.code === 0) {
      message.success("删除成功");
      setShowTimeSlotDelete(false);
      await loadData();
    } else {
      message.error("删除失败," + res.description);
    }
  }

  const currentReservedUser = async (value:any) => {
    const res = await getCurrentUserUsingPOST({id: value.reserverId});
    if(res.code === 0) {
      setReservedUser(res.data);
    }else{
      message.error("获取用户信息失败"+res.description);
    }
  }


  return (
    <div className="reserve-car-space">
      <Button size="large" type="link" onClick={() => {
        history.push('/carSpace/myCreate')
      }}>
        返回我的车位
      </Button>
      <div style={{marginBottom: 2}}/>
      <Drawer
        title="修改车位信息"
        placement="left"
        onClose={() => setEdit(false)} open={edit}
      >
        <Form onFinish={(values: API.CarSpaceUpdateRequest) => {
          values.carId = currentCarSpace?.carspace?.carId;
          if (!values.location) {
            values.location = currentCarSpace?.carspace?.location;
          }
          if (!values.price) {
            values.price = currentCarSpace?.carspace?.price;
          }
          onfinish(values as API.CarSpaceUpdateRequest)
        }} labelAlign="left">
          <Form.Item name="location">
            <Input prefix={<UserOutlined/>} defaultValue={currentCarSpace?.carspace?.location}/>
          </Form.Item>
          <Form.Item name="price">
            <Input prefix={<PayCircleOutlined/>} defaultValue={currentCarSpace?.carspace?.price}/>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">
              修改
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Modal
        title={'删除确认'}
        open={showTimeSlotDelete}
        onCancel={() => {
          setShowMessage(false);
          setShowTimeSlotDelete(false);
          setShowCarSpaceDelete(false);
        }}
        onOk={deleteTimeSlot}
        okText={'确定'}
        cancelText={'取消'}
      >
      </Modal>
      <Modal
        title={'删除确认'}
        open={showCarSpaceDelete}
        onCancel={() => {
          setShowMessage(false);
          setShowTimeSlotDelete(false);
          setShowCarSpaceDelete(false);
        }}
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
        onCancel={() => {
          setShowMessage(false);
          setShowTimeSlotDelete(false);
          setShowCarSpaceDelete(false);
        }}
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
          <Card
            title={'车位详情'}
            extra={
              <>
                <Space>
                  <Button type="dashed"
                          onClick={
                            () => {
                              setEdit(true);
                            }}>
                    <EditOutlined/>
                  </Button>
                  <Button danger ghost onClick={() => {
                    setShowCarSpaceDelete(true)
                  }}>
                    <DeleteOutlined/>
                  </Button>
                  <Button onClick={() => {
                    setShowMessage(true)
                  }}>
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
              <Descriptions.Item label="可预约时间">
                <List
                  split={false}
                  loading={loading}
                  dataSource={currentCarSpace?.ireseres}
                  renderItem={(item) => (
                    <List.Item>
                      <Space>
                        <DatePicker.RangePicker
                          size={'small'}
                          showTime
                          disabled
                          defaultValue={[dayjs(item.startTime), dayjs(item.endTime)]}
                        />
                        <Button size="small" onClick={() => {
                          setCurrentIreserve(item);
                          setShowTimeSlotDelete(true);
                        }}>
                          删除
                        </Button>
                      </Space>
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
                      <Space>
                        <DatePicker.RangePicker
                          size={'small'}
                          showTime
                          disabled
                          defaultValue={[dayjs(item.reserveStartTime), dayjs(item.reserveEndTime)]}
                        />
                        <Popconfirm
                          title="预约人员信息"
                          description={reservedUser?.nickName+':'+reservedUser?.userPhone+'-'+item.carPass}
                          showCancel={false}
                        >
                          <Button size="small" onClick={() => {
                            currentReservedUser(item);
                          }}>
                            <UserOutlined/>
                          </Button>
                        </Popconfirm>
                      </Space>
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
