# 📝 학습 게시판 프로젝트

## 📌 프로젝트 개요
학습 게시판은 부트캠프 학습자들이 학습 중 발생하는 **반복적이고 유사한 질문들을 해결**하고, 학습 효율을 극대화하기 위해 개발된 협력형 학습 플랫폼입니다. 실시간 질문 및 답변 기능을 제공하여, 강사와 학습자 간의 원활한 소통을 지원합니다.

## 🎯 프로젝트 목표
1. **학습 참여도 향상**: 학습자들이 매일 학습 내용`(TIL)`을 게시판에 공유하여 서로의 이해도를 높입니다.
2. **중복 질문 방지**: 질문 게시판을 활용하여 중복 질문을 최소화합니다.
3. **질문 큐 시스템**: 질문 큐 시스템을 도입하여 실시간으로 질문자를 관리합니다.
4. **진도 관리 및 실습 완료 체크**: 학습자의 실습 완료 상태를 관리하고, 강사와 학습자가 학습 진도를 실시간으로 공유합니다.

 ## 👋🏻 참여 인원
<table style="border: 0.5 solid gray">
 <tr>
    <td align="center"><a href="https://github.com/JangWooJin1"><img src="https://avatars.githubusercontent.com/JangWooJin1" width="130px;" alt=""></td>
    <td align="center" style="border-right : 0.5px solid gray"><a href="https://github.com/cie10"><img src="https://avatars.githubusercontent.com/cie10" width="130px;" alt=""></td>
    <td align="center"><a href="https://github.com/inhooinu"><img src="https://avatars.githubusercontent.com/inhooinu" width="130px;" alt=""></td>
    <td align="center" style="border-right : 0.5px solid gray"><a href="https://github.com/alstjs37"><img src="https://avatars.githubusercontent.com/alstjs37" width="130px;" alt=""></td>

  </tr>
  <tr>
    <td align="center"><a href="https://github.com/JangWooJin1"><b>장우진</b></td>
    <td align="center"style="border-right : 0.5px solid gray"><a href="https://github.com/cie10" ><b>이하늘</b></td>
    <td align="center"><a href="https://github.com/inhooinu"><b>조인후</b></td>
    <td align="center"style="border-right : 0.5px solid gray"><a href="https://github.com/alstjs37" ><b>이민선</b></td>
  </tr>

  <tr>
    <td align = "center" colspan = "4" style="border-right : 0.5px solid gray">Full-Stack</td>
  </tr>
</table>

## 🚀 주요 기능
- **게시판 시스템**: 질문, 답변, 실습 내용을 기록하고 관리할 수 있는 기능 제공
- **질문 큐 기능**: 실시간 질문 순서 관리로 효율적인 강의 진행 지원
- **날짜별 학습 관리**: 학습자들이 날짜별로 자신의 학습 기록을 체계적으로 관리
- **실습 관리**: 실습 완료 상태를 바로 체크하고, 강사와 실습 진행 상황을 공유

### 🔗 서비스 URL
- **메인 페이지**: [The One](http://43.203.139.109)

### 🎬 시연 영상
![theOne_exec (1)](https://github.com/user-attachments/assets/ab270193-c8a1-40d9-851d-7ed25baa0db9)

## 🛠 기술 스택
### Frontend
- **React**: 사용자 인터페이스 구축
- **Axios**: 비동기 HTTP 요청 처리
- **React Bootstrap, React Router**: UI 및 라우팅 관리

### Backend
- **Spring Boot**: REST API 서버 구축
- **Spring Security**: 인증 및 권한 관리 `(JWT)`
- **Spring Data JPA**: 데이터베이스 접근 계층
- **Swagger**: API 문서화

### 배포 및 인프라
- **AWS EC2**: 배포 서버
- **Docker Hub**: 컨테이너 이미지 관리
- **GitHub Actions**: CI/CD 자동화

## 🗂 Architecture
![image](https://github.com/user-attachments/assets/14a85277-8a0f-4b8a-a750-9ec83eb6557b)



## 🗂 ERD & API 명세서
- **ERD**: [ERD Diagram 보기](https://www.erdcloud.com/d/H37rrz8FdMHoPprRi)
![image](https://github.com/user-attachments/assets/43eddf6a-d17c-41d5-aed7-2b25bb775a5a)

--- 

- **API 명세서**: [Swagger UI](http://43.203.139.109:8080/swagger-ui/index.html#/)
![image](https://github.com/user-attachments/assets/7df90c25-2b6f-46e3-8e75-31958a21ba4f)
![image](https://github.com/user-attachments/assets/16c98f7d-3d35-4a6f-96b5-ea1579ae643a)
![image](https://github.com/user-attachments/assets/c4bb8834-d1b4-4ea0-9837-955e23b2dcc5)



## 📅 회고 및 개선 사항
- **트러블 슈팅**: JWT 인증 시 사용자 정보 검증 문제를 해결하기 위해 `/api/auth/validate-token` 엔드포인트 추가
- **개선점**:
  - 게시판 생성, 수정, 삭제 시 페이지 자동 갱신 기능 추가
  - 실습 전원 완료 시 **룰렛**을 통한 기여도 보상 기능 도입

## 🙋‍♂️ 문의
궁금한 점은 [홈페이지](http://43.203.139.109)에서 손 버튼을 눌러주세요! 🤚
