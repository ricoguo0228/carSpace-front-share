import React, {useEffect, useState} from 'react';
import {Button, Card, DatePicker, List, message} from "antd";
import {PayCircleOutlined, PushpinOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {history} from "@@/core/history";
import {sleep} from "@antfu/utils";
import {
  carSpaceInvokeUsingPOST,
  carSpacePublishUsingPOST,
  listUserSpacesUsingPOST
} from "@/services/rico/carSpaceController";
import {useModel} from "@@/exports";

const CarSpaceCreate: React.FC = () => {
  const [carSpaceList, setCarSpaceList] = useState<API.ComplCarspace[]>();
  const [loading, setLoading] = useState<boolean>();
  const {initialState} = useModel('@@initialState');
  const loadData = async () => {
    setLoading(true);
    await sleep(500);
    try {
      const res = await listUserSpacesUsingPOST({id: initialState?.currentUser?.userId});
      if (res.data) {
        setCarSpaceList(res.data ?? []);
      } else {
        message.error('我的车位加载失败，' + res.description);
      }
    } catch (e: any) {
      message.error('我的车位加载失败，' + e.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    loadData();
  }, []);
  const publishOrInvoke = async (item: API.ComplCarspace) => {
    if (item.carspace?.carStatus === 0) {
      const res = await carSpacePublishUsingPOST({id: item.carspace.carId});
      if (res.code === 0) {
        message.success('发布成功');
        await loadData();
      } else {
        message.error('发布失败，' + res.description);
      }
    }
    if (item.carspace?.carStatus === 1) {
      const res = await carSpaceInvokeUsingPOST({id: item.carspace.carId});
      if (res.code === 0) {
        message.success('回收成功');
        await loadData();
      } else {
        message.error('回收失败，' + res.description);
      }
    }
  }
  return (
    <div className="my-reserve">
      <Button type="ghost" disabled style={{fontSize: "40px"}}>
        我的车位
      </Button>
      <div style={{marginBottom: 24}}/>
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
                <>
                  <Button
                    size={'small'}
                    onClick={() => publishOrInvoke(item)}
                  >
                    {item.carspace?.carStatus===0 ? '发布':'回收'}
                  </Button>
                  <Button
                    size={'small'}
                    type="link"
                    onClick={() => {
                      history.push('/carSpace/myCreateInfo', {carId: item.carspace?.carId});
                    }}
                  >
                    详情
                  </Button>
                </>
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
