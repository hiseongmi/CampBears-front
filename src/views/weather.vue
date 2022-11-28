<script>
import router from "../router/index.js";
import {onMounted, ref} from "vue";

export default {
  name: "weather",
  components: {},

  setup() {
// ///연결에 필요
//     const isShow = ref(true);
//     const back = () => {
//       isShow.value = !isShow.value;
//     };
//     const goToX = v => {
//       v ? router.push(v) : window.alert("준비중입니다.");
//     };
// /// 날씨 api
//     const getJson = function (url, callback) {
//       const xhr = new XMLHttpRequest();
//       xhr.open('get', url, true);
//       xhr.responseType = 'json';
//       xhr.onload = function () {
//         //접속이 성공적이면 널값 반환, 그외에는 status값 반환
//         const status = xhr.status;
//         if (status === 200) {
//           callback(null, xhr.response);
//         } else {
//           callback(status, xhr.response);
//         }
//       };
//       xhr.send('');
//     };
//     getJson('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst')

    var xhr = new XMLHttpRequest();
    var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'IEdTGqhPUIxJy5mLBtkjPw6g%2BaTd90KXgnnc03HRNuD2NUPhtSQ307ZhzYx3n51j%2FpjYn5Hteigqp1cro1Rg6w%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('XML'); /**/
    queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent('20210628'); /**/
    queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent('0500'); /**/
    queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('55'); /**/
    queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('127'); /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        alert('Status: ' + this.status + 'nHeaders: ' + JSON.stringify(this.getAllResponseHeaders()) + 'nBody: ' + this.responseText);
      }
      console.log(this.responseText)
    };

    xhr.send('');
    return {
      // back,
      // goToX,

    };
  },
};
</script>

<template>
  <div> {{ this.responseText }}</div>
</template>
