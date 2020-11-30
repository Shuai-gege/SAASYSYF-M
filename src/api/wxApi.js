import axios from '@/common/axios';
export function WXConfigApi(data) {
    return axios.post('/rest/wxserver/getWxSignature', data);
}
// http://114.55.93.250:8281/rest/wxserver/getWxSignature?url=