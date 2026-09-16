# 멘토K 모션 숏폼 스튜디오

제목만으로 AI 콘텐츠 초안을 생성하거나, 별도 작성한 원고를 API 없이 숏폼 장면으로 최적화하는 세로형 모션 영상 제작 도구입니다.

## 주요 기능

- OpenAI API 기반 후킹·핵심 장면·결론·CTA 생성
- 붙여 넣은 기사·칼럼·강의 원고의 로컬 최적화
- 단색·그래픽·주제형 일러스트·모션 그래픽으로 구성된 배경 화면 20종 및 타입별 선택
- 배경 액션(날라오기·위에서 나타나기·뒤집기·확대·페이드인)과 3초 반복 모션
- D1 기반 프로젝트 저장 목록·보관/복원·관리자 통계·자동 수정 이력
- 멘토K 브랜드 로고 기본 적용 및 사용자 로고 대체 업로드
- 15·20·30·60초 세로형 모션 미리보기와 장면 편집
- 현재 장면 PNG 및 무음 MP4/WebM 저장

AI 생성에는 호스팅 환경의 `OPENAI_API_KEY`가 필요하며, 선택적으로 `OPENAI_MODEL`을 설정할 수 있습니다. 키가 없어도 입력 원고 최적화와 영상 제작 기능은 정상 작동합니다.

## 빌드 결과

```sh
bash scripts/build.sh
node scripts/validate-artifact.mjs
```

The deterministic build produces a Cloudflare Worker artifact under `dist/`.
