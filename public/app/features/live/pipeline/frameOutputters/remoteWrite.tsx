import { RemoteWriteOutputConfig } from '../models.gen';
import { PipelineConfigKind, PipelineFrameOutputterItem } from '../types';

export const remoteWrite: PipelineFrameOutputterItem<RemoteWriteOutputConfig> = {
  kind: PipelineConfigKind.FrameOutputter,
  id: 'remoteWrite',
  description: 'Write to prometheus',
  name: 'Remote Write',
  builder: (builder, context) => {
    // builder.addCustomEditor
    console.log('ADD ITEMS!!');
  },
  //viewer: () => <div>JSON AUTO viewer</div>,
};