import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

export function getList(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/spypdw/page`,
    method: 'post',
    data: data
  })
}
// 新增食品单位
export function sqmyjqxxb(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/spypdw/`,
    method: 'post',
    data: data
  })
}
// 修改食品单位
export function putsqmyjqxxb(data) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/spypdw/`,
    method: 'put',
    data: data
  })
}
// 删除食品单位
export function deletesqmyjqxxb(id) {
  return request({
    url: `${API_MODULE.COMPREHENSIVE_GOVERN}/spypdw/?id=` + id,
    method: 'DELETE'
  })
}
// 查询所有下拉框
export function searchAllDropDownBox(data) {
  return request({
    url: `${API_MODULE.DROPBOX}/dictDetail/selectList`,
    method: 'post',
    // headers:{'Authorization':'Bearer d8db1aac81d5fc3e13b5d1d7285e895e'},
    data
  })
}
