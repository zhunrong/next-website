import React, { useCallback, useState, memo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { isEditorState } from '@/utils/is';
import { EditorState } from 'braft-editor';
import { RawDraftContentState } from 'draft-js';
import * as API from '@/api/article.api';
import { message as Message } from 'antd';
import { debounce } from '@/utils';
import style from './index.module.scss';
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getUserState } from '@/services/common/serverSide';
import PageLayout from '@/components/pageLayout/pageLayout';

const BraftEditor = memo(
  dynamic(() => import('@/components/braftEditor'), {
    ssr: false,
  })
);

interface EditorViewProps {
  initRaw: string;
  updateTime: string;
  status: 'success' | 'error';
}

/**
 * 编辑页面
 */
const EditorView: NextPage<EditorViewProps> = (props) => {
  const { initRaw, updateTime: _updateTime, status } = props;
  const [loading, setLoading] = useState(false);
  const [updateTime, setUpdateTime] = useState(_updateTime);
  const router = useRouter();
  const id = router.query.id as string;
  useEffect(() => {
    if (status !== 'success') {
      router.replace('/');
    }
  });
  /**
   * 保存草稿
   */
  const saveDraft = useCallback(
    debounce((editorState: EditorState) => {
      (async () => {
        if (isEditorState(editorState)) {
          const raw = editorState.toRAW(true) as RawDraftContentState;
          const html = editorState.toHTML();
          const [err, data] = await API.updateDraft({
            id,
            title: raw.blocks[0]?.text || '',
            raw: JSON.stringify(raw),
            html,
          });
          setLoading(false);
          if (!err && data.status === 'success') {
            const updateTime = dayjs(new Date()).format('HH:mm');
            setUpdateTime(updateTime);
          } else {
            Message.error('服务器错误');
          }
        }
      })();
    }, 2 * 1000),
    []
  );
  /**
   * 处理state更新
   * @param state
   */
  const handleStateUpdate = (state: EditorState) => {
    setLoading(true);
    saveDraft(state);
  };
  if (status !== 'success') return null;
  return (
    <PageLayout className={style['editor-view']} docTitle="文章编辑">
      <div className="editor-view-header shadow">
        <div className="editor-view-header-inner">
          {loading ? (
            <div className="status">
              <LoadingOutlined />
              <span className="status-text">正在保存</span>
            </div>
          ) : (
            <div className="status">
              <CheckCircleOutlined />
              <span className="status-text">最近保存：{updateTime}</span>
            </div>
          )}
        </div>
      </div>
      <div className="editor-view-body">
        <BraftEditor onStateUpdate={handleStateUpdate} initRaw={initRaw} />
      </div>
    </PageLayout>
  );
};

/**
 * 服务端获取数据
 * @param ctx
 */
export const getServerSideProps: GetServerSideProps<EditorViewProps> = async (
  ctx
) => {
  const id = ctx.query.id as string;
  const cookie = ctx.req.headers.cookie || '';
  const [[, data], state] = await Promise.all([
    API.getDraft(id, cookie),
    getUserState(ctx),
  ]);
  let initRaw = '';
  let updateTime = '';
  const status = data.status;
  if (status === 'success') {
    initRaw = data.data.raw;
    updateTime = dayjs(data.data.updateAt).format('YYYY-MM-DD HH:mm');
  }
  return {
    props: {
      initRaw,
      updateTime,
      status,
      initialState: state,
    },
  };
};

export default EditorView;
