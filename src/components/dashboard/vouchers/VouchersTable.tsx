import React, { useState } from 'react';
import { Avatar, Button, Modal, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IVoucher } from '../../../types';
import { useTranslation } from 'react-i18next';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { buttonStyle } from '../../../assets/styles/globalStyle';
import dayjs from '../../../libs/dayjs';
interface VouchersTableProps {
  isLoading: boolean;
  total: number;
  vouchers: IVoucher[];
  current: number;
  setCurrent: (value: number) => void;
  onDelete: (voucherId: string) => void;
  onSelectVoucher: (voucher: IVoucher) => void;
}
const VouchersTable: React.FC<VouchersTableProps> = ({ current, setCurrent, isLoading, vouchers, onDelete, onSelectVoucher, total }) => {
  const { t } = useTranslation();
  const onDeleteBtnClick = (voucherId: string) => {
    Modal.confirm({
      icon: <ExclamationCircleFilled />,
      title: t('are you sure that you want to delete voucher with id') + ' ' + voucherId + '?',
      okText: t('delete'),
      cancelText: t('cancel'),
      onOk: () => {
        onDelete(voucherId);
      },
      okButtonProps: {
        danger: true,
        shape: 'round',
        style: { ...buttonStyle, width: '100px', marginLeft: '12px' },
      },
      cancelButtonProps: {
        type: 'text',
        shape: 'round',
        style: { ...buttonStyle, width: '100px' },
      },
    });
  };
  const onUpdateBtnClick = (voucher: IVoucher) => onSelectVoucher(voucher);
  const onChange = (values: any) => {
    const { current } = values;
    setCurrent(current);
  };
  const columns: ColumnsType<IVoucher> = [
    {
      title: t('id'),
      dataIndex: '_id',
      key: 'id',
      render: text => (
        <span>
          {text || (
            <small>
              <em>{t('not updated yet')}</em>
            </small>
          )}
        </span>
      ),
    },
    {
      title: t('created at'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: text => (
        <span>
          {dayjs(text).format('DD/MM/YYYY') || (
            <small>
              <em>{t('not updated yet')}</em>
            </small>
          )}
        </span>
      ),
    },
    {
      title: t('code'),
      dataIndex: 'code',
      key: 'code',
      render: text => (
        <Tag color="green">
          {text || (
            <small>
              <em>{t('not updated yet')}</em>
            </small>
          )}
        </Tag>
      ),
    },
    {
      title: t('discount type'),
      dataIndex: 'discountType',
      key: 'discountType',
      render: text => (
        <span>
          {t(text) || (
            <small>
              <em>{t('not updated yet')}</em>
            </small>
          )}
        </span>
      ),
    },
    {
      title: t('discount amount'),
      dataIndex: 'discountAmount',
      key: 'discountAmount',
      render: text => (
        <span>
          {text || (
            <small>
              <em>{t('not updated yet')}</em>
            </small>
          )}
        </span>
      ),
    },
    {
      title: t('expired date'),
      dataIndex: 'expiredDate',
      key: 'expiredDate',
      render: text => (
        <span>
          {dayjs(text).format('DD/MM/YYYY') || (
            <small>
              <em>{t('not updated yet')}</em>
            </small>
          )}
        </span>
      ),
    },
    {
      title: t('action'),
      key: 'action',
      render: (_, record) => {
        return (
          <>
            <Space size="middle">
              <Button onClick={() => onUpdateBtnClick(record)} shape="round" type="primary">
                {t('update')}
              </Button>
              <Button onClick={() => onDeleteBtnClick(record._id)} type="text" shape="round" danger>
                {t('delete')}
              </Button>
            </Space>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Table
        style={{ width: '100%' }}
        rowKey={(record: IVoucher) => record._id}
        onChange={onChange}
        loading={isLoading}
        columns={columns}
        dataSource={vouchers}
        pagination={{ pageSize: 8, total, current }}
      />
    </>
  );
};

export default VouchersTable;