import { computed } from 'vue';
import { prefix } from '../config';
import { TdUploadProps } from './type';

export const useComponentsStatus = (props: TdUploadProps, ctx: any) => {
  // 完全自定义上传
  const showCustomDisplay = computed(() => {
    return props.theme === 'custom';
  });

  // 单文件非拖拽类文件上传
  const showSingleDisplay = computed(() => {
    return !props.draggable && ['file', 'file-input'].includes(props.theme);
  });

  // 单文件非拖拽勒图片上传
  const showImgCard = computed(() => {
    return !props.draggable && props.theme === 'image';
  });

  // 拖拽类单文件或图片上传
  const singleDraggable = computed(() => {
    return !props.multiple && props.draggable && ['file', 'file-input', 'image'].includes(props.theme);
  });

  const showUploadList = computed(() => {
    return props.multiple && ['file-flow', 'image-flow'].includes(props.theme);
  });

  // 拖拽类单文件或图片上传
  const showImgDialog = computed(() => {
    return ['image', 'image-flow', 'custom'].includes(props.theme);
  });

  // 默认文件上传风格：文件进行上传和上传成功后不显示 tips
  const showTips = computed(() => {
    if (props.theme === 'file') {
      const hasNoFile = (!props.files || !props.files.length) && !ctx.loadingFile;
      return props.tips && hasNoFile;
    }
    return Boolean(props.tips);
  });

  const showErrorMsg = () => {
    return !showUploadList.value && !!ctx.errorMsg;
  };

  return {
    showCustomDisplay,
    showSingleDisplay,
    showImgCard,
    singleDraggable,
    showUploadList,
    showImgDialog,
    showTips,
    showErrorMsg,
  };
};

export const useComponentsClass = () => {
  const tipsClasses = computed(() => {
    return [`${name}__tips ${prefix}-size-s`];
  });

  const errorClasses = computed(() => {
    return tipsClasses.value.concat(`${name}__tips-error`);
  });

  return {
    tipsClasses,
    errorClasses,
  };
};
