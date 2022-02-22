import { defineComponent, PropType, computed } from 'vue';

// components
import { AddIcon, DeleteIcon, BrowseIcon } from 'tdesign-icons-vue-next';
import TLoading from '../loading';

import CLASSNAMES from '../utils/classnames';
import { UploadFile } from './type';
import props from './props';
import { UploadRemoveOptions } from './interface';
import { UPLOAD_NAME } from './util';
import { prefix } from '../config';

// hooks
import { useFormDisabled } from '../form/hooks';

const ImageProps = {
  showUploadProgress: props.showUploadProgress,
  files: props.files,
  multiple: props.multiple,
  max: props.max,
  trigger: {
    type: Function as PropType<(e: MouseEvent) => void>,
  },
  disabled: Boolean,
  onRemove: {
    type: Function as PropType<(options: UploadRemoveOptions) => void>,
  },
  onImgPreview: {
    type: Function as PropType<(options: MouseEvent, file: UploadFile) => void>,
  },
  loadingFile: {
    type: Object as PropType<UploadFile>,
  },
};

export default defineComponent({
  name: 'TImageUpload',

  props: ImageProps,

  setup(props) {
    const disabled = useFormDisabled();
    const showTrigger = computed(() => {
      const { multiple, max, files } = props;
      if (multiple) {
        return !max || (files && files.length < max);
      }
      return !(files && files[0]);
    });

    const onMaskClick = (e: MouseEvent) => {
      !showTrigger.value && props.trigger(e);
    };

    const onViewClick = (e: MouseEvent, file?: UploadFile) => {
      e.stopPropagation();
      props.onImgPreview(e, file);
    };

    const onRemoveClick = (e: MouseEvent, index: number, file?: UploadFile) => {
      e.stopPropagation();
      props.onRemove({ e, file, index });
    };

    return {
      onMaskClick,
      showTrigger,
      disabled,
      onViewClick,
      onRemoveClick,
    };
  },

  render() {
    return (
      <ul class={`${UPLOAD_NAME}__card`}>
        {this.files &&
          this.files.map((file, index) => (
            <li class={`${UPLOAD_NAME}__card-item ${prefix}-is--background`}>
              <div class={`${UPLOAD_NAME}__card-content ${UPLOAD_NAME}__card-box`}>
                <img class={`${UPLOAD_NAME}__card-image`} src={file.url} />
                <div class={`${UPLOAD_NAME}__card-mask`} onClick={this.onMaskClick}>
                  <span class={`${UPLOAD_NAME}__card-mask-item`}>
                    <BrowseIcon onClick={({ e }: { e: MouseEvent }) => this.onViewClick(e, file)} />
                  </span>
                  {!this.disabled && [
                    <span class={`${UPLOAD_NAME}__card-mask-item-divider`} key="divider"></span>,
                    <span class={`${UPLOAD_NAME}__card-mask-item`} key="delete-icon">
                      <DeleteIcon onClick={({ e }: { e: MouseEvent }) => this.onRemoveClick(e, index, file)} />
                    </span>,
                  ]}
                </div>
              </div>
            </li>
          ))}
        {this.showTrigger && (
          <li
            class={[
              `${UPLOAD_NAME}__card-item ${prefix}-is--background`,
              { [CLASSNAMES.STATUS.disabled]: this.disabled },
            ]}
            onClick={this.trigger}
          >
            {this.showUploadProgress && this.loadingFile && (this.loadingFile as UploadFile).status === 'progress' ? (
              <div class={`${UPLOAD_NAME}__card-container ${UPLOAD_NAME}__card-box`}>
                <TLoading />
                <p>上传中 {Math.min((this.loadingFile as UploadFile).percent, 99)}%</p>
              </div>
            ) : (
              <div class={`${UPLOAD_NAME}__card-container ${UPLOAD_NAME}__card-box`}>
                <AddIcon />
                <p class={`${prefix}-size-s`}>点击上传图片</p>
              </div>
            )}
          </li>
        )}
      </ul>
    );
  },
});
