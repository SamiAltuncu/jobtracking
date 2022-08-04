import { Modal } from 'antd';
import React from 'react';

export interface ModalBoxProps {
    visible?: boolean;
    closable?: boolean;
    className?: string;
    okText?: string;
    children?: React.ReactNode;
    onOk?: (e: React.MouseEvent<HTMLElement>) => void;
    onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
}

const ModalBox: React.FC<ModalBoxProps> = (props) => {
    return (
        <Modal
            onOk={props.onOk}
            onCancel={props.onCancel}
            okText={props.okText}
            className={props.className}
            closable={props.closable}
            visible={props.visible}
        >
            {props.children}
        </Modal>
    )
}

export default ModalBox