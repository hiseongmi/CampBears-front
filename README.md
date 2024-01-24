# [2022 ccit camp-bears]
## 📝배경 및 필요성
<img src="https://github.com/hisungmi/CampBears-front/assets/104122239/187f2002-6da4-4e17-b2aa-dcf2abf219b4" width="300" height="200"/>
<img src="https://github.com/hisungmi/CampBears-front/assets/104122239/f6e01d2b-874e-4c63-8482-6e708f15025c" width="300" height="200"/>

팬데믹이 장기화됨에 따라 가까운 사람들과 시간을 보내는 캠핑의 소요가 상당히 증가하였다. 최근에는 팬데믹이 해소되고 있음에도 소요는 오히려 더욱 많이 증폭되어 인기있는 취미로 주목받고 있다. 하지만 관련 서비스나 플랫폼, 커뮤니티 등은 빠르게 증가하는 관심도를 따라가지 못하였고, 이 때문에 새로 관심을 가지는 사람들은 정보 검색이나 조사 및 준비에 시간을 불필요하게 많이 할애하고 있다. 또한, 캠핑이라는 취미 자체가 다른 취미에 비해 이용 빈도가 높지 않다. 주 1회도 정말 많이 즐기는 하드한 캠퍼들이나 가능할 정도로 시간도 예산도 투자를 많이 해야 하므로 보통은 월 1~2회로 매우 적은 편이다. 자연스럽게 장비들도 유휴 기간이 상당히 긴 편이다. 장비를 일정 수준 이상 갖춰야 즐길 수 있는 취미이므로 접근성도 매우 열악한 상황이다. 따라서 위와 같은 문제점들을 해소하는데 도움을 줄 수 있는 종합 캠핑 플랫폼을 구상하게 되었다.

## 👓기존 시장 문제점 및 해결 방법
<img src="https://github.com/hisungmi/CampBears-front/assets/104122239/7956b9b7-6818-4848-8ef0-d96599d42b68" width="500" height="300"/>

- 파편화 되어있는 서비스와 기능 -> 기존 플랫폼들이 제공하는 기능들과 서비스를 하나로 통합
- 특정 디바이스만 최적화 -> 여러 디바이스 환경을 지원하는 반응형 처리
- 비교 및 분석이 어렵거나 불편 -> 사용자 경험 중심 기능

## ✍️상세기능 명세 다이어그램
![image](https://github.com/hisungmi/CampBears-front/assets/104122239/5c27b6b1-6e0b-4c12-9414-3732581a10b1)

## 🌟기대효과
- 신규 캠퍼에게 유용할 수 있는 기본적인 문화와 정보 제공
- 기존 캠퍼를 위한 캠핑 특화 커뮤니티 제공
- 모든 캠퍼를 위한 중고거래 환경과 캠핑장 정보, 비교 제공


## 📲커뮤니티
#### 특정 수요층을 노린 SNS형 커뮤니티 
<img src="https://github.com/hisungmi/CampBears-front/assets/104122239/231cc6bc-110d-4d41-94b9-31e256fe3c07" width="350" height="400"/>
<img src="https://github.com/hisungmi/CampBears-front/assets/104122239/3d29ae1e-35ab-46e8-af44-ca55bc17cbda" width="350" height="400"/>

사용자들이 직접 게시글을 올리고, 서로의 글을 구경할 수 있는 페이지. 커뮤니티를 통해 사용자들은 같은 관심사를 가진 사람들끼리 캠핑을 즐기는 일상을 공유하고 서로의 글을 확인함으로써 정보 공유 및 문화 구성에 도움을 줄 수 있는 기대 효과를 가짐.

## 💸중고거래
#### 공통 관심사를 가진 사람들끼리 빠른 거래 
<img src="https://github.com/hisungmi/CampBears-front/assets/104122239/eee8cda5-3da0-4202-b5f1-5e5de713c374" width="350" height="400"/>

사용하지 않거나 교체하기 위해 장비들을 판매하는 게시글을 올릴 수 있는 페이지. 중고거래를 통해 고가의 장비를 보다 저렴하게 구할 수 있고, 같은 관심사를 가진 사람들이 판매하기 때문에 거래 안정성을 가지고, 판매 시간을 단축함으로써 안전성을 높이고 시간을 절약할 수 있는 기대 효과를 가짐.

## 👀캠핑장 정보 비교
#### 캠핑장 및 숙박 시설의 정보 제공과 비교
<img src="https://github.com/hisungmi/CampBears-front/assets/104122239/560e4ce8-c41b-44db-8c3d-b5674d60da19" width="450" height="400"/>
<img src="https://github.com/hisungmi/CampBears-front/assets/104122239/04a2416a-957d-45eb-9c38-0cc0342ca269" width="450" height="400"/>

정부 산하 기관인 고캠핑의 오픈 API를 이용하여 국내에 있는 대부분의 캠핑장의 정보를 조회할 수 있는 페이지. 오픈 API로 얻는 데이터들을 전처리해서 두 캠핑장을 골라서 비교. 해당 페이지에서 연결되는 상세 페이지에서는 카카오맵 API를 이용하여 위치 정보를 시각화 하여 제공.

## 🔍개발 언어
##### FRONT
![js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![js](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![js](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![js](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
##### BACK
![js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![js](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![js](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![js](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## 🎥실행 영상
[![Video Label](http://img.youtube.com/vi/mqA32roGzFk/0.jpg)](https://youtu.be/mqA32roGzFk)




