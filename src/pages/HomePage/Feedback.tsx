import { FC } from 'react';
import { Button, Tooltip } from 'antd';
import { containerStyle } from '../../assets/styles/globalStyle';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const Feedback: FC = () => {
  const { t } = useTranslation();

  return (
    <section className="feedback">
      <div className="container" style={containerStyle}>
        <h2 className="heading">{t('what our customers say')}</h2>
        will be implement later using another library
        <div className="btns">
          <Tooltip title={t('prev feedback')} placement="bottom">
            <Button type="primary" shape="circle" size="large" icon={<LeftOutlined />} />
          </Tooltip>
          <Tooltip title={t('next feedback')} placement="bottom">
            <Button type="primary" shape="circle" size="large" icon={<RightOutlined />} />
          </Tooltip>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
