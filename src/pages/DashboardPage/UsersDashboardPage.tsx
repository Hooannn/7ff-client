import { Col, Row, Button, DatePicker, Input } from 'antd';
import { useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { buttonStyle, inputStyle, secondaryButtonStyle } from '../../assets/styles/globalStyle';
import AddUserModal from '../../components/dashboard/users/AddUserModal';
import UsersTable from '../../components/dashboard/users/UsersTable';
import { IUser } from '../../types';
import useUsers from '../../services/users';
import { exportToCSV } from '../../utils/export-csv';
import UpdateUserModal from '../../components/dashboard/users/UpdateUserModal';
export default function UsersDashboardPage() {
  // TODO: Search, filter, pagination
  const { fetchUsersQuery, users, total, addUserMutation, deleteUserMutation, updateUserMutation, current, setCurrent } = useUsers();
  const [shouldAddModalOpen, setAddModelOpen] = useState(false);
  const [shouldUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const { t } = useTranslation();
  const onAddUser = (values: IUser) => {
    addUserMutation.mutateAsync(values).finally(() => setAddModelOpen(false));
  };
  const onUpdateUser = (values: IUser) => {
    updateUserMutation.mutateAsync({ userId: selectedUser?._id as string, data: values }).finally(() => setUpdateModalOpen(false));
  };
  const onDeleteUser = (userId: string) => {
    deleteUserMutation.mutate(userId);
  };

  const onExportToCSV = () => exportToCSV(users, `7FF_Users_${Date.now()}`);

  return (
    <Row>
      <UpdateUserModal
        isLoading={updateUserMutation.isLoading}
        onSubmit={onUpdateUser}
        user={selectedUser}
        shouldOpen={shouldUpdateModalOpen}
        onCancel={() => setUpdateModalOpen(false)}
      />
      <AddUserModal
        onSubmit={onAddUser}
        isLoading={addUserMutation.isLoading}
        shouldOpen={shouldAddModalOpen}
        onCancel={() => setAddModelOpen(false)}
      />

      <Col span={24}>
        <Row align="middle">
          <Col span={12}>
            <h2>{t('user')}</h2>
          </Col>
          <Col span={12} style={{ textAlign: 'end' }}>
            <Button shape="round" style={{ ...secondaryButtonStyle, width: '150px' }} onClick={() => setAddModelOpen(true)}>
              <strong>+ {t('add')}</strong>
            </Button>
            <Button
              icon={<DownloadOutlined style={{ marginRight: '4px' }} />}
              type="text"
              shape="round"
              style={{ ...buttonStyle, width: '150px', marginLeft: '4px' }}
              onClick={() => onExportToCSV()}
            >
              <strong>{t('export csv')}</strong>
            </Button>
          </Col>
        </Row>
        {/*<Row>
          <Col>
            <Input.Search style={inputStyle} allowClear placeholder={t('search').toString()} />
          </Col>
          <Col>
            <DatePicker.RangePicker style={inputStyle} />
          </Col>
          <Col></Col>
  </Row>*/}
        <UsersTable
          total={total as number}
          onDelete={onDeleteUser}
          onSelectUser={user => {
            setSelectedUser(user);
            setUpdateModalOpen(true);
          }}
          isLoading={fetchUsersQuery.isLoading || deleteUserMutation.isLoading || addUserMutation.isLoading || updateUserMutation.isLoading}
          users={users}
          current={current}
          setCurrent={setCurrent}
        />
      </Col>
    </Row>
  );
}
