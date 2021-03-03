import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 通过字典 Code 查询字典项
export function findGridByPid(pid) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sysou/page`,
    method: 'POST',
    data: {
      // 默认扬州市
      parentouguid: pid || '215dac58-3ceb-4802-b8f5-291ec706f086'
    }
  })
}
