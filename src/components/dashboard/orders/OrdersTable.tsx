import React, { useState } from 'react';
import { Avatar, Button, Modal, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IOrder } from '../../../types';
import { useTranslation } from 'react-i18next';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { buttonStyle } from '../../../assets/styles/globalStyle';
import dayjs from '../../../libs/dayjs';
interface OrdersTableProps {
  isLoading: boolean;
  total: number;
  orders: IOrder[];
  current: number;
  itemPerPage: number;
  setItemPerPage: (newItemPerPage: number) => void;
  setCurrent: (value: number) => void;
  onDelete: (orderId: string) => void;
  onSelectOrder: (order: IOrder) => void;
}
const OrdersTable: React.FC<OrdersTableProps> = ({
  current,
  setCurrent,
  isLoading,
  orders,
  onDelete,
  onSelectOrder,
  total,
  itemPerPage,
  setItemPerPage,
}) => {
  const { t } = useTranslation();
  const onDeleteBtnClick = (orderId: string) => {
    Modal.confirm({
      icon: <ExclamationCircleFilled />,
      title: t('are you sure that you want to delete order with id') + ' ' + orderId + '?',
      okText: t('delete'),
      cancelText: t('cancel'),
      onOk: () => {
        onDelete(orderId);
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
  const onUpdateBtnClick = (order: IOrder) => onSelectOrder(order);
  const onChange = (values: any) => {
    const { current } = values;
    setCurrent(current);
  };
  const columns: ColumnsType<IOrder> = [
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
      title: t('customer id'),
      dataIndex: 'customerId',
      key: 'customerId',
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
      title: t('items'),
      dataIndex: 'items',
      key: 'items',
      render: src => <span>{JSON.stringify(src)}</span>,
    },
    {
      title: t('total price'),
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: text => (
        <Tag color="green">
          {text + 'VND' || (
            <small>
              <em>{t('not updated yet')}</em>
            </small>
          )}
        </Tag>
      ),
    },
    {
      title: t('voucher'),
      dataIndex: 'voucher',
      key: 'voucher',
      render: text => (
        <span>
          {JSON.stringify(text) || (
            <small>
              <em>{t('not updated yet')}</em>
            </small>
          )}
        </span>
      ),
    },
    {
      title: t('note'),
      dataIndex: 'note',
      key: 'note',
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
      title: t('is delivery'),
      dataIndex: 'isDelivery',
      key: 'isDelivery',
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
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
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
        rowKey={(record: IOrder) => record._id}
        onChange={onChange}
        loading={isLoading}
        columns={columns}
        dataSource={orders}
        pagination={{
          pageSize: itemPerPage,
          total,
          current,
          onShowSizeChange: (_, size) => {
            setItemPerPage(size);
          },
        }}
      />
    </>
  );
};

export default OrdersTable;
