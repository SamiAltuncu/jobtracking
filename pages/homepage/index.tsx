import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { JobAdd, JobApprove, JobEdit, JobFilter } from '../../components';
import { toggleEditModal } from '../../config/reducer/modalSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import styles from '../../styles/home.module.scss';

function HomePage() {
    const [approve, setApprove] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const jobs = useAppSelector((state) => state.job?.jobs);
    const search = useAppSelector((state) => state.job?.search);
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
            width: 750,
            sorter: (a, b) => a.name.length - b.name.length
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
            ),
            sorter: (a, b) => {
                const sortOrder = ['urgent', 'regular', 'trivial'];
                return sortOrder.indexOf(a.tags) - sortOrder.indexOf(b.tags);
            },
            responsive: ["xxl", "xl", "md", "sm"]
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
            <JobFilter search={search} />
            <Table pagination={false} columns={columns} dataSource={jobs} />
            <JobApprove visible={approve} onVisible={onVisibleApprove} onCancel={() => onCancel()} />
            <JobEdit visible={edit} onVisible={onVisibleEdit} onCancel={() => onEdit()} />
        </div>
    )
}


export default HomePage