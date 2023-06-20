import {Button, Card, DatePicker, Descriptions, List, message, Modal} from 'antd';
import {history} from '@@/core/history';
// import Search from 'antd/es/input/Search';
import {getCurrentCarSpaceUsingPOST, listCarSpacesUsingPOST,} from '@/services/rico/carSpaceController';
import {PayCircleOutlined, PhoneOutlined, PushpinOutlined, UserOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {sleep} from "@antfu/utils";

/**
 * 车位大厅
 * @constructor
 */
const CarpSpaceRoomPage: React.FC = () => {
  const [carSpaceList, setCarSpaceList] = useState<API.ComplCarspace[]>();
  const [currentCarSpace, setCurrentCarSpace] = useState<API.ComplCarspace>();

  const [loading, setLoading] = useState<boolean>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = (value: any) => {
    history.push('/carSpace/Reserve', {carId: value});
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const loadData = async () => {
    setLoading(true);
    await sleep(500);
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
  }, []);

  return (
    <div className="room">
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
