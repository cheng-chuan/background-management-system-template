import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 查询房屋详情
export function getHouseDetail(id) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/fwdjxxb/`,
    method: 'GET',
    params: { xxzjbh: id }
  })
}

// 分页查询
export function getPage(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/fwdjxxb/selectFwTx`,
    method: 'POST',
    data: data
  })
}
