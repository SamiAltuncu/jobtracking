import { ExclamationCircleOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import React from 'react';
import { deleteTodo } from '../config/reducer/jobsSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import styles from '../styles/modal.module.scss';

export interface JobApproveProps {
    onOk?: (e: React.MouseEvent<HTMLElement>) => void;
    onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
    onVisible?: () => void;
    visible?: boolean;
}

const ModalBox = dynamic(() => import("./ModalBox"), { ssr: false });
const JobApprove: React.FC<JobApproveProps> = (props) => {
    const modal = useAppSelector((state) => state.modal);
    const dispatch = useAppDispatch();

    function onSave() {
        props.onVisible?.();
        dispatch(deleteTodo({ key: modal.isEditData.key }));
    }

    function onCancel() {
        props.onVisible?.();
    }

    return (
        <ModalBox
            okText='Approve'
            onOk={onSave}
            onCancel={onCancel}
            className={styles.modalStyle}
            closable={false}
            visible={props.visible}
        >
            <div className='d-flex flex-row align-items-center justify-content-center'>
                <ExclamationCircleOutlined style={{ fontSize: "42px", color: "#e83d6d" }} />
                <p className={styles["modal-text"]}>Are you sure you want to delete it?</p>
            </div>
        </ModalBox>
    )
}

export default JobApprove;