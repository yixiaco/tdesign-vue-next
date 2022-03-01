import { TdUploadProps, UploadFile } from './type';

import {
  XhrOptions,
  InnerProgressContext,
  HTMLInputEvent,
  FlowRemoveContext,
  UploadRemoveOptions,
  SuccessContext,
} from '../_common/js/upload/types';

export type UploadProps = TdUploadProps;
export * from './type';

export type {
  XhrOptions,
  HTMLInputEvent,
  InnerProgressContext,
  SuccessContext,
  UploadRemoveOptions,
  FlowRemoveContext,
};

export interface UploadCtxType {
  loadingFile: UploadFile;
  toUploadFiles: UploadFile[];
  errorMsg: string;
}
