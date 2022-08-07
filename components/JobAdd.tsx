import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, FormInstance, Input, Select } from 'antd';
import React, { useState } from 'react';
import { addJobs } from '../config/reducer/jobsSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import styles from '../styles/custom.module.scss';

export interface JobAddProps { }

const { Option } = Select;
export const JobAdd: React.FC<JobAddProps> = () => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState<string>("");
    const [tag, setTag] = useState<Tags>();
    const formRef = React.createRef<FormInstance>();

    function onFinish() {
        formRef.current?.resetFields();
        const uniqueKey = Math.floor(100000000 + Math.random() * 900000000);
        dispatch(addJobs({ key: uniqueKey, name: name, tags: tag }));
    }

    function onChangeName(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setName(e.target.value);
    }

    function onChangePriority(value: Tags) {
        setTag(value);
    }

    return (
        <Form ref={formRef} layout='inline' onFinish={onFinish} className={styles.customForm}>
            <Form.Item label="Job Name" name="jobname" rules={[
                { required: true, message: '' },
                { max: 255, message: 'You cannot enter more than 255 characters' },
                { pattern: /^[a-zA-Z0-9çÇşŞğĞüÜöÖıİ\-\s]+$/, message: 'Please use alphanumeric characters only' }
            ]}>
                <Input value={name} onChange={onChangeName} />
            </Form.Item>
            <Form.Item label="Job Priority" name="jobPriority" rules={[{ required: true, message: '' }]}>
                <Select value={tag} onChange={onChangePriority} placeholder="Choose">
                    <Option value="urgent">Urgent</Option>
                    <Option value="regular">Regular</Option>
                    <Option value="trivial">Trivial</Option>
                </Select>
            </Form.Item>
            <Form.Item label=" ">
                <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                    Create
                </Button>
            </Form.Item>
        </Form>
    )
}