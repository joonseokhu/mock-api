## 설치/시작

- 설치
```
npm i
```
- 서버시작
```
npm start
```
- 서버시작 후 접속방법
http://127.0.0.1:3000

## endpoints

| method | path       | description                           |
|--------|------------|---------------------------------------|
| get    | /post      | 항목의 목록을 조회합니다.             |
| get    | /post/{id} | 해당 ID에 해당하는 항목을 조회합니다. |
| post   | /post      | 새로운 항목을 생성합니다.             |
| put    | /post/{id} | 해당 ID에 해당하는 항목을 수정합니다. |
| delete | /post/{id} | 해당 ID에 해당하는 항목을 삭제합니다. |

## 목록조회

| key     | type       | description              |
|---------|------------|--------------------------|
| length  | 양의 정수  | 한 페이지당 보일 항목 수 |
| page    | 양의 정수  | 페이지 번호              |
| reverse | true/false | 역순으로 할지 여부       |

## 항목 생성

| key     | defaultValue |
|---------|--------------|
| title   | '제목 없음'  |
| content | '내용 없음'  |
| likes   | 0          |