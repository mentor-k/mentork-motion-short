# 멘토K 모션 숏폼 스튜디오

제목만으로 AI 콘텐츠 초안을 생성하거나, 별도 작성한 원고를 API 없이 숏폼 장면으로 최적화하는 세로형 모션 영상 제작 도구입니다.

## 주요 기능

- OpenAI API 기반 후킹·핵심 장면·결론·CTA 생성
- 붙여 넣은 기사·칼럼·강의 원고의 로컬 최적화
- 단색·그래픽·주제형 일러스트로 구성된 배경 화면 15종 선택
- 멘토K 브랜드 로고 기본 적용 및 사용자 로고 대체 업로드
- 15·20·30·60초 세로형 모션 미리보기와 장면 편집
- 현재 장면 PNG 및 무음 MP4/WebM 저장
- 고조회수 구조 설계: 첫 3초 훅, 컷 타이밍, 패턴 인터럽트, 루프 CTA
- 주제 추천, 훅 각도별 문구 자동 생성, SNS 소개글·해시태그 패키지
- 생성한 바이럴 구조를 기존 장면 구성과 모션 패턴에 즉시 반영
- 자동 장면 수 5·6·7·8·9개 선택 및 핵심 장면 추가·복제·삭제

AI 생성에는 호스팅 환경의 `OPENAI_API_KEY`가 필요하며, 선택적으로 `OPENAI_MODEL`을 설정할 수 있습니다. 키가 없어도 입력 원고 최적화와 영상 제작 기능은 정상 작동합니다.

## 빌드 결과

아래 명령으로 서버 아티팩트를 생성하고 검증합니다.

```sh
bash scripts/build.sh
node scripts/validate-artifact.mjs
```

The deterministic build produces:

```text
dist/
├── .openai/
│   └── hosting.json
└── server/
    └── index.js
```

`dist/server/index.js` is an ES module with a default export containing `fetch(request, env, ctx)`. Edit `worker/index.js`, not the generated file under `dist/`.

## Vercel 배포

`api/index.js`가 기존 Worker 요청을 Vercel Node.js Function으로 연결하고,
`vercel.json`이 모든 경로를 해당 Function으로 전달합니다. GitHub 저장소를
Vercel 프로젝트에 연결하면 `main` 브랜치가 프로덕션으로 자동 배포됩니다.
