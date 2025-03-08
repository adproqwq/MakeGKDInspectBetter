import { z } from 'zod';

const inspectSettings = z.object({
  autoUploadImport: z.boolean(),
  ignoreUploadWarn: z.boolean(),
  ignoreWasmWarn: z.boolean(),
  maxShowNodeSize: z.number(),
});
export type IInspectSettings = z.infer<typeof inspectSettings>;

export default inspectSettings;
