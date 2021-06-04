#### react-native-task-by-young

영과 함께 하는 RN 모의고사

### quick start

`yarn install`

`yarn react-native run-ios`

pod version

`1.10.1`

#### 구조

```
src
 ┣ components
 ┃ ┣ FavoritePostLists.js
 ┃ ┣ PostLists.js
 ┃ ┗ index.js
 ┣ constants
 ┃ ┗ config.js
 ┣ libs
 ┃ ┗ getHash.js
 ┣ navigations
 ┃ ┣ BottomTabNavigator.js
 ┃ ┗ StackNavigator.js // bottomTabNavigator가 screen으로 있음
 ┣ screens
 ┃ ┣ FavoriteScreen.js
 ┃ ┣ HomeScreen.js
 ┃ ┗ index.js
 ┣ store
 ┃ ┣ index.js
 ┃ ┗ postsReducer.js // middleware + reducer + AsyncStorage
 ┗ utils
 ┃ ┗ Network.js
 App.js
index.js
```

#### 주요 기능

### YOUNG 리뷰 이후 (06.04)

- 디렉토리 구조 변화 -> component 하나로 즐겨찾기/포스트 둘 다 리스트 렌더
- limit/offset으로 서버통신
- 최적화 최대한 노력...
- 변수명 일부 변경
- 즐겨찾기 추가 시 리렌더링은 Loading 분기를 잘못해서 된 거였음!

### infinite scroll

- PostLists 컴포넌트가 렌더되면 postsReducer에서 middleware로 'users', 'posts', 'albums', 'photos'에 해당하는 데이터를 받아서 reducer에서 가공
- reducer state에 전체 데이터와 pagigate 데이터 따로 저장
- 스크린 하단에 닿으면 dispatch로 pagigate 데이터 가져옴

### 즐겨찾기 추가

- reducer로 관리
- 즐겨찾기 추가 시 PostLists에 문구 변경(추가 -> 추가되었습니다.)를 위해서 hashList 따로 만듦

### AsyncStorage

- reducer 파일에서 관리


