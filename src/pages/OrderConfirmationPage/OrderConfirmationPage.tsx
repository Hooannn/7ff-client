import { Row, Col, Button, Result } from 'antd';
import { buttonStyle } from '../../assets/styles/globalStyle';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosIns from '../../hooks/useAxiosIns';
import { IOrder, IResponseData } from '../../types';
import Loading from '../../components/shared/Loading';
import { useTranslation } from 'react-i18next';

export default function OrderConfirmationPage() {
  const navigate = useNavigate();
  const axios = useAxiosIns();
  const { orderId } = useParams();
  const getOrderByIdQuery = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => axios.get<IResponseData<IOrder>>(`/orders/${orderId}`),
  });
  const order = getOrderByIdQuery.data?.data?.data;
  const { t } = useTranslation();
  return (
    <Row align="middle" justify="center" style={{ height: '100vh' }}>
      {getOrderByIdQuery.isLoading && <Loading />}
      {!getOrderByIdQuery.isLoading && (
        <Col>
          <Result
            status="success"
            title="Successfully Purchased Cloud Server ECS!"
            subTitle={`Order number: ${order?._id}`}
            extra={[
              <Button onClick={() => navigate('/profile/orders')} style={{ ...buttonStyle, width: '200px', margin: '0 4px' }} shape="round">
                <strong>{t('see your orders')}</strong>
              </Button>,
              <Button onClick={() => navigate('/menu')} style={{ ...buttonStyle, width: '200px', margin: '0 4px' }} type="primary" shape="round">
                <strong> {t('buy again')}</strong>
              </Button>,
            ]}
          />
        </Col>
      )}
    </Row>
  );
}
