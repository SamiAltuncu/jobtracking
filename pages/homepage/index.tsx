import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import JobAdd from '../../components/JobAdd';
import JobApprove from '../../components/JobApprove';
import JobEdit from '../../components/JobEdit';
import { selectJobs } from '../../config/reducer/jobsSlice';
import { toggleEditModal } from '../../config/reducer/modalSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import styles from '../../styles/home.module.scss';

function HomePage() {
    const [approve, setApprove] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const { jobs } = useAppSelector(selectJobs);
    const dispatch = useAppDispatch();

    function onEdit(j?: Jobs) {
        onVisibleEdit();
        dispatch(toggleEditModal(j));
    }

    function onCancel(j?: Jobs) {
        setApprove(!approve);
        dispatch(toggleEditModal(j));
    }

    function onVisibleEdit() {
        setEdit(!edit);
    }

    function onVisibleApprove() {
        setApprove(!approve);
    }

    const columns: ColumnsType<any> = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
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
            render: (a) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => onEdit(a)} icon={<EditOutlined />} />
                    <Button type="primary" onClick={() => onCancel(a)} icon={<DeleteOutlined />} />
                </Space>
            )
        }
    ];

    return (
        <div className={styles["new-job"]}>
            <h3 className={styles.title}>Create New Job</h3>
            <JobAdd jobs={jobs} />
            <h3 className={styles["list-head"]}>Job List</h3>
            <Table pagination={false} columns={columns} dataSource={jobs} />
            <JobApprove visible={approve} onVisible={onVisibleApprove} onCancel={() => onCancel()} />
            <JobEdit visible={edit} onVisible={onVisibleEdit} onCancel={() => onEdit()} />
        </div>
    )
}


export default HomePage