import { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Tooltip, Carousel } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { containerStyle } from '../../assets/styles/globalStyle';

const CUSTOMER_FEEDBACKS = [
  {
    author: 'Võ Kiều Thiên Ân',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    postingDate: '14/03/2023',
    authorImg:
      'https://images.unsplash.com/photo-1614104301615-9467f637be75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHZpZXRuYW1lc2UlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
  },
  {
    author: 'Trần Thị Thu Thảo',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    postingDate: '07/02/2023',
    authorImg:
      'https://images.unsplash.com/photo-1670167872812-c4f4de6db44f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dmlldG5hbWVzZSUyMGFvJTIwZGFpfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
  },
  {
    author: 'Nguyễn Trần Như Ý',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    postingDate: '23/01/2023',
    authorImg:
      'https://images.unsplash.com/photo-1673194493752-22444ca69f81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHZpZXRuYW1lc2UlMjBhbyUyMGRhaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60',
  },
  {
    author: 'Phạm Ngọc Yến Nhi',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    postingDate: '21/11/2022',
    authorImg:
      'https://images.unsplash.com/photo-1613899804101-4ef0823fa55c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dmlldG5hbWVzZSUyMGdpcmx8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60',
  },
];

const Feedback: FC = () => {
  const { t } = useTranslation();
  const carouselRef = useRef<CarouselRef>(null);

  return (
    <section className="feedback">
      <div className="container" style={containerStyle}>
        <h2 className="heading">{t('what our customers say')}</h2>
        <Carousel autoplay dots={false} slidesToShow={2} ref={carouselRef}>
          {CUSTOMER_FEEDBACKS.map(feedback => (
            <div className="item" key={feedback.author}>
              <div className="feedback-content">
                <p>{feedback.content}</p>
                <h6 className="author-name">{feedback.author}</h6>
                <span className="feedback-date">{feedback.postingDate}</span>
              </div>
              <div className="feedback-author">
                <img src={feedback.authorImg} />
              </div>
            </div>
          ))}
        </Carousel>
        <div className="btns">
          <Tooltip title={t('prev feedback')} placement="bottom">
            <Button type="primary" shape="circle" size="large" icon={<LeftOutlined />} onClick={() => carouselRef.current?.prev()} />
          </Tooltip>
          <Tooltip title={t('next feedback')} placement="bottom">
            <Button type="primary" shape="circle" size="large" icon={<RightOutlined />} onClick={() => carouselRef.current?.next()} />
          </Tooltip>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
