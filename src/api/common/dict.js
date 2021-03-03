import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 通过字典 Code 查询字典项
export function findDicsByCode(code) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/dictDetail/selectList`,
    method: 'POST',
    data: {
      dictValue: code,
      rowVersion: ''
    }
  })
}

// 一些自定义字典项
export const YES_OR_NO_OPTS = [{
  value: '1',
  label: '是'
}, {
  value: '0',
  label: '否'
}]

// 启用状态字典项
export const ENABLE_OPTS = [{
  value: '1',
  label: '启用'
}, {
  value: '0',
  label: '停用'
}]

// 启用状态字典项
export const DEMO = [{
  value: '1',
  label: '选项1'
}, {
  value: '2',
  label: '选项2'
}]

export const FCODE_ENUM = {
  YES_OR_NO_OPTS: 'YES_OR_NO_OPTS',
  ENABLE_OPTS: 'ENABLE_OPTS',
  DEMO: 'DEMO'
}
