import React from 'react';
import dynamic from 'next/dynamic';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { isEditorState } from '@/utils/is';
import { EditorState } from 'braft-editor';
import { RawDraftContentState } from 'draft-js';
import * as API from '@/api/article.api';
import { message as Message } from 'antd';
import { debounce } from '@/utils';

const BraftEditor = dynamic(() => import('@/components/braftEditor'), {
  ssr: false,
});

interface EditorViewProps {
  initRaw: string;
}

/**
 * 编辑页面
 */
const EditorView: NextPage<EditorViewProps> = (props) => {
  const { initRaw } = props;
  const router = useRouter();
  const id = router.query.id as string;
  /**
   * 同步到远程
   */
  const handleStateUpdate = debounce((editorState: EditorState) => {
    (async () => {
      console.log(editorState);
      if (isEditorState(editorState)) {
        const raw = editorState.toRAW(true) as RawDraftContentState;
        const html = editorState.toHTML();
        const [, data] = await API.updateDraft({
          id,
          title: raw.blocks[0]?.text || '',
          raw: JSON.stringify(raw),
          html,
        });
        if (data.status === 'success') {
          console.log('保存成功');
        } else {
          Message.error('服务器错误');
        }
      }
    })();
  }, 3 * 1000);
  return <BraftEditor onStateUpdate={handleStateUpdate} initRaw={initRaw} />;
};

/**
 * 服务端获取数据
 * @param ctx
 */
export const getServerSideProps: GetServerSideProps<EditorViewProps> = async (
  ctx
) => {
  const id = ctx.query.id as string;
  const cookie = ctx.req.headers.cookie;
  const [, data] = await API.getDraft(id, cookie);
  let initRaw = '';
  if (data.status === 'success') {
    initRaw = data.data.raw;
  }
  return {
    props: {
      initRaw,
    },
  };
};

export default EditorView;
