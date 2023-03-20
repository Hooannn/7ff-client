import React, { useState } from 'react';
import { Avatar, Button, Modal, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IUser } from '../../../types';
import { useTranslation } from 'react-i18next';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { buttonStyle } from '../../../assets/styles/globalStyle';

interface UsersTableProps {
  isLoading: boolean;
  users: IUser[];
  onDelete: (userId: string) => void;
  onSelectUser: (user: IUser) => void;
}
const UsersTable: React.FC<UsersTableProps> = ({ isLoading, users, onDelete, onSelectUser }) => {
  const { t } = useTranslation();
  const onDeleteBtnClick = (userId: string) => {
    Modal.confirm({
      icon: <ExclamationCircleFilled />,
      title: t('are you sure that you want to delete user with id') + ' ' + userId + '?',
      okText: t('delete'),
      cancelText: t('cancel'),
      onOk: () => {
        onDelete(userId);
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
  const onUpdateBtnClick = (user: IUser) => onSelectUser(user);
  const columns: ColumnsType<IUser> = [
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
      title: t('avatar'),
      dataIndex: 'avatar',
      key: 'avatar',
      render: src => <Avatar src={src} size="large" />,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
      title: t('role'),
      dataIndex: 'role',
      key: 'role',
      render: text => (
        <Tag color="blue">
          {text || (
            <small>
              <em>{t('not updated yet')}</em>
            </small>
          )}
        </Tag>
      ),
    },
    {
      title: t('phone number'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
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
      title: t('first name').toString(),
      dataIndex: 'firstName',
      key: 'firstName',
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
      title: t('last name').toString(),
      dataIndex: 'lastName',
      key: 'lastName',
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
      title: t('address'),
      dataIndex: 'address',
      key: 'address',
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
      <Table style={{ width: '100%' }} loading={isLoading} columns={columns} dataSource={users} />
    </>
  );
};

export default UsersTable;
