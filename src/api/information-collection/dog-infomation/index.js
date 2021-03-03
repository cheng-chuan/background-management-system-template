import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

export function getList(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/yqxxb/page`,
    method: 'post',
    data: data
  })
}
// 新增
export function sqmyjqxxb(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/yqxxb/`,
    method: 'post',
    data: data
  })
}
// 修改
export function putsqmyjqxxb(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/yqxxb/`,
    method: 'put',
    data: data
  })
}
// 删除
export function deletesqmyjqxxb(id) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/yqxxb/?id=` + id,
    method: 'DELETE'
  })
}
