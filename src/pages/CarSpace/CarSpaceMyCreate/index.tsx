import React, {useEffect, useState} from 'react';
import {Button, Card, DatePicker, List, message} from "antd";
import {PayCircleOutlined, PushpinOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {history} from "@@/core/history";
import {sleep} from "@antfu/utils";
import { listUserSpacesUsingPOST} from "@/services/rico/carSpaceController";
import {useModel} from "@@/exports";

const CarSpaceCreate: React.FC = () => {
  const [carSpaceList, setCarSpaceList] = useState<API.ComplCarspace[]>();
  const [loading, setLoading] = useState<boolean>();
  const {initialState} = useModel('@@initialState');
  const loadData = async () => {
    setLoading(true);
    await sleep(500);
    try {
      const res = await listUserSpacesUsingPOST({id:initialState?.currentUser?.userId});
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
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="my-reserve">
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
                    history.push('/carSpace/myCreateInfo', {carId: item.carspace?.carId});
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
              {'已经发布的预约时间：'}
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
        )}/>
    </div>
  );
};
export default CarSpaceCreate;
