import { FC } from 'react';
import { Button, DatePicker, Form, Input, Modal, Result, Select } from 'antd';
import { getI18n, useTranslation } from 'react-i18next';
import { buttonStyle, containerStyle, inputStyle } from '../assets/styles/globalStyle';
import dayjs from 'dayjs';
import useReservation from '../services/reservation';
import '../assets/styles/components/BookingTable.css';
import localeUS from 'antd/es/date-picker/locale/en_US';
import localeVN from 'antd/es/date-picker/locale/vi_VN';

const BookingTable: FC = () => {
  const { t } = useTranslation();
  const language = getI18n().resolvedLanguage;
  const { bookReservationMutation } = useReservation();
  const numberOfGuestOptions = (min: number, max: number) => {
    const options = [];
    for (let i = min; i <= max; i++) {
      options.push({ value: i, label: i });
    }
    return options;
  };

  const onFinish = (values: any) => {
    const reservation = {
      underName: values.name,
      contacts: {
        phone: values.phoneNumber,
        email: values.email,
      },
      bookingTime: values.bookingTime.valueOf(),
      attrs: {
        guests: values.noOfGuests,
      },
    };
    return bookReservationMutation.mutateAsync(reservation).then(res => {
      Modal.confirm({
        content: (
          <Result
            style={{ width: '368px' }}
            status="success"
            title={res.data.message}
            subTitle={t('thanks {{name}} booking {{time}}', {
              name: res.data?.data?.underName,
              time: dayjs(new Date(parseInt(res.data?.data?.bookingTime as string))).format('HH:mm DD-MM-YYYY'),
            })}
          />
        ),
        icon: null,
        okText: t('confirm'),
        bodyStyle: { width: '368px' },
        okCancel: false,
        okButtonProps: {
          shape: 'round',
          type: 'primary',
          style: { ...buttonStyle, width: '100px', marginLeft: '12px' },
        },
      });
    });
  };

  return (
    <section className="booking-table">
      <div className="container" style={containerStyle}>
        <h2 className="heading">{t('booking a table')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 30 }}>
          <div className="booking-form-container">
            <Form layout="vertical" validateTrigger="onSubmit" onFinish={onFinish}>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: t('required').toString() },
                  { whitespace: true, message: t('required').toString() },
                ]}
              >
                <Input size="large" spellCheck={false} placeholder={t('your name...').toString()} style={inputStyle} />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                rules={[
                  { required: true, message: t('required').toString() },
                  {
                    pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                    message: t('invalid phone number').toString(),
                  },
                ]}
              >
                <Input size="large" placeholder={t('phone number...').toString()} style={inputStyle} />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: t('please enter your email').toString() },
                  { whitespace: true, message: t('please enter your email').toString() },
                  { type: 'email', message: t('invalid email address').toString() },
                ]}
              >
                <Input size="large" spellCheck={false} placeholder="Email..." style={inputStyle} />
              </Form.Item>
              <Form.Item name="noOfGuests" rules={[{ required: true, message: t('please choose number of guests').toString() }]}>
                <Select
                  size="large"
                  placeholder={t('number of guests...')}
                  bordered={true}
                  options={numberOfGuestOptions(1, 10)}
                  className="number-of-guests"
                />
              </Form.Item>
              <Form.Item name="bookingTime" rules={[{ required: true, message: t('please choose the booking date').toString() }]}>
                <DatePicker
                  locale={language === 'vi' ? localeVN : localeUS}
                  picker="date"
                  placeholder={t('date/month/year hour:minute').toString()}
                  className="date-picker"
                  showTime={{ format: 'HH:mm' }}
                  format="DD/MM/YYYY HH:mm"
                  disabledDate={current => current && current < dayjs().endOf('day')}
                  disabledTime={() => ({
                    disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 23],
                  })}
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  loading={bookReservationMutation.isLoading}
                  size="large"
                  shape="round"
                  type="primary"
                  htmlType="submit"
                  className="book-now-btn"
                >
                  {t('book now')}
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="map-container">
            <div style={{ height: '100%', background: '#FFBE33' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d979.4379703726116!2d106.60081657554642!3d10.906451778935992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1680434015663!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: '0' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingTable;
