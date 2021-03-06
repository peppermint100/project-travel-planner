#Travel Planner

### 사용 기술
JAVA, Spring Boot, Spring Security, jwt, JPA, MySQL

### 프로젝트 기간
2020. 12 ~ 2021. 02

### 협업 방식
- Github로 버전관리
- 주 1~2회 DisCord 를 이용한 음성 대화 회의
- Notion을 이용해 기록 및 정보 전달

---

### 프로젝트 상세

- Travel Planner는 이용자의 여행 계획을 스마트폰을 이용하여 간편하게 할 수 있도록 도와주는 어플리케이션 입니다.
저는 Spring Boot를 이용한 restful api를 만들었습니다.


- Spring Security, jwt를 사용하여 보안을 적용하였습니다.


- 프로젝트에서 만든 api는 아래와 같습니다.
  

- 기능
    - 회원
        - 회원 가입
        - 회원 정보 수정
        - 비밀 번호 찾기 ( 본 프로젝트는 이메일 == 아이디 인데 입력한 이메일로 임시 비밀번호를 보내줍니다. )
    
    - 계획
        - 계획 생성
        - 전체 계획 조회
        - 계획 공유하기
        - 공유받은 계획 조회
      
    - 디테일
        - 디테일 생성
        - 디테일 수정
        - 디테일 삭제
        - 전체 디테일 조회
        - 단일 디테일 조회
    

- 프로젝트 흐름
  
    - 회원 가입과 로그인을 합니다. 
    
    - 로그인을 하면 메인 화면으로 들어가 지며 ***계획***을 생성할 수 있습니다.   
    
    - 하나의 계획은 수많은 ***디테일***을 가지며 계획을 구성하게 됩니다.    
    
    - ***디테일***을 입력하면 디테일에 입력한 날짜와 시간을 통해 디테일이 정렬되어 알맞은 순서대로 계획을 확인할 수 있습니다.    
    
    - ***디테일*** ***교통***(Transportation), ***숙박***(Accommodation), ***활동***(Activity) 세가지의 분류를 가지며 각각에 맞는 입력을 받습니다.   
    
    - ***교통***은 교통 수단, 출발시간, 도착시간, 출발지, 도착지 등을 입력하여 이동에 대한 계획을 입력합니다.   
    
    - ***숙박***은 숙소 위치, 체크인 시간, 체크아웃 시간 등을 입력하여 숙소에 대한 계획을 입력합니다.   
    
    - ***활동***은 활동명, 준비물 등을 입력하여 이번 여행에 가볼만한 여행지 혹은 활동에 대한 계획을 입력합니다.   
    
    - 자신의 플랜을 다른사람에게 공유하고 싶다면 메인 화면에서 프로젝트의 ***공유하기*** 버튼을 누른 뒤 공유하고 싶은 사람의 email(id)를 입력하여 공유 할 수 있습니다.   
    
---

### 프로젝트 후기

친구들과 함께하여 만들어본 프로젝트는 처음이었지만 배우게된 점이 많았습니다. github을 이용한 버전관리도 배우게 되었으며, JPA의 @Inheritance를 이용한 상속 테이블을 다루어 본 경험도 생겼습니다.
그리고 REST API를 만들며 백엔드와 프론트 엔드와의 협업에서 소통에 대한 중요성도 배웠습니다.

그러나 가장 크게 배우고 느낀 점은 기획에 대한 중요성 이었습니다. 다 같이 회의를 통해 주제를 선정하였고, 기획을 진행하였지만 어느정도 깊이 까지 구상을 해야할지 알지 못하였고 얕은 상태의 기획을 가지고 프로젝트를 진행 하게 되었습니다.
그렇게 진행되면서 빈번하게 기획의 오류가 생기기 시작했고 백엔드에도 프론트에도, 디자인에도 새로 추가할 점 또는 삭제해야 할 부분들이 생기게 되었고, 회의가 필요한 부분이 많아졌습니다.
결국은 프로젝트 중반 쯤에 기획에 대한 중요성을 깨닫고 회의를 통해 남은 부분에 관한 회의를 확실히 다지게 되었고, 남은 부분은 그나마 수월하게 작업이 진행 됨을 느끼게 되었습니다.

프로젝트를 마무리 하며 기획에 조금이라도 더 많은 시간을 들여 꼼꼼하게 구상을 했다면 더 빠르게 그리고 더 좋은 어플리케이션을 만들 수 있었을 텐데 하는 아쉬움이 있었지만 그 점을 배우게 된 것에 감사하며 프로젝트를 마무리 하게 되었습니다.  
