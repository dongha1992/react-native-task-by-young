# Hello~!

안녕하세요, 테일러~! Young입니다!  
다른 과제들로 바쁘실텐데 수고많으셨어요 :D  
  
공유해 주신 과제 내용 잘 보았어요!  
RN 시작하신지 얼마 안되셨다고 들었던 거 같은데 무척이나 자연스럽게 잘 사용하고 계시네요!  
역시 챌출은 다릅니다 ^^..  

Redux 사용에 능숙하신 점과 별도의 Network 인터페이스를 만드신 점 인상 깊었어요 :)  
local에 저장하는 데이터를 hashing 하신 점도 보안에 대한 관심으로 느껴져서 좋게 보였습니다.  

아래에 적어둔 이슈들은 가능한 큰 범주에서 꼭 전달해 드리고 싶은 내용만을 골라 보았어요.  
아마도 걔 중 일부는 테일러께서 이미 충분히 알고 계시고 실천하고 계시지만 시간의 부족으로 넘어가신 부분도 있으실 거라 생각합니다.  
그러니 혹여 아쉽게 반영하지 못한 내용에 대해 제가 지적한 셈이 되었더라도 크게 괘념치 마시고 한 번 슥 읽어 보고 넘어가 주시면 감사하겠습니다.  

오늘도 다른 과제들로 바쁘시다고 얘기하셨는데 분명 마음에 드는 회사에 금방 퐉 합격해서 들어가실 겁니다!  
그리고 그 과정에 이번 모의 과제와 오늘의 제 리뷰가 조금이나마 보탬이 되길 바라봅니다!  

리뷰에 대해 궁금하신 점은 언제든 편하게 물어봐 주세요.  
다시 한 번 수고하셨습니다.  

\- 2020. 05.25. Young 드림

---


## Issue

### 1. 즐겨찾기 추가 시 전체 스크린 리렌더링 문제 (중요)

- As-is: 즐겨찾기 추가하기를 눌렀을 때 스크린이 리렌더링 되면서 스크롤 포지션이 최상단으로 이동하는 문제
- To-be: 즐겨찾기 추가하기를 눌러도 리렌더링 없이 작동하도록 처리 필요

### 2. 이름짓기 (Context를 충분히 알려주지 못하는 변수명, 함수명)

- As-is: 변수명, 함수명이 해당 변수에 담긴 내용 또는 해당 함수의 작업 내용을 충분히 전달해 주지 못함  
협업에 부적합하다고 오해 받을 가능성이 있음  
ex.) `setData()`
- To-be: 변수와 함수가 사용되는 맥락을 충분히 설명해 주는 이름짓기 필요.  
ex.) `saveFavoritePostIdsInLocalStorage()`


### 3. DRY (Don't repeat yourself)

- As-is: 별도의 Component로 묶어낼 수 있는 View가 복수의 파일에 복사/붙여넣기로 사용되고 있음  
ex.) PostListItem에 해당하는 요소가 `PostLists`와 `FavoritePostLists`에서 거의 유사하게 반복해서 적혀있음
- To-be: `PostListItem` 컴포넌트를 만들어서 상황에 맡게 조금씩 변형해서 사용하는 걸로!


### 4. Over-Fetching

- As-is: fetcherData가 너무 많은 데이터를 로딩함.  
  인피니티 스크롤링의 여러 목적 중 하나는 적절량의 네트워크 리소스를 사용하기 위함임.  
  최초 렌더링 시에는 적정한 데이터만을 fetching 하고 이후에 필요시마다 필요한 만큼만 추가로 fetching 하는 것.
  현재 fetchData시에 users는 10개, posts는 100개, albums는 100개, photos는 5000개의 데이터를 가져오고 있음.
- To-be: 각각 필요한만큼만 또는 적당히 넉넉한 양만큼만 그때 그때 호출해 가져와서 사용하는 걸로!


---

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

### infinite scroll

- PostLists 컴포넌트가 렌더되면 postsReducer에서 middleware로 'users', 'posts', 'albums', 'photos'에 해당하는 데이터를 받아서 reducer에서 가공
- reducer state에 전체 데이터와 pagigate 데이터 따로 저장
- 스크린 하단에 닿으면 dispatch로 pagigate 데이터 가져옴

### 즐겨찾기 추가

- reducer로 관리
- 즐겨찾기 추가 시 PostLists에 문구 변경(추가 -> 추가되었습니다.)를 위해서 hashList 따로 만듦

### AsyncStorage

- reducer 파일에서 관리
