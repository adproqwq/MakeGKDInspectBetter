import { z } from 'zod';

export const IntegerZod = z.number().int();

export const RawCategoryZod = z.object({
  /**
   * 当前分类在列表中的唯一标识
   *
   * 也是客户端禁用/启用此分类组的依据
   */
  key: IntegerZod,

  /**
   * 分类名称
   *
   * 同时也是分类的依据, 捕获以 name 开头的所有应用规则组, 不捕获全局规则组
   *
   * 示例: `开屏广告` 将捕获 `开屏广告-1` `开屏广告-2` `开屏广告-233` 这类应用规则组
   */
  name: z.string(),

  /**
   * null => 跟随捕获的规则组的 enable 的默认值
   *
   * true => 全部启用捕获的规则组
   *
   * false => 全部禁用捕获的规则组
   *
   * @default null
   */
  enable: z.boolean().optional(),
});
