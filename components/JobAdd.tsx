import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, FormInstance, Input, Select } from 'antd';
import React, { useState } from 'react';
import { addJobs } from '../config/reducer/jobsSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import styles from '../styles/custom.module.scss';

export interface JobAddProps {
    jobs: Jobs[]
}

const { Option } = Select;
export const JobAdd: React.FC<JobAddProps> = (props) => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState<string>("");
    const [tag, setTag] = useState<Tags>();
    const formRef = React.createRef<FormInstance>();

    function onFinish() {
        formRef.current!.resetFields();
        dispatch(addJobs({ key: props.jobs.length + 1, name: name, tags: tag }));
    }

    function onChangeName(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setName(e.target.value);
    }

    function onChangePriority(value: Tags) {
        setTag(value);
    }

    return (
        <Form ref={formRef} layout='inline' onFinish={onFinish} className={styles.customForm}>
            <Form.Item label="Job Name" name="jobname" rules={[{ required: true, message: '' }]}>
                <Input value={name} onChange={onChangeName} />
            </Form.Item>
            <Form.Item label="Job Priority" name="jobPriority" rules={[{ required: true, message: '' }]}>
                <Select value={tag} onChange={onChangePriority} placeholder="Choose">
                    <Option value="urgent">Urgent</Option>
                    <Option value="regular">Regular</Option>
                    <Option value="trivial">Trivial</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                    Create
                </Button>
            </Form.Item>
        </Form>
    )
}