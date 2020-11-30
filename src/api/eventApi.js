import axios from '@/common/axios';
export function getEventListApi1(data) {
    return axios.get('/rest/tWebInformation/list1', {
        params: data
    });
}
export function getEventListApi2(data) {
    return axios.get('/rest/tWebInformation/list2', {
        params: data
    });
}
export function getEventListApi3(data) {
    return axios.get('/rest/tWebInformation/list3', {
        params: data
    });
}
export function getFoundingEventListApi(data) {
    return axios.get('/rest/tWebInformation/compontList', {
        params: data
    });
}
export function getEventDetailListApi(data) {
    return axios.get('/rest/tWebInformation/getDetailList', {
        params: data
    });
}
export function saveEquipmentInfoApi(data) {
    return axios.get('/rest/tWebInformation/deviceSub', {
        params: data
    });
}
export function getEventDetailApi(data) {
    return axios.get('/rest/tWebInformation/getdetail', {
        params: data
    });
}
export function getEquipmentDetailApi(data) {
    return axios.get('/rest/tWebInformation/getinfodetail', {
        params: data
    });
}
export function getCompleteEventDetailApi(data) {
    return axios.get('/rest/tWebInformation/getdetail', {
        params: data
    });
}
export function saveEventRateApi(data) {
    return axios.get('/rest/tWebInformation/evaluate', {
        params: data
    });
}

export function getCompUserListApi(data) {
    return axios.get('/rest/tWebInformation/getCompList', {
        params: data
    });
}
export function getUserListApi(data) {
    return axios.get('/rest/tWebInformation/getPersonList', {
        params: data
    });
}
export function getBuildingListApi(data) {
    return axios.get('/rest/tWebInformation/getBuildingList', {
        params: data
    });
}
export function getFloorListApi(data) {
    return axios.get('/rest/tWebInformation/getFloorList', {
        params: data
    });
}
export function getTypeListApi(data) {
    return axios.get('/rest/tWebInformation/getTypeList', {
        params: data
    });
}
export function getDinfoListApi(data) {
    return axios.get('/rest/tWebInformation/getDinfoList', {
        params: data
    });
}
export function getEventNum(data) {
    return axios.get('/rest/tWebInformation/checkNum', {
        params: data
    });
}
export function saveEventApi(data) {
    return axios.post('/rest/tWebInformation/deviceChickSub', data);
}
// export function uploadFileApi(data) {
//   return request({
//     method: 'POST',
//     url: '/public/rest/img/upload',
//     headers: { 'Content-Type': 'multipart/form-data' },
//     data,
//   });
// }