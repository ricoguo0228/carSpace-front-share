import { Button, Card, DatePicker, Descriptions, List, message, Modal } from 'antd';

// import Search from 'antd/es/input/Search';

import {
  getCurrentCarSpaceUsingGET,
  listCarSpacesUsingPOST,
} from '@/services/rico/carSpaceController';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

/**
 * 添加图表页面
 * @constructor
 */
const CarpSpaceRoomPage: React.FC = () => {
  // const initSearchParams = {
  //   current: 1,
  //   pageSize: 12,
  // };
  const [carSpaceList, setCarSpaceList] = useState<API.ComplCarspace[]>();
  const [currentCarSpace, setCurrentCarSpace] = useState<API.ComplCarspace>();
  // const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await listCarSpacesUsingPOST();
      if (res.data) {
        setCarSpaceList(res.data ?? []);
      } else {
        message.error('大厅加载失败');
      }
    } catch (e: any) {
      message.error('大厅加载失败' + e.message);
    }
    setLoading(false);
  };
  const showMessage = async (value: any) => {
    console.log(value);
    const res = await getCurrentCarSpaceUsingGET(value);
    if (res.data) {
      setCurrentCarSpace(res.data);
      setIsModalOpen(true);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="room">
      <Modal title="车位详情" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Descriptions title={currentCarSpace?.carspace?.location}>
          <Descriptions.Item label="车位时价：">
            {currentCarSpace?.carspace?.price}
          </Descriptions.Item>
          <Descriptions.Item label="车位主人">{currentCarSpace?.ownerName}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{currentCarSpace?.phoneNumber}</Descriptions.Item>
          <Descriptions.Item label="可预约时间">
            <List
              loading={loading}
              dataSource={currentCarSpace?.ireseres}
              renderItem={(item) => (
                <List.Item>
                  <DatePicker.RangePicker
                    showTime
                    disabled
                    defaultValue={[dayjs(item.startTime), dayjs(item.endTime)]}
                  />
                  <br />
                </List.Item>
              )}
            />
          </Descriptions.Item>
        </Descriptions>
      </Modal>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        loading={loading}
        dataSource={carSpaceList}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={
                item.carspace
                  ? item.carspace.location
                    ? item.carspace.location
                    : '位置未知'
                  : '位置未知'
              }
              extra={
                <Button
                  size={'small'}
                  type="link"
                  onClick={() => {
                    showMessage(item.carspace?.carId as API.IdRequest);
                  }}
                >
                  {'详情'}
                </Button>
              }
            >
              <List.Item.Meta
                description={
                  item.carspace
                    ? item.carspace.price
                      ? '小时单价：' + item.carspace.price
                      : '价格未知'
                    : '价格未知'
                }
              />
              <div style={{ marginBottom: 4 }} />
              {'可预约时间段：'}
              <List
                loading={loading}
                dataSource={item.ireseres}
                renderItem={(item) => (
                  <List.Item>
                    <DatePicker.RangePicker
                      showTime
                      disabled
                      defaultValue={[dayjs(item.startTime), dayjs(item.endTime)]}
                    />
                    <br />
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
