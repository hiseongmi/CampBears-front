<script>
import router from "../router/index.js";
import customInput from "../components/layout/customInput.vue";
import customButton from "../components/layout/customButton.vue";
import snsPage from "./snsPage.vue";
import myPage from "./myPage.vue";
import { apiClient } from "../utils/axios.js";
import { onMounted, ref } from "vue";
import CustomLoading from "../components/layout/customLoading.vue";
// import {e} from "../../dist/assets/index.a54a7291.js";
import HeaderPage from "../components/headerPage.vue";
import customSelect from "../components/layout/customSelect.vue";
import CustomDatePicker from "../components/layout/customDatePicker.vue";
import customPagination from "../components/layout/customPagination.vue";
import campingInfo from "./campingInfo.vue";

export default {
  name: "mainPage",
  components: {
    CustomDatePicker,
    customSelect,
    CustomLoading,
    customInput,
    customButton,
    snsPage,
    myPage,
    HeaderPage,
    customPagination,
    campingInfo
  },

  setup() {

    const tagList = [
      {
        name: "#목포",
        link: "http://localhost:3001/#/snsPage"
      },
      {
        name: "#애견",
        link: "http://localhost:3001/#/login"
      },
      {
        name: "#파주",
        link: "/snsPage"
      },
      {
        name: "#차박"
      },
      {
        name: "#노지"
      }
    ];
    const isShow = ref(true);
    const back = () => {
      isShow.value = !isShow.value;
    };

    const goToX = v => {
      v ? router.push(v) : window.alert("준비중입니다.");
    };
    const move = () => {
      window.location.href = "";
    };
    const moving = () => {
      window.location.href = "#";
    };
    // window.onload = function () {
    //   console.log("함수실행")
    //   document.getElementById("keyword").value = '중부대';
    //   initMap();
    // }
    const initMap = () => {
      // // if (window.kakao && window.kakao.maps) {
      // const container = document.getElementById("map");
      // const options = {
      //   center: new window.kakao.maps.LatLng(37.71173, 126.88878),
      //   level: 5,
      //   keyboardShortcuts: true,
      // };
      // const map = new window.kakao.maps.Map(container, options);
      // console.log(map);
      // const zoomControl = new kakao.maps.ZoomControl();
      // // 지도의 우측에 확대 축소 컨트롤을 추가한다
      // map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      //
      //
      // kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      //   console.log('지도에서 클릭한 위치의 좌표는 ' + mouseEvent.latLng.toString() + ' 입니다.');
      // });
      // 마커에 클릭 이벤트를 등록한다 (우클릭 : rightclick)
      // kakao.maps.event.addListener(marker, 'click', function () {
      //   alert('마커를 클릭했습니다!');
      // });
// 마커를 담을 배열입니다
      var markers = [];

      var mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
          level: 15 // 지도의 확대 레벨
        };

// 지도를 생성합니다
      var map = new kakao.maps.Map(mapContainer, mapOption);

      // 지도에 확대 축소 컨트롤을 생성한다
      var zoomControl = new kakao.maps.ZoomControl();
      // 지도의 우측에 확대 축소 컨트롤을 추가한다
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
// 장소 검색 객체를 생성합니다
      var ps = new kakao.maps.services.Places();

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });


// 키워드로 장소를 검색합니다

      const searchForm = document.getElementById("submit-btn");
      searchForm?.addEventListener("click", function(e) {
        e.preventDefault();
        searchPlaces();
        test();
      });


// 검색후 검색내용 초기화
      function test() {
        document.getElementById("keyword").value = "";
      }

      const first = () => {
        const keyword = document.getElementById("keyword").value = "캠핑장";
        // console.log(keyword);


        if (!keyword.replace(/^\s+|\s+$/g, "")) {
          alert("키워드를 입력해주세요!");
          return false;
        }

        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch(keyword, placesSearchCB);
        test();
      };

      first();

// 키워드 검색을 요청하는 함수입니다

      function searchPlaces() {

        const keyword = document.getElementById("keyword").value;
        // console.log(keyword);


        if (!keyword.replace(/^\s+|\s+$/g, "")) {
          alert("키워드를 입력해주세요!");
          return false;
        }

        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch(keyword, placesSearchCB);
      }

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {

          // 정상적으로 검색이 완료됐으면
          // 검색 목록과 마커를 표출합니다
          displayPlaces(data);

          // 페이지 번호를 표출합니다
          displayPagination(pagination);

        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

          alert("검색 결과가 존재하지 않습니다.");

          return;

        } else if (status === kakao.maps.services.Status.ERROR) {

          alert("검색 결과 중 오류가 발생했습니다.");

          return;

        }
      }

// 검색 결과 목록과 마커를 표출하는 함수입니다
      function displayPlaces(places) {

        var listEl = document.getElementById("placesList"),
          menuEl = document.getElementById("menu_wrap"),
          fragment = document.createDocumentFragment(),
          bounds = new kakao.maps.LatLngBounds(),
          listStr = "";

        // 검색 결과 목록에 추가된 항목들을 제거합니다
        removeAllChildNods(listEl);

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        for (let i = 0; i < places.length; i++) {

          // 마커를 생성하고 지도에 표시합니다
          var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i),
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          bounds.extend(placePosition);

          // 마커와 검색결과 항목에 mouseover 했을때
          // 해당 장소에 인포윈도우에 장소명을 표시합니다
          // mouseout 했을 때는 인포윈도우를 닫습니다
          (function(marker, title) {
            kakao.maps.event.addListener(marker, "mouseover", function() {
              displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, "mouseout", function() {
              infowindow.close();
            });

            itemEl.onmouseover = function() {
              displayInfowindow(marker, title);
            };

            itemEl.onmouseout = function() {
              infowindow.close();
            };
          })(marker, places[i].place_name);

          fragment.appendChild(itemEl);
        }

        // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
        listEl.appendChild(fragment);
        menuEl.scrollTop = 0;

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }

// 검색결과 항목을 Element로 반환하는 함수입니다
      function getListItem(index, places) {

        var el = document.createElement("li"),
          itemStr = "<span class=\"markerbg marker_" + (index + 1) + "\"></span>" +
            "<div class=\"info\">" +
            "   <h5>" + places.place_name + "</h5>";

        if (places.road_address_name) {
          itemStr += "    <span>" + places.road_address_name + "</span>" +
            "   <span class=\"jibun gray\">" + places.address_name + "</span>";
        } else {
          itemStr += "    <span>" + places.address_name + "</span>";
        }

        itemStr += "  <span class=\"tel\">" + places.phone + "</span>" +
          "</div>";

        el.innerHTML = itemStr;
        el.className = "item";

        return el;
      }

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
      function addMarker(position, idx, title) {
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.webp", // 마커 이미지 url, 스프라이트 이미지를 씁니다
          imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
          imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          },
          markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
          marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage
          });

        marker.setMap(map); // 지도 위에 마커를 표출합니다
        markers.push(marker);  // 배열에 생성된 마커를 추가합니다

        return marker;
      }

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
      function removeMarker() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers = [];
      }

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
      function displayPagination(pagination) {
        var paginationEl = document.getElementById("pagination"),
          fragment = document.createDocumentFragment(),
          i;

        // 기존에 추가된 페이지번호를 삭제합니다
        while (paginationEl.hasChildNodes()) {
          paginationEl.removeChild(paginationEl.lastChild);
        }

        for (i = 1; i <= pagination.last; i++) {
          var el = document.createElement("a");
          el.href = "#";
          el.innerHTML = i;

          if (i === pagination.current) {
            el.className = "on";
          } else {
            el.onclick = (function(i) {
              return function() {
                pagination.gotoPage(i);
              };
            })(i);
          }

          fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
      }

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
      function displayInfowindow(marker, title) {
        var content = "<div style=\"padding:5px;z-index:1;\">" + title + "</div>";

        infowindow.setContent(content);
        infowindow.open(map, marker);
      }

      // 검색결과 목록의 자식 Element를 제거하는 함수입니다
      function removeAllChildNods(el) {
        while (el.hasChildNodes()) {
          el.removeChild(el.lastChild);
        }
      }

    };
    onMounted(initMap);

    return {
      tagList,
      initMap,
      move,
      moving,
      goToX,
      back,
      isShow
    };
  }
};
</script>

