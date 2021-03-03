import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

export function getList(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/mdjfpchjxxb/page`,
    method: 'post',
    data: data
  })
}
// 新增
export function sqmyjqxxb(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/mdjfpchjxxb/`,
    method: 'post',
    data: data
  })
}
// 修改
export function putsqmyjqxxb(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/mdjfpchjxxb/`,
    method: 'put',
    data: data
  })
}
// 删除
export function deletesqmyjqxxb(id) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/mdjfpchjxxb/?xxzjbh=` + id,
    method: 'DELETE'
  })
}
//
export function selectsqmyjqxxb(id) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/mdjfpchjxxb/?xxzjbh=` + id,
    method: 'GET'
  })
}
