import React, { FunctionComponent, useMemo } from 'react';
import { Upload, Avatar, message as Message } from 'antd';
import {
  RcCustomRequestOptions,
  UploadChangeParam,
} from 'antd/lib/upload/interface';
import { UserOutlined } from '@ant-design/icons';
import COS from 'cos-js-sdk-v5';
import * as API from '@/api';
import { useUser } from '@/services/hooks/hooks';
import { useDispatch } from 'react-redux';
import { createUpdateUser } from '@/store/action/action';

const AvatarSetting: FunctionComponent = () => {
  const user = useUser();
  const dispatch = useDispatch();
  const cos: any = useMemo(() => {
    return new COS({
      async getAuthorization(options: any, callback: any) {
        const [, res] = await API.getUploadToken();
        if (res.status === 'success') {
          const { credentials, startTime, expiredTime } = res.data;
          callback({
            TmpSecretId: credentials.tmpSecretId,
            TmpSecretKey: credentials.tmpSecretKey,
            XCosSecurityToken: credentials.sessionToken,
            StartTime: startTime,
            ExpiredTime: expiredTime,
          });
        }
      },
    });
  }, []);
  /**
   * 上传逻辑
   * @param options
   */
  const customRequest = (options: RcCustomRequestOptions) => {
    const file = options.file;
    const key = `/images/avatar/${Date.now()}_${file.name}`;
    cos.putObject(
      {
        Bucket: 'zr-1253381776',
        Region: 'ap-guangzhou',
        Key: key,
        Body: file,
        onProgress(data: any) {
          options.onProgress(
            {
              percent: data.percent * 100,
            },
            file
          );
        },
      },
      (err: any, data: any) => {
        if (err) return console.error(err);
        options.onSuccess(data, file);
      }
    );
  };
  /**
   * 上传状态监听
   * @param info
   */
  const handleChange = async (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      const [, res] = await API.updateUserInfo({
        avatar: `http://${info.file.response.Location}`,
      });
      if (res.status === 'success') {
        dispatch(createUpdateUser(res.data));
      } else {
        Message.error(res.message);
      }
    }
  };
  return (
    <Upload
      accept="image/*"
      customRequest={customRequest}
      onChange={handleChange}
    >
      <Avatar
        src={user.avatar}
        size={128}
        icon={<UserOutlined />}
        style={{ cursor: 'pointer' }}
      ></Avatar>
    </Upload>
  );
};

export default AvatarSetting;
