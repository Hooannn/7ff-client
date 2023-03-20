import axios from '../../libs/axios';
import { useMutation } from 'react-query';
import { onError } from '../../utils/error-handlers';
export default () => {
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
