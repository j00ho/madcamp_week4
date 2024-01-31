[madcamp_week4_client code](https://github.com/chanee718/Week04_client)
# 🎧 MSG 소개

---

![1](https://github.com/j00ho/madcamp_week4_server/assets/62568191/eec5deca-c512-4529-83e3-d8b78cf2825d)

<aside>   
  
### 🎧 **Music Space Gallery, MSG**   
  
장르별로 내가 좋아하는 **나만의 음악 갤러리**를 구축할 수 있는 웹페이지입니다. 
유저는 **큐브**라는 개인적인 공간 안에서 카메라로 각 면을 비추며 장르별 음악을 탐색, 재생, 저장할 수 있습니다.

</aside>

### ☝️ Keyword 1 : Space (Cube)

> ***“음율이 내 주위를 감싸는 경험, 한번쯤 느껴보셨죠? ”***
> 

좋아하는 음악에 심취하다 보면, 음율이 내 주위를 감싸는 느낌을 받을 때가 있습니다.
저희는 __“음악에 둘러싸인 공간”__ 이라는 키워드에 착안하여 공간을 큐브로 표현하였습니다.
듣고 싶은 음악의 장르를 탐색하는 것을 큐브 안에서 각 면에 조명을 비추는 UI로 구현했으며,
장르마다 조명 색을 달리해 시각적 효과를 더했습니다. 

### ✌️ Keyword 2 : Gallery

> ***“사진 갤러리는 있는데 왜 음악 갤러리는 없죠?”***
> 

사진이나 그림 전시회는 많은데, 왜 음악 전시회는 없을까요? 음악은 사운드가 겹쳐 한 공간에서 듣기 어렵기 때문입니다. 하지만 온라인으로는 가능하죠. 그런데 이런 의문이 듭니다.

 ‘유튜브, 사운드클라우드와 뭐가 다르지?’  

그 답은 바로 큐브를 활용해 **공간적인 감각**을 더했다는 것입니다. 큐브를 회전하며 장르 선택을 하는 것은 마치 오프라인 전시회의 각 섹터로 이동하는 느낌을 줍니다.

내가 좋아하는 영상을 올리기도 하고, 다른 유저가 공유한 영상을 보기도 하며 장르별로 관심사가 비슷한 유저끼리 커뮤니티를 형성하길 기대합니다.

# 💻 프로젝트 기능

---

## 메인페이지

<aside>
🎧 메인페이지는 큐브의 메인 면으로, 상하좌우로 움직이며 장르별 페이지로 이동합니다

</aside>

💡 **본인 프로필 수정**이 가능합니다. 

![메인페이지1](https://github.com/j00ho/madcamp_week4_server/assets/62568191/9f20b877-8eb4-49fd-bf02-e3faa5483606)

- 이름, 아이디 수정 가능
- One-liner에 한줄소개 입력, 프로필 이미지 등록 가능
    - 구현
        
        `multer` 미들웨어를 이용해 이미지를 업로드하고 서버 내 폴더에 저장
        
        `@react-three/drei` 의 `Html`을 이용해 3D 상에서의 기능 구현
        

![메인페이지2](https://github.com/j00ho/madcamp_week4_server/assets/62568191/205bc113-7bdb-404d-b7a1-4cb31081200c)

💡 자신이 좋아하는, 혹은 공유하고픈 음악 영상을 **업로드**할 수 있습니다.

- 유저는 select video 버튼을 눌러 로컬에 저장돼있는 영상을 선택할 수 있습니다.
- title과 artist를 입력하고 장르를 선택한 뒤 **upload video**를 누르면 영상이 업로드됩니다.
    - 구현
        
        `multer`를 이용해 파일명을 생성 시간으로 고유하게 설정하고, 서버 내 폴더에 저장
        
        `/uploadVideo` post 요청 시 파일명을 이용해 고유한 url을 생성하여 DB에 저장
        

![메인페이지3](https://github.com/j00ho/madcamp_week4_server/assets/62568191/0186f9ea-823a-4df2-ae73-4972f113882f)

💡 영상 업로드 시 **썸네일**이 생성되어 로드됩니다.

- 구현
    
    `ffmpeg`를 이용해 1초 뒤 화면을 스크린샷하여 썸네일을 생성
    
    영상 업로드 성공 시 `thumbnailPath`를 클라이언트에게 json 형식으로 전송
    
    썸네일의 목록은 가로로 나열, width 제한을 넘어갈 시 스크롤 가능
    

## 회원가입 및 로그인 페이지

<aside>
🎧 MSG에 처음 접속하는 유저는 회원가입 후 로그인을 하게 됩니다.

</aside>

![로그인1](https://github.com/j00ho/madcamp_week4_server/assets/62568191/a1020abd-6ed5-4e7b-a2b8-166e4c7137bc)

![로그인2](https://github.com/j00ho/madcamp_week4_server/assets/62568191/da1a8543-5533-45ec-98aa-0a024909b3a9)

- 자체 회원가입을 구현했으며 이름(fisrt name, last name), 아이디, 비밀번호를 입력받습니다.
- 이메일과 비밀번호를 이용하여 로그인을 할 수 있습니다.
- 토큰을 저장하여 사용자가 **자동 로그인**을 체크할 경우 로그인 상태가 유지됩니다.
    - 구현
        
        `sessionStorage`를 이용해 새로고침 시에도 로그인 상태 유지
        
        `localStorage`를 이용해 브라우저를 껐다 켜도 로그인 상태 유지 
        

## 장르별 페이지

<aside>
🎧 장르별 페이지에서는 유저들이 업로드한 영상들을 장르별로 모두 확인할 수 있습니다.

- 메인 페이지를 제외한 큐브의 다섯 면에 **5개의 장르**를 설정해두었습니다.
    - **Band, Guitar, Drum, Bass, Keyboard**
- 마우스 클릭 또는 키보드 방향키를 눌러 페이지 간 이동이 가능합니다.
- 장르 페이지 별로 각 장르를 연상시키는 색깔의 조명을 구현하였습니다.
</aside>

### 메인페이지 → 장르 페이지 이동

https://github.com/j00ho/madcamp_week4_server/assets/62568191/6d4bfbc4-910e-451d-8312-6abf0a205cd6

<aside>
👆 메인페이지(My Workspace)에서 스페이스바를 누르면 반대편 면인 장르 페이지로 이동합니다.

- 구현
    
    각 면을 바라보는 cameraSet을 사전에 정의
    
    스페이스바나 화살표, 키보드 방향키를 누르면 camera를 전환
    
    카메라 전환 시 `lerp`를 사용해 자연스러운 전환 구현
    
</aside>

### 장르 페이지 화면

- 밴드
    
    ![장르페이지_밴드](https://github.com/j00ho/madcamp_week4_server/assets/62568191/c99e7327-0e78-4084-bfa5-98815bd0932b)
    
    <aside>
    📷 밴드 페이지에는 합주의 느낌을 구현하기 위해 알록달록한 조명을 주었습니다.
    
    </aside>
    
- 기타
    
    ![장르페이지_기타](https://github.com/j00ho/madcamp_week4_server/assets/62568191/97d462b5-a707-4afb-917e-453fe8a5cfb5)
    
    <aside>
    📷 기타 페이지에는 적갈색 조명을 주었습니다.
    
    </aside>
    
- 드럼
    
    ![장르페이지_드럼](https://github.com/j00ho/madcamp_week4_server/assets/62568191/f82d68d2-a79d-4e33-8d52-5e09017fecee)
    
    <aside>
    📷 드럼 페이지에는 금색 조명을 주었습니다.
    
    </aside>
    
- 베이스
    
    ![장르페이지_베이스](https://github.com/j00ho/madcamp_week4_server/assets/62568191/4c8feb64-bf2d-48e8-8a92-59259cb9eb50)
    
    <aside>
    📷 베이스 페이지에는 푸른색 조명을 주었습니다.
    
    </aside>
    
- 키보드
    
    ![장르페이지_키보드](https://github.com/j00ho/madcamp_week4_server/assets/62568191/bdad164e-6812-4569-b57a-b94e0d414b68)
    
    <aside>
    📷 키보드 페이지에는 초록색 조명을 주었습니다.
    
    </aside>
    

### 페이지 내 이동

https://github.com/j00ho/madcamp_week4_server/assets/62568191/e558da5b-67a9-409d-b8b0-da625ce6432f

<aside>
👆 탭의 사이드를 클릭하여 다음 영상들을 확인할 수 있습니다.

- 구현
    
    `R3F의 useSpring, animated`를 이용해 클릭하면 커졌다가 축소되는 애니메이션 적용
    
    현재 바라보는 면과 매칭되는 장르의 영상들을 가져와, 랜덤으로 전환
    
</aside>

https://github.com/j00ho/madcamp_week4_server/assets/62568191/d4a62724-d0e1-4880-b413-b328b9016f52

<aside>
👆 영상이 끝나면 다음 영상으로 자동 전환됩니다.

</aside>

### 페이지 간 이동

https://github.com/j00ho/madcamp_week4_server/assets/62568191/015f5451-8a1d-43eb-a875-e3fee4e69025

https://github.com/j00ho/madcamp_week4_server/assets/62568191/248c36fd-a689-4010-8ce5-14c3ed19f9ff

<aside>
👆 키보드 방향키를 눌러 다른 페이지(장르)로 넘어갈 수 있습니다.

</aside>

https://github.com/j00ho/madcamp_week4_server/assets/62568191/24c03647-7a2e-4bb5-8fb6-c9b43f033915

<aside>
👆 마우스 커서를 화살표에 호버링하면 어느 페이지로 이동 가능한지 알 수 있습니다.

- 구현
    
    현재 바라보는 면에 따라 상하좌우 면에 어떤 장르의 면이 있는지를 저장
    
    방향키나 화살표를 통해 이동할 수 없는 메인 페이지는 표시 X
    
</aside>

# 📝 프로젝요 개요

---

## 개발 팀원

> **황승찬** *(KAIST CS 22)*
> 
> - *FE & BE*
> 
> **송주호** *(KAIST MAS 19)*
> 
> - *Server & BE*

|![승찬](https://github.com/j00ho/madcamp_week4_server/assets/62568191/a7c2c6c6-fca2-48a6-899a-17f738fd725b)|![주호](https://github.com/j00ho/madcamp_week4_server/assets/62568191/f6a19bb2-e9bf-41c3-9fcf-fbdba6a334f6)|
|---|---|

## 개발 스택

> ***FE***
> 
> - *React, Typescript*
>     - *Three.JS*
> 
> ***BE***
> 
> - *Server: Node js*
> - *DB: MySQL*
>
