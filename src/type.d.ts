/**
 * @description
 * 我们使用一个json文件来模拟数据库，来存储自定义数据。
 * @description
 * We need set a json file(info.json) at host service for mocking database, to store custom data.
 */
type InfoJson = {
  images: Record<string, ImageItem[]>
}

type BaseItem = {
  /** 文件名 */
  /** file name */
  name: string
  /** 文件id, 用于删除 */
  /** for delete */
  id: string
  /** 时间前缀，用于根据时间分类 */
  /** time prefix, for belonging */
  timePrefix: string
}

type ImageItem = BaseItem & {
  /** 类型 */
  /** type */
  type: 'image'
  /** 图片比例 */
  /** image ratio */
  ratio: number
  /** 原始大小 */
  /** origin size */
  originSize: string
  /** 图片加载时显示的颜色 */
  /** the color for showing when image is not loaded */
  color: string
}

/**
 * @description 一个文件对象, 目前只包含图片类型
 * @description A file object, temporary only has image type
 */
type Item = ImageItem

/**
 * @description 一个服务类, 用于实现个平台通用接口
 * @description A service class, for implementing platform-independent interface
 */
interface Service {
  /**
   * @description 服务名称
   * @description Service name
   */
  readonly name: string
  /**
   * @description 设置服务
   * @description Setup service
   */
  setup: () => void
  /**
   * @description 加载信息
   * @description Load info
   */
  loadInfo: () => Promise<InfoJson | undefined>
  /**
   * @description 更新信息
   * @description Update info
   */
  updateInfo: (info: InfoJson) => Promise<void>
  /**
   * @description 创建一个item
   * @description Create a item
   */
  createBaseItem: (name: string) => BaseItem
  /**
   * @description 获取item的url
   * @description Get item url
   */
  getItemUrl: (id: string) => string
  /**
   * @description 添加一个item
   * @description Add a item
   */
  uploadFile: (name: string, id: string, file: File) => Promise<void>
  /**
   * @description 删除一个item
   * @description Remove a item
   */
  removeFile: (id: string) => Promise<void>
}
