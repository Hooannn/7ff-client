import { useMutation } from 'react-query';
import { onError } from '../../utils/error-handlers';
import useAxiosIns from '../../hooks/useAxiosIns';
export default () => {
  const axios = useAxiosIns();
  const uploadMutation = useMutation({
    mutationFn: ({ file, folder }: { file: File; folder: string }) => {
      const form = new FormData();
      form.append('file', file);
      return axios.postForm(`/files/upload/image/single?folder=${folder}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onError: onError,
  });

  return { uploadMutation };
};
