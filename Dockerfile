# 빌드 단계
FROM node:18 AS builder

WORKDIR /usr/src/app

# package.json 복사
COPY package.json ./

# 의존성 설치
RUN npm install

# 모든 소스 코드 복사
COPY . .

# production 모드로 빌드
RUN npm run build

# Nginx 서버 단계
FROM nginx:alpine

# 빌드된 파일 복사
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# 필요에 따라 Nginx 설정 파일 커스터마이징
COPY nginx.conf /etc/nginx/nginx.conf