import {Button, Col, message, Modal, Row} from 'antd';
import {history} from '@@/core/history';
// import Search from 'antd/es/input/Search';
import {getCurrentCarSpaceUsingPOST, listCarSpacesUsingPOST,} from '@/services/rico/carSpaceController';
import React, {useEffect, useState} from 'react';
import {sleep} from "@antfu/utils";
import {useModel} from "@@/exports";
import Search from "antd/es/input/Search";

/**
 * 车位大厅
 * @constructor
 */
const CarpSpaceRoomPage: React.FC = () => {
  const [carSpaceList, setCarSpaceList] = useState<API.ComplCarspace[]>();
  const [currentCarSpace, setCurrentCarSpace] = useState<API.ComplCarspace>();
  const {initialState} = useModel('@@initialState');
  const [loading, setLoading] = useState<boolean>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = (value: any) => {
    console.log(initialState?.currentUser?.userId, currentCarSpace?.carspace?.ownerId);
    if (initialState?.currentUser?.userId === currentCarSpace?.carspace?.ownerId) {
      message.error("不可以预约自己的车位!");
    } else {
      history.push('/carSpace/Reserve', {carId: value});
    }
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
      </Modal>
      <Row gutter={24} align={"middle"} justify={"center"}>
        <Col span={8}>
          <Button type="ghost" disabled style={{fontSize: "40px"}}>
            AI
          </Button>
        </Col>
        <Col span={8}>
          <Search placeholder="input search text" enterButton="Search" size="large"/>
        </Col>
        <Col span={8}>

        </Col>
      </Row>
    </div>
  );
};
export default CarpSpaceRoomPage;