<template>

  <!--  <script type="text/javascript"-->
  <!--          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=8cd7ea967a72d603b3fd12c735e76a49"></script>-->
  <!--  <div id="map" style="width:500px;height:400px;"></div>-->
  <div class="info-main">
    <header-page></header-page>
    <div class="info-sidebar" v-if="isShow">
      <a @click="back">>>></a>

      <!--      <custom-button placeholder="열려라" @click="back"></custom-button>-->
    </div>
    <div v-else class="info-side">
      <!--      <div class="info-name">-->
      <!--        <a href="">캠핑장 정보</a>-->
      <!--      </div>-->
      <!--      <div class="info-name">-->
      <!--        <a href="">캠핑장 정보</a>-->
      <!--      </div>-->
      <!--      <div class="info-name">-->
      <!--        <a href="">캠핑장 정보</a>-->
      <!--      </div>-->
      <!--      <div class="info-navi"></div>-->

      <span @click="back">X</span>
      <div class="info" href="#">
        <a href="#">캠핑장 정보</a>
      </div>
      <div class="info-dic">
        <a href="#">캠핑사전</a>
      </div>
      <div class="info-food">
        <a href="#">캠핑음식</a>
      </div>
    </div>
    <h1>멋진 여행을 기대하고 계신가요?</h1>
    <div class="info-serch">
      <custom-input placeholder="캠핑장 검색"></custom-input>
      <span>
        <img src="/assets/image/icon/search.webp" alt="" />
      </span>
    </div>

    <div class="info-box">
      <div class="info-shapbox" v-for="item in tagList">
        <a class="info-shap" :href="item.link">
          {{ item.name }}
        </a>
      </div>
    </div>

    <div class="info-mapbtn">
      <custom-button placeholder="지역별"></custom-button>
    </div>

    <div class="date-box">
      <div class="date-pic">
        <custom-date-picker ref="입실일 선택"></custom-date-picker>
      </div>
      <div class="date-pick">
        <custom-date-picker />
      </div>
    </div>
    <!--    지도-->
    <div class="map-box">
      <div class="map_wrap">
        <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;"></div>

        <div id="menu_wrap" class="bg_white">
          <div class="option">
            <div>
              <form onsubmit="searchPlaces(); return false;">
                키워드 : <input type="text" value="" id="keyword" size="15">
                <button id="submit-btn" type="submit">검색하기</button>
              </form>
            </div>
          </div>
          <hr>
          <ul id="placesList"></ul>
          <div id="pagination"></div>
        </div>
      </div>
    </div>
    <!--    <div id="map" style="width: 55%; height: 350px; margin: 0 auto; z-index: 0">지도</div>-->
  </div>

  <div class="info-select">
    <select name="count" data-title="인기순">
      <option value="0">인기순</option>
      <option value="1">시간순</option>
      <option value="2">가나다순</option>
      <option value="3">리뷰순</option>
    </select>
    <select name="count" data-title="필터">
      <option value="0">인원 ▼</option>
      <option value="1">`</option>
      <option value="2">`</option>
      <option value="3">`</option>
    </select>
    <select name="count" data-title="필터">
      <option value="0">가격</option>
      <option value="1">`</option>
      <option value="2">`</option>
      <option value="3">`</option>
    </select>
    <select name="count" data-title="필터">
      <option value="0">구비시설</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">2</option>
    </select>
  </div>
  <div class="info-camp">
    <div class="info-content">
      <campingInfo></campingInfo>
    </div>
  </div>
  <div class="info-pagination">
    <custom-pagination></custom-pagination>
  </div>
</template>
