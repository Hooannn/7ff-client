import { FC } from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { containerStyle, inputStyle } from '../assets/styles/globalStyle';
import dayjs from 'dayjs';
import '../assets/styles/components/BookingTable.css';
import localeUS from 'antd/es/date-picker/locale/en_US';
import localeVN from 'antd/es/date-picker/locale/vi_VN';

const BookingTable: FC = () => {
  const { t } = useTranslation();
  const language = 'vi'; //Get current language from i18

  return (
    <section className="booking-table">
      <div className="container" style={containerStyle}>
        <h2 className="heading">{t('booking a table')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 30 }}>
          <div className="booking-form-container">
            <Form layout="vertical" validateTrigger="onSubmit">
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
                  //   Validate sdt
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
                <div className="select-wrapper">
                  <Select size="large" placeholder={t('number of guests...')} bordered={false}></Select>
                </div>
              </Form.Item>
              <Form.Item name="bookingDate" rules={[{ required: true, message: t('please choose the booking date').toString() }]}>
                <DatePicker
                  locale={language === 'vi' ? localeVN : localeUS}
                  picker="date"
                  placeholder={t('date/month/year hour:minute').toString()}
                  className="date-picker"
                  showTime={{ format: 'HH:mm' }}
                  format="date/month/year hour:minute"
                  disabledDate={current => current && current < dayjs().endOf('day')}
                  disabledTime={() => ({
                    disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 23],
                  })}
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button size="large" shape="round" type="primary" htmlType="submit" className="book-now-btn">
                  {t('book now')}
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="map-container">
            <div style={{ height: '100%', background: '#FFBE33' }}>GG MAP</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingTable;
