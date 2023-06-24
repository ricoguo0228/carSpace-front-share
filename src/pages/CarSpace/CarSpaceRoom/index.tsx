import {Button, Card, DatePicker, Descriptions, FloatButton, List, message, Modal} from 'antd';
import {history} from '@@/core/history';
// import Search from 'antd/es/input/Search';
import {getCurrentCarSpaceUsingPOST, listCarSpacesUsingPOST,} from '@/services/rico/carSpaceController';
import {PayCircleOutlined, PhoneOutlined, PushpinOutlined, UserOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {useModel} from "@@/exports";

/**
 * 车位大厅
 * @constructor
 */
const CarpSpaceRoomPage: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 4,
  };

  const [carSpaceList, setCarSpaceList] = useState<API.ComplCarspace[]>([]);
  const [currentCarSpace, setCurrentCarSpace] = useState<API.ComplCarspace>();
  const {initialState} = useModel('@@initialState');
  const [loading, setLoading] = useState<boolean>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchParams, setSearchParams] = useState<API.ListCarSpaceRequest>({ ...initSearchParams });

  const handleOk = (value: any) => {
    console.log(initialState?.currentUser?.userId,currentCarSpace?.carspace?.ownerId);
    if(initialState?.currentUser?.userId===currentCarSpace?.carspace?.ownerId){
      message.error("不可以预约自己的车位!");
    }
    else{
      history.push('/carSpace/Reserve', {carId: value});
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await listCarSpacesUsingPOST(searchParams);
      console.log(res);
      if (res.data) {
        setCarSpaceList(res.data.records ?? []);
      } else {
        message.error('大厅加载失败');
      }
    } catch (e: any) {
      message.error('大厅加载失败' + e.message);
    }
    setLoading(false);
  };

  const showMessage = async (value: number) => {
    const res = await getCurrentCarSpaceUsingPOST({id: value});
    if (res.code === 0) {
      setCurrentCarSpace(res.data);
      setIsModalOpen(true);
    } else {
      message.error(res.message);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchParams]);

  return (
    <div className="room">
      <FloatButton onClick={() => console.log('click')} />
      <Button type="ghost" disabled style={{fontSize:"40px"}}>
        车位大厅
      </Button>
      <div style={{marginBottom:24}} />
      <Modal
        open={isModalOpen}
        onOk={() => handleOk(currentCarSpace?.carspace?.carId)}
        onCancel={handleCancel}
        cancelText={'关闭'}
        okText={'前往预约'}
      >
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
      </Modal>
      <List
        split={false}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 2,
          xxl: 4,
        }}
        loading={loading}
        dataSource={carSpaceList}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={
                <div>
                  {item.carspace
                    ? item.carspace.location
                      ? item.carspace.location + '  '
                      : '位置未知'
                    : '位置未知'}
                  <PushpinOutlined/>
                </div>
              }
              extra={
                <Button
                  size={'small'}
                  type="link"
                  onClick={() => {
                    showMessage(item.carspace?.carId ?? 0);
                  }}
                >
                  详情
                </Button>
              }
            >
              <List.Item.Meta
                description={
                  <div>
                    <PayCircleOutlined/>
                    {item.carspace
                      ? item.carspace.price
                        ? '  ' + item.carspace.price + '元/时'
                        : '价格未知'
                      : '价格未知'}
                  </div>
                }
              />
              <div style={{marginBottom: 8}}/>
              {'可预约时间段：'}
              <List
                split={false}
                loading={loading}
                dataSource={item.ireseres}
                renderItem={(item) => (
                  <List.Item>
                    <DatePicker.RangePicker
                      showTime
                      disabled
                      defaultValue={[dayjs(item.startTime), dayjs(item.endTime)]}
                    />
                    <br/>
                  </List.Item>
                )}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default CarpSpaceRoomPage;
