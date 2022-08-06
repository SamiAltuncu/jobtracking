import { SearchOutlined } from '@ant-design/icons';
import { Col, Input, Row, Select } from 'antd';
import React, { useState } from 'react';
import { setJobs } from '../config/reducer/jobsSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import styles from '../styles/custom.module.scss';

export interface JobFilterProps {
    search: Jobs[]
}

const { Option } = Select;
export const JobFilter: React.FC<JobFilterProps> = (props) => {
    const [priority, setPriority] = useState<string>("all");
    const [name, setName] = useState<string>();
    const dispatch = useAppDispatch();

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const filterJobs = getFilter(e.target.value, priority);
        dispatch(setJobs(filterJobs));
        setName(e.target.value);
    }

    function getFilter(value: any, priority: string) {
        const filterCache = [...props.search ?? []];
        const filterJobs = filterCache.filter((x) => {
            if (priority === "all") return value?.length ? x.name?.indexOf(value) !== -1 : true;
            const t = x.tags?.toLocaleLowerCase() === priority;
            return value?.length ? x.name?.indexOf(value) !== -1 && t : t;
        });
        return filterJobs;
    }

    function onChangePriority(value: any) {
        const filterJobs = getFilter(name, value);
        dispatch(setJobs(filterJobs));
        setPriority(value);
    }

    return (
        <Row className={styles.customFilter} gutter={8}>
            <Col className="gutter-row" xs={24} md={18} sm={18} xl={20}>
                <Input placeholder='Job Name' onChange={onChangeName} suffix={<SearchOutlined />} />
            </Col>
            <Col className="gutter-row" xs={24} md={6} sm={6} xl={4}>
                <Select value={priority} onChange={onChangePriority} placeholder="Priority (all)">
                    <Option value="all">Priority (all)</Option>
                    <Option value="urgent">Urgent</Option>
                    <Option value="regular">Regular</Option>
                    <Option value="trivial">Trivial</Option>
                </Select>
            </Col>
        </Row>
    )
}