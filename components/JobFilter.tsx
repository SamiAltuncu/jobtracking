import { SearchOutlined } from '@ant-design/icons';
import { Col, Input, Row, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { setJobs } from '../config/reducer/jobsSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import styles from '../styles/custom.module.scss';

export interface JobFilterProps {
    jobs: Jobs[]
}

const { Option } = Select;
export const JobFilter: React.FC<JobFilterProps> = (props) => {
    const [priority, setPriority] = useState<string>("all");
    const [name, setName] = useState<string>();

    const dispatch = useAppDispatch();
    const jobsCache = useRef<Jobs[]>();

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const filterJobs = getFilter(e.target.value, priority);
        dispatch(setJobs(filterJobs));
        setName(e.target.value);
    }

    function getFilter(value: any, priority: string) {
        const filterCache = [...jobsCache.current ?? []];
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

    useEffect(() => {
        jobsCache.current = props.jobs;
    }, []);

    return (
        <Row className={styles.customFilter} gutter={8}>
            <Col className="gutter-row" span={20}>
                <Input placeholder='Job Name' onChange={onChangeName} suffix={<SearchOutlined />} />
            </Col>
            <Col className="gutter-row" span={4}>
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