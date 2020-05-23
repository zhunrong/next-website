import { EditorState } from 'braft-editor'

export function isEditorState(value: any): value is EditorState {
  return !!(value && value.convertOptions)
}