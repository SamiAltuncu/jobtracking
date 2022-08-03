import { Modal } from 'antd';
import React from 'react';

export interface ModalBoxProps {
    visible?: boolean;
    closable?: boolean;
    className?: string;
    okText?: string;
    children?: React.ReactNode;
    onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
}

const ModalBox: React.FC<ModalBoxProps> = (props) => {
    return (
        <div>
            <Modal
                onCancel={props.onCancel}
                okText={props.okText}
                className={props.className}
                closable={props.closable}
                visible={props.visible}
            >
                {props.children}
            </Modal>
        </div>
    )
}

export default ModalBox