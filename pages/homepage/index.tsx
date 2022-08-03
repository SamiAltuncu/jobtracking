import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Select, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import styles from '../../styles/home.module.scss';

const { Option } = Select;

interface DataType {
    key: string;
    name: string;
    tags?: "Urgent" | "Regular" | "Trivial";
}

const ModalBox = dynamic(() => import("../../components/ModalBox"), { ssr: false });
function HomePage() {
    const [visible, setVisible] = useState<boolean>(false);

    function onDelete() {
        setVisible(!visible);
    }

    function onCancel() {
        setVisible(!visible);
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            key: 'name',
            width: 750
        },
        {
            title: 'Priority',
            key: 'priority',
            render: (t) => (
                <div className={t.tags}>
                    <Tag>
                        {t.tags}
                    </Tag>
                </div>
            )
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            render: () => (
                <Space size="middle">
                    <Button type="primary" icon={<EditOutlined />} />
                    <Button type="primary" onClick={onDelete} icon={<DeleteOutlined />} />
                </Space>
            )
        }
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: 'John Brown',
            tags: 'Urgent'
        },
        {
            key: '2',
            name: 'Jim Green',
            tags: 'Regular'
        },
        {
            key: '3',
            name: 'Joe Black',
            tags: 'Trivial'
        }
    ];

    return (
        <>
            <div className={styles["new-job"]}>
                <h3 className={styles.title}>Create New Job</h3>
                <Row className='d-flex' gutter={8}>
                    <Col className="gutter-row" span={16}>
                        <p>Job Name</p>
                        <Input />
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <p>Job Priority</p>
                        <Select placeholder="Choose">
                            <Option value="urgent">Urgent</Option>
                            <Option value="regular">Regular</Option>
                            <Option value="trivial">Trivial</Option>
                        </Select>
                    </Col>
                    <Col className="gutter-row d-flex align-items-end" span={2}>
                        <Button type="primary" icon={<PlusOutlined />}>Create</Button>
                    </Col>
                </Row>
                <h3 className={styles["list-head"]}>Job List</h3>
                <Table pagination={false} columns={columns} dataSource={data} />
            </div>
            <ModalBox
                okText='Approve'
                onCancel={onCancel}
                className={styles.modalStyle}
                closable={false}
                visible={visible}
            >
                <div className='d-flex flex-row align-items-center justify-content-center'>
                    <ExclamationCircleOutlined style={{ fontSize: "36px", color: "#e83d6d" }} />
                    <p className={styles["modal-text"]}>Are you sure you want to delete it?</p>
                </div>
            </ModalBox>
            <ModalBox
                okText='Save'
                className={styles.modalStyle}
                closable={false}
                visible={false}
            >
                <div className='d-flex flex-row align-items-center justify-content-center'>
                    <p className={styles["modal-title"]}>Job Edit</p>
                    <div className="w-100">
                        <p>Job Name</p>
                        <Input />
                    </div>
                    <div className="w-100 mt-3">
                        <p>Job Priority</p>
                        <Select className="w-100" placeholder="Choose">
                            <Option value="urgent">Urgent</Option>
                            <Option value="regular">Regular</Option>
                            <Option value="trivial">Trivial</Option>
                        </Select>
                    </div>
                </div>
            </ModalBox>
        </>
    )
}

export default HomePage