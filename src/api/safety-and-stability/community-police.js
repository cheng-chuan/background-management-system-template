import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

export function getList(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sqmyjqxxb/page`,
    method: 'post',
    data: data
  })
}
// 新增社情民意
export function sqmyjqxxb(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sqmyjqxxb/`,
    method: 'post',
    data: data
  })
}
//
export function putsqmyjqxxb(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sqmyjqxxb/`,
    method: 'put',
    data: data
  })
}
export function deletesqmyjqxxb(id) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/sqmyjqxxb/?xxzjbh=` + id,
    method: 'DELETE'
  })
}
