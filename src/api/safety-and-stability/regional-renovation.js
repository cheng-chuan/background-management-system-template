import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

export function getList(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zddqpczzxxb/page`,
    method: 'post',
    data: data
  })
}
// 新增社情民意
export function sqmyjqxxb(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zddqpczzxxb/`,
    method: 'post',
    data: data
  })
}
// 更新数据
export function putsqmyjqxxb(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zddqpczzxxb/`,
    method: 'put',
    data: data
  })
}
export function deletesqmyjqxxb(id) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/zddqpczzxxb/?xxzjbh=` + id,
    method: 'DELETE'
  })
}
// 查询所有下拉框
export function searchAllDropDownBox(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/dictDetail/selectList`,
    method: 'post',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}
