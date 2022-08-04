import { Input, Select } from 'antd';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { editTodo } from '../config/reducer/jobsSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import styles from '../styles/modal.module.scss';

const { Option } = Select;

export interface JobEditProps {
    onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
    onVisible?: () => void;
    visible?: boolean;
}

const ModalBox = dynamic(() => import("./ModalBox"), { ssr: false });
const JobEdit: React.FC<JobEditProps> = (props) => {
    const dispatch = useAppDispatch();
    const modal = useAppSelector((state) => state.modal);
    const [name, setName] = useState<string>("");
    const [tag, setTag] = useState<Tags>();

    function onChangePriority(value: Tags) {
        setTag(value);
    }

    function onSave() {
        props.onVisible?.();
        dispatch(editTodo({ ...modal.isEditData, tags: tag }));
    }

    useEffect(() => {
        setName(modal.isEditData?.name);
        setTag(modal.isEditData?.tags);
    }, [modal.isEditData]);

    return (
        <ModalBox
            okText='Save'
            onOk={onSave}
            onCancel={props.onCancel}
            className={styles.modalStyle}
            closable={false}
            visible={props.visible}
        >
            <div className='d-flex flex-row align-items-center justify-content-center'>
                <p className={styles["modal-title"]}>Job Edit</p>
                <div className="w-100">
                    <p>Job Name</p>
                    <Input value={name} />
                </div>
                <div className="w-100 mt-3">
                    <p>Job Priority</p>
                    <Select value={tag} onChange={onChangePriority} className="w-100" placeholder="Choose">
                        <Option value="urgent">Urgent</Option>
                        <Option value="regular">Regular</Option>
                        <Option value="trivial">Trivial</Option>
                    </Select>
                </div>
            </div>
        </ModalBox>
    )
}

export default JobEdit