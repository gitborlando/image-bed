/**
 * @description
 * 我们使用一个json文件来模拟数据库，来存储自定义数据。
 * @description
 * We need set a json file(info.json) at host service for mocking database, to store custom data.
 */
type InfoJson = {
  images: Record<string, ImageObject[]>
}

type ImageObject = {
  /** 文件名 */
  /** file name */
  name: string
  /** 文件id, 用于删除 */
  /** for delete */
  id: string
  /** 图片比例 */
  /** image ratio */
  ratio: number
  /** 原始大小 */
  /** origin size */
  originSize: number
  /** 图片加载时显示的颜色 */
  /** the color for showing when image is not loaded */
  color: string
  /** 时间戳，用于排序 */
  /** timestamp, for sorting */
  timestamp: number
}

/**
 * @description
 * 一个文件对象, 目前只包含图片类型
 * @description
 * A file object, temporary only has image type
 */
type Item = ImageObject

/**
 * @description
 * 一个服务类, 用于实现个平台通用接口
 * @description
 * A service class, for implementing platform-independent interface
 */
interface Service {
  /**
   * @description
   * 设置服务
   * @description
   * Setup service
   */
  setup: () => void
  /**
   * @description
   * 加载信息
   * @description
   * Load info
   */
  loadInfo: () => Promise<InfoJson | undefined>
  /**
   * @description
   * 添加文件
   * @description
   * Add file
   */
  addItem: (item: Item) => Promise<Item>
  /**
   * @description
   * 删除文件
   * @description
   * Remove file
   */
  removeItem: (item: Item) => Promise<Item>
}
