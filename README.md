# https://jaebbang0421.github.io

Personal academic website of Jae Young Jang, built with the [al-folio](https://github.com/alshedivat/al-folio) starter (v1.x) and published by GitHub Pages.
Every push to `main` triggers the **Deploy site** workflow (Actions tab), which builds the site into the `gh-pages` branch; the page updates a few minutes later.

## 자주 고치는 파일

| 하고 싶은 것 | 고칠 파일 |
|---|---|
| 소개글·부제 수정 | `_pages/about.md` |
| 논문 추가 | `_bibliography/papers.bib` — BibTeX 한 덩어리 추가 (Zotero → Export → BibTeX). `selected = {true}`를 넣으면 첫 화면에 노출, `abbr`는 학회 약어 배지 |
| CV PDF 교체 | `assets/pdf/cv.pdf` 덮어쓰기 (`CV-KAIST-JaeYoungJang.docx`를 Word에서 PDF로 저장) |
| CV 웹 페이지 내용 | `_data/cv.yml` |
| 소셜 링크(이메일·Scholar·GitHub) | `_data/socials.yml` |
| 이름·설명·파비콘 등 | `_config.yml` 맨 위 |
| 프로필 사진 | `assets/img/prof_pic.jpg`로 올린 뒤 `_pages/about.md`의 `profile:` 블록 주석 해제 |

## 숨겨 둔 메뉴 켜기

blog / projects / repositories / teaching / people 페이지는 `_pages/<이름>.md`의 `nav: false`를 `nav: true`로 바꾸면 메뉴에 나타납니다.
블로그 글은 `_posts/YYYY-MM-DD-title.md`, 뉴스는 `_news/`, 프로젝트 카드는 `_projects/`에 파일을 추가하면 됩니다 (형식은 `docs/CUSTOMIZE.md` 참고).

## 템플릿과 다른 점

- 샘플 콘텐츠(Einstein 예시, 블로그 글, 프로젝트, 동영상 등)는 모두 제거했습니다.
- 포인트 색을 KAIST 블루로 바꾸기 위해 `_sass/_variables.scss`를 로컬 오버라이드로 두었습니다 (gem 기본 파일 복사본에서 색 두 개만 변경). 색을 바꾸려면 이 파일의 `$purple-color`(라이트)·`$cyan-color`(다크) 값을 수정하세요.
- GitHub Actions 워크플로는 배포용 `deploy.yml` 하나만 남겼습니다 (RenderCV 자동 렌더링, Lighthouse, Prettier, CodeQL 등은 제거). 필요하면 upstream 저장소의 `.github/workflows/`에서 다시 가져올 수 있습니다.
- 원본 문서: `docs/CUSTOMIZE.md`, `docs/FAQ.md`, `docs/TROUBLESHOOTING.md`
