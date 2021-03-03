import request from '@/utils/request'
import { API_MODULE } from '@/api/const'

// 地址逆编码
export function lnglat2Address(lng, lat) {
  return request({
    url: `${API_MODULE.ADDRESS_ENGINE}/nominatim/reverse.php`,
    method: 'POST',
    params: {
      lon: lng,
      lat: lat,
      format: 'geojson',
      addressdetails: '1'
    }
  })
}

// 地址正编码
export function address2Lnglat(address) {
  return request({
    url: `${API_MODULE.ADDRESS_ENGINE}/nominatim/search.php`,
    method: 'POST',
    params: {
      q: address,
      polygon_geojson: '1',
      format: 'geojson'
    }
  })
}

