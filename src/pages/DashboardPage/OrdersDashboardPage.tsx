import { Col, Row, Button } from 'antd';
import { useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { buttonStyle, secondaryButtonStyle } from '../../assets/styles/globalStyle';
import OrdersTable from '../../components/dashboard/orders/OrdersTable';
import { IOrder } from '../../types';
import useOrders from '../../services/orders';
import { exportToCSV } from '../../utils/export-csv';
import UpdateOrderModal from '../../components/dashboard/orders/UpdateOrderModal';
import SortAndFilter from '../../components/dashboard/orders/SortAndFilter';
export default function UsersDashboardPage() {
  // TODO: Search, filter, pagination
  const {
    fetchOrdersQuery,
    orders,
    total,
    deleteOrderMutation,
    updateOrderMutation,
    current,
    setCurrent,
    buildQuery,
    onFilterSearch,
    searchOrdersQuery,
    onResetFilterSearch,
  } = useOrders({ enabledFetchOrders: true });
  const [shouldAddModalOpen, setAddModelOpen] = useState(false);
  const [shouldUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const { t } = useTranslation();

  const onUpdateOrder = (values: IOrder) => {
    updateOrderMutation.mutateAsync({ orderId: selectedOrder?._id as string, data: values }).finally(() => setUpdateModalOpen(false));
  };
  const onDeleteVoucher = (orderId: string) => {
    deleteOrderMutation.mutate(orderId);
  };

  const onExportToCSV = () => exportToCSV(orders, `7FF_Orders_${Date.now()}`);

  return (
    <Row>
      {/*<UpdateOrderModal
        isLoading={updateVoucherMutation.isLoading}
        onSubmit={onUpdateVoucher}
        voucher={selectedVoucher}
        shouldOpen={shouldUpdateModalOpen}
        onCancel={() => setUpdateModalOpen(false)}
      />
      <AddOrderModal
        onSubmit={onAddVoucher}
        isLoading={addVoucherMutation.isLoading}
        shouldOpen={shouldAddModalOpen}
        onCancel={() => setAddModelOpen(false)}
  />*/}

      <Col span={24}>
        <Row align="middle">
          <Col span={12}>
            <h2>{t('orders')}</h2>
          </Col>
          <Col span={12}>
            <Row align="middle" justify="end" gutter={8}>
              <Col span={5}>
                <SortAndFilter onChange={buildQuery} onSearch={onFilterSearch} onReset={onResetFilterSearch} />
              </Col>
              {/*<Col span={5}>
                <Button block shape="round" style={{ ...secondaryButtonStyle }} onClick={() => setAddModelOpen(true)}>
                  <strong>+ {t('add')}</strong>
                </Button>
  </Col>*/}
              <Col span={5}>
                <Button
                  block
                  icon={<DownloadOutlined style={{ marginRight: '4px' }} />}
                  type="text"
                  shape="round"
                  style={buttonStyle}
                  onClick={() => onExportToCSV()}
                >
                  <strong>{t('export csv')}</strong>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <OrdersTable
          total={total as number}
          onDelete={onDeleteVoucher}
          onSelectOrder={order => {
            setSelectedOrder(order);
            setUpdateModalOpen(true);
          }}
          isLoading={searchOrdersQuery.isFetching || fetchOrdersQuery.isFetching || deleteOrderMutation.isLoading || updateOrderMutation.isLoading}
          orders={orders}
          current={current}
          setCurrent={setCurrent}
        />
      </Col>
    </Row>
  );
}
