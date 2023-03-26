import { Row, Col, Input, DatePicker, Button, Select } from 'antd';
import { useEffect, useState } from 'react';
import { getI18n, useTranslation } from 'react-i18next';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import localeUS from 'antd/es/date-picker/locale/en_US';
import localeVN from 'antd/es/date-picker/locale/vi_VN';
interface SortAndFilterProps {
  onChange: (params: SortAndFilterChangeParams) => void;
  onSearch: () => void;
  onReset: () => void;
}

interface SortAndFilterChangeParams {
  searchString: string;
  sort: string;
  role: string;
  range: string[] | any[] | undefined;
}

export default function SortAndFilter({ onChange, onSearch, onReset }: SortAndFilterProps) {
  const { t } = useTranslation();
  const [searchString, setSearchString] = useState<string>('');
  const [sort, setSort] = useState<string>('-createdAt');
  const [role, setRole] = useState<string>('All');
  const [rangePickerDate, setRangePickerDate] = useState<any[]>([]);
  const [range, setRange] = useState<string[] | any[]>();
  const i18n = getI18n();

  const onCalendarChange: RangePickerProps<Dayjs>['onCalendarChange'] = values => {
    setRangePickerDate(values as any);
    setRange(values?.map(value => value?.toISOString()));
  };

  const onInternalReset = () => {
    setSearchString('');
    setSort('-createdAt');
    setRole('All');
    setRangePickerDate([]);
    onReset();
  };

  useEffect(() => {
    onChange({ searchString, sort, role, range });
  }, [searchString, sort, role, range]);

  return (
    <Row style={{ padding: '12px 0' }} align="middle">
      <Col span={18}>
        <Row gutter={12}>
          <Col>
            <div>{t('search by email')}</div>
            <Input
              value={searchString}
              size="large"
              allowClear
              placeholder={t('search').toString()}
              onChange={e => setSearchString(e.target.value)}
            />
          </Col>
          <Col>
            <div>{t('search by creation date')}</div>
            <DatePicker.RangePicker
              locale={i18n.resolvedLanguage === 'vi' ? localeVN : localeUS}
              value={rangePickerDate as any}
              size="large"
              onCalendarChange={onCalendarChange}
            />
          </Col>
          <Col>
            <div>{t('search by role')}</div>
            <Select value={role} size="large" defaultValue="All" style={{ width: '150px' }} onChange={value => setRole(value)}>
              <Select.Option value="All">{t('all')}</Select.Option>
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="User">User</Select.Option>
            </Select>
          </Col>
          <Col>
            <div>{t('sort by order')}</div>
            <Select value={sort} size="large" defaultValue="createdAt" style={{ width: '150px' }} onChange={value => setSort(value)}>
              <Select.Option value="-createdAt">
                <SortDescendingOutlined />
                {t('created at')}
              </Select.Option>
              <Select.Option value="createdAt">
                <SortAscendingOutlined />
                {t('created at')}
              </Select.Option>
              <Select.Option value="-updatedAt">
                <SortDescendingOutlined />
                {t('updated at')}
              </Select.Option>
              <Select.Option value="updatedAt">
                <SortAscendingOutlined />
                {t('updated at')}
              </Select.Option>
            </Select>
          </Col>
        </Row>
      </Col>

      <Col span={6} style={{ textAlign: 'end' }}>
        <Button type="primary" size="large" shape="round" onClick={onSearch} style={{ marginRight: '4px', width: '120px' }}>
          {t('search')}
        </Button>
        <Button size="large" shape="round" onClick={onInternalReset} style={{ width: '120px' }}>
          {t('reset')}
        </Button>
      </Col>
    </Row>
  );
}
