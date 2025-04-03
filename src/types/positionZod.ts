import { z } from 'zod';

export const PositionZod = z.object({
  /**
   * 距离目标节点左边的距离
   *
   * 方向: 边 -> 节点中心, 负数表示反方向(也可点击节点外部区域)
   *
   * 支持两种值类型, 字符串和数字, 数字等价于相同内容的字符串, 如 2.5 等价于 '2.5'
   *
   * 字符串类型支持来自快照属性面板上的 left/top/right/bottom/width/height/random 的数学计算表达式
   *
   * 其中 random 是 0-1 的随机数, 需要注意 random 在单个表达式中是单个固定值, 即表达式 'random-random'=0
   *
   * @example
   * 2.5 // ✅
   * '2.5' // ✅
   * '2.5 + 1 - 2 * 3 / 4 ^ 5 % 6' // ✅
   * '(right + left) / 2' // ✅
   */
  left: z.optional(z.string().or(z.number())),

  /**
   * 距离目标节点上边的距离
   */
  top: z.optional(z.string().or(z.number())),

  /**
   * 距离目标节点右边的距离
   */
  right: z.optional(z.string().or(z.number())),

  /**
   * 距离目标节点下边的距离
   */
  bottom: z.optional(z.string().or(z.number())),
});
