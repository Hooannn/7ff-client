import { useQuery } from 'react-query';
import { onError } from '../../utils/error-handlers';
import useAxiosIns from '../../hooks/useAxiosIns';
import { useState } from 'react';
import dayjs from '../../libs/dayjs';
import type { IStatistics, IResponseData } from '../../types';

interface StatisticsResponse {
  [key: string]: IStatistics;
}
export default () => {
  const [from, setFrom] = useState(dayjs().startOf('day').valueOf());
  const [to, setTo] = useState(dayjs().valueOf());
  const axios = useAxiosIns();
  const getStatisticsQuery = useQuery({
    queryKey: ['statistics', from, to],
    queryFn: () => axios.get<IResponseData<StatisticsResponse>>(`/statistics?from=${from}&to=${to}`),
    onError: onError,
    select: res => res.data.data,
  });

  return { getStatisticsQuery, setFrom, setTo };
};
