// 정보처리기사 필기 개념 및 기출문제 데이터

const concepts = {
    1: {
        title: "소프트웨어 설계",
        icon: "fa-drafting-compass",
        color: "indigo",
        sections: [
            {
                id: "req",
                title: "요구사항 확인",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 소프트웨어 생명주기 모델</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="space-y-4">
                                <div class="bg-indigo-50 rounded-lg p-4">
                                    <h4 class="font-bold text-indigo-800 mb-2">폭포수 모델 (Waterfall Model)</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• 가장 오래된 전통적인 모델</li>
                                        <li>• <strong>순차적</strong>으로 진행 (이전 단계 완료 후 다음 단계)</li>
                                        <li>• 요구사항 변경이 어려움</li>
                                        <li>• 단계: 요구분석 → 설계 → 구현 → 테스트 → 유지보수</li>
                                    </ul>
                                </div>

                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800 mb-2">프로토타입 모델 (Prototype Model)</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• 시제품(프로토타입)을 먼저 만들어 사용자에게 보여줌</li>
                                        <li>• 요구사항을 명확히 파악하기 어려울 때 사용</li>
                                        <li>• 사용자 피드백 반영 가능</li>
                                    </ul>
                                </div>

                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800 mb-2">나선형 모델 (Spiral Model)</h4>
                                    <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-2">⚠️ 사람들이 많이 틀린 개념이에요!</span>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• Boehm이 제안</li>
                                        <li>• <strong>위험 분석</strong>을 포함한 점진적 개발</li>
                                        <li>• 4단계 반복: <strong>계획 → 위험분석 → 개발 → 평가</strong></li>
                                        <li class="text-red-600 font-medium">★ 핵심: "위험 분석"이 포함된 유일한 모델!</li>
                                    </ul>
                                </div>

                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-green-800 mb-2">애자일 모델 (Agile Model)</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• 고객과의 소통, 변화 대응 중시</li>
                                        <li>• 짧은 반복 주기(Sprint/Iteration)</li>
                                        <li>• 종류: <strong>XP, 스크럼, 칸반, 크리스탈, 린</strong></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 애자일 방법론 상세</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="space-y-4">
                                <div class="bg-amber-50 rounded-lg p-4">
                                    <h4 class="font-bold text-amber-800 mb-2">XP (eXtreme Programming)</h4>
                                    <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-2">⚠️ 사람들이 많이 틀린 개념이에요!</span>
                                    <p class="text-sm text-gray-700 mb-2">핵심 가치: <strong>용기, 단순성, 의사소통, 피드백, 존중</strong></p>
                                    <p class="text-sm font-medium text-gray-800 mb-2">XP의 12가지 실천 방법:</p>
                                    <ul class="text-sm text-gray-700 space-y-1 grid grid-cols-2 gap-1">
                                        <li>• 짝 프로그래밍</li>
                                        <li>• 테스트 주도 개발(TDD)</li>
                                        <li>• 리팩토링</li>
                                        <li>• 지속적 통합(CI)</li>
                                        <li>• 계획 게임</li>
                                        <li>• 작은 릴리즈</li>
                                        <li>• 메타포(비유)</li>
                                        <li>• 간단한 설계</li>
                                        <li>• 코드 공동 소유</li>
                                        <li>• 주 40시간 작업</li>
                                        <li>• 고객 상주</li>
                                        <li>• 코딩 표준</li>
                                    </ul>
                                </div>

                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800 mb-2">스크럼 (Scrum)</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• <strong>스프린트</strong>: 2~4주 단위의 반복 개발 주기</li>
                                        <li>• <strong>제품 백로그</strong>: 개발할 기능 목록</li>
                                        <li>• <strong>스프린트 백로그</strong>: 해당 스프린트에서 수행할 작업</li>
                                        <li>• <strong>일일 스크럼</strong>: 매일 15분 스탠드업 미팅</li>
                                        <li>• 역할: 제품 책임자(PO), 스크럼 마스터, 개발팀</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 요구사항 개발 프로세스</h3>

                            <div class="highlight-box rounded-lg p-4 mb-4">
                                <p class="font-bold text-amber-800">순서: 도출(Elicitation) → 분석(Analysis) → 명세(Specification) → 확인(Validation)</p>
                                <p class="text-sm text-gray-700 mt-1">암기 TIP: "도분명확" 으로 외우세요!</p>
                            </div>

                            <div class="space-y-3">
                                <div class="flex items-start gap-3">
                                    <span class="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                                    <div>
                                        <h4 class="font-bold text-gray-800">도출 (Elicitation)</h4>
                                        <p class="text-sm text-gray-600">인터뷰, 설문, 브레인스토밍, 워크샵 등으로 요구사항 수집</p>
                                    </div>
                                </div>
                                <div class="flex items-start gap-3">
                                    <span class="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                                    <div>
                                        <h4 class="font-bold text-gray-800">분석 (Analysis)</h4>
                                        <p class="text-sm text-gray-600">요구사항 충돌 해결, 우선순위 결정</p>
                                    </div>
                                </div>
                                <div class="flex items-start gap-3">
                                    <span class="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                                    <div>
                                        <h4 class="font-bold text-gray-800">명세 (Specification)</h4>
                                        <p class="text-sm text-gray-600">요구사항을 문서화 (SRS: Software Requirements Specification)</p>
                                    </div>
                                </div>
                                <div class="flex items-start gap-3">
                                    <span class="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                                    <div>
                                        <h4 class="font-bold text-gray-800">확인 (Validation)</h4>
                                        <p class="text-sm text-gray-600">요구사항이 정확한지 검토 및 승인</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "uml",
                title: "UML (통합 모델링 언어)",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 UML 다이어그램 종류</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="grid md:grid-cols-2 gap-4">
                                <div class="bg-indigo-50 rounded-lg p-4">
                                    <h4 class="font-bold text-indigo-800 mb-3">구조적 다이어그램 (정적)</h4>
                                    <ul class="text-sm text-gray-700 space-y-2">
                                        <li><strong>• 클래스 다이어그램</strong>: 클래스와 관계 표현</li>
                                        <li>• 객체 다이어그램: 인스턴스 간 관계</li>
                                        <li>• 컴포넌트 다이어그램: 컴포넌트 구조</li>
                                        <li>• 배치 다이어그램: 물리적 배치</li>
                                        <li>• 복합체 구조 다이어그램</li>
                                        <li>• 패키지 다이어그램</li>
                                    </ul>
                                </div>

                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800 mb-3">행위 다이어그램 (동적)</h4>
                                    <ul class="text-sm text-gray-700 space-y-2">
                                        <li><strong>• 유스케이스 다이어그램</strong>: 사용자 관점 기능</li>
                                        <li><strong>• 시퀀스 다이어그램</strong>: 객체 간 메시지 순서</li>
                                        <li>• 커뮤니케이션 다이어그램</li>
                                        <li>• 상태 다이어그램: 상태 전이</li>
                                        <li><strong>• 활동 다이어그램</strong>: 처리 흐름</li>
                                        <li>• 타이밍 다이어그램</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 클래스 다이어그램 관계</h3>
                            <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-4">⚠️ 사람들이 많이 틀린 개념이에요!</span>

                            <div class="space-y-3">
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">연관 (Association) ─────</h4>
                                    <p class="text-sm text-gray-600">두 클래스 간의 일반적인 관계</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">집합 (Aggregation) ◇────</h4>
                                    <p class="text-sm text-gray-600">전체-부분 관계, 생명주기 독립 (약한 결합)</p>
                                    <p class="text-xs text-blue-600">예: 컴퓨터 ◇── 프린터 (프린터는 독립적으로 존재 가능)</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">합성 (Composition) ◆────</h4>
                                    <p class="text-sm text-gray-600">전체-부분 관계, 생명주기 종속 (강한 결합)</p>
                                    <p class="text-xs text-blue-600">예: 사람 ◆── 심장 (심장은 사람 없이 존재 불가)</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">일반화 (Generalization) ───▷</h4>
                                    <p class="text-sm text-gray-600">상속 관계 (is-a 관계)</p>
                                    <p class="text-xs text-blue-600">예: 동물 ◁── 개, 고양이</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">의존 (Dependency) - - - -></h4>
                                    <p class="text-sm text-gray-600">일시적인 사용 관계</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">실체화 (Realization) - - -▷</h4>
                                    <p class="text-sm text-gray-600">인터페이스 구현 관계</p>
                                </div>
                            </div>

                            <div class="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                                <p class="text-sm font-bold text-red-800">★ 핵심 암기: 집합 vs 합성</p>
                                <p class="text-sm text-red-700">집합(◇)은 약한 결합, 합성(◆)은 강한 결합!</p>
                                <p class="text-sm text-red-700">◇ 빈 다이아몬드 = 부분이 독립적</p>
                                <p class="text-sm text-red-700">◆ 채운 다이아몬드 = 부분이 종속적</p>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 유스케이스 다이어그램</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="space-y-3">
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800 mb-2">구성요소</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• <strong>액터(Actor)</strong>: 시스템 외부에서 상호작용하는 사람/시스템</li>
                                        <li>• <strong>유스케이스(Use Case)</strong>: 시스템이 제공하는 기능</li>
                                        <li>• <strong>시스템 경계</strong>: 시스템의 범위를 나타내는 사각형</li>
                                    </ul>
                                </div>

                                <div class="bg-amber-50 rounded-lg p-4">
                                    <h4 class="font-bold text-amber-800 mb-2">관계 종류</h4>
                                    <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-2">⚠️ 사람들이 많이 틀린 개념이에요!</span>
                                    <ul class="text-sm text-gray-700 space-y-2">
                                        <li><strong>• 포함(Include) &lt;&lt;include&gt;&gt;</strong>: 반드시 실행되는 기능</li>
                                        <li class="text-xs ml-4 text-blue-600">예: "결제하기"는 "로그인"을 포함</li>
                                        <li><strong>• 확장(Extend) &lt;&lt;extend&gt;&gt;</strong>: 조건에 따라 선택적 실행</li>
                                        <li class="text-xs ml-4 text-blue-600">예: "쿠폰 적용"은 "결제하기"를 확장</li>
                                        <li><strong>• 일반화(Generalization)</strong>: 상속 관계</li>
                                    </ul>
                                    <div class="mt-3 p-2 bg-red-100 rounded">
                                        <p class="text-xs font-bold text-red-800">★ include vs extend 구분법</p>
                                        <p class="text-xs text-red-700">include: 필수! 반드시 실행</p>
                                        <p class="text-xs text-red-700">extend: 선택! 조건부 실행</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "design",
                title: "화면 설계 및 UI",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 UI 설계 원칙</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="grid md:grid-cols-2 gap-4">
                                <div class="bg-indigo-50 rounded-lg p-4">
                                    <h4 class="font-bold text-indigo-800">직관성</h4>
                                    <p class="text-sm text-gray-600">누구나 쉽게 이해하고 사용</p>
                                </div>
                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800">유효성</h4>
                                    <p class="text-sm text-gray-600">사용자의 목적을 달성할 수 있어야 함</p>
                                </div>
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800">학습성</h4>
                                    <p class="text-sm text-gray-600">쉽게 배울 수 있어야 함</p>
                                </div>
                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-green-800">유연성</h4>
                                    <p class="text-sm text-gray-600">사용자 요구에 맞게 변경 가능</p>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 UI 유형</h3>

                            <div class="space-y-3">
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">CLI (Command Line Interface)</h4>
                                    <p class="text-sm text-gray-600">명령어를 텍스트로 입력하는 인터페이스</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">GUI (Graphical User Interface)</h4>
                                    <p class="text-sm text-gray-600">그래픽 기반의 인터페이스 (마우스, 아이콘)</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">NUI (Natural User Interface)</h4>
                                    <p class="text-sm text-gray-600">터치, 음성, 제스처 등 자연스러운 인터페이스</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">OUI (Organic User Interface)</h4>
                                    <p class="text-sm text-gray-600">유기적 형태의 인터페이스 (플렉서블 디스플레이)</p>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 UI 설계 도구</h3>

                            <div class="space-y-3">
                                <div class="bg-amber-50 rounded-lg p-4">
                                    <h4 class="font-bold text-amber-800">와이어프레임 (Wireframe)</h4>
                                    <p class="text-sm text-gray-600">화면의 레이아웃, 콘텐츠 배치를 간단하게 표현</p>
                                </div>
                                <div class="bg-amber-50 rounded-lg p-4">
                                    <h4 class="font-bold text-amber-800">목업 (Mockup)</h4>
                                    <p class="text-sm text-gray-600">실제 화면과 유사한 정적 모형</p>
                                </div>
                                <div class="bg-amber-50 rounded-lg p-4">
                                    <h4 class="font-bold text-amber-800">스토리보드 (Storyboard)</h4>
                                    <p class="text-sm text-gray-600">화면 간의 흐름과 연결을 표현</p>
                                </div>
                                <div class="bg-amber-50 rounded-lg p-4">
                                    <h4 class="font-bold text-amber-800">프로토타입 (Prototype)</h4>
                                    <p class="text-sm text-gray-600">실제 작동하는 모형, 인터랙션 포함</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "pattern",
                title: "설계 패턴",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 디자인 패턴 분류 (GoF)</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="space-y-4">
                                <div class="bg-indigo-50 rounded-lg p-4">
                                    <h4 class="font-bold text-indigo-800 mb-2">생성 패턴 (Creational)</h4>
                                    <p class="text-sm text-gray-600 mb-2">객체 생성과 관련된 패턴</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span class="px-2 py-1 bg-indigo-200 rounded text-xs">싱글톤</span>
                                        <span class="px-2 py-1 bg-indigo-200 rounded text-xs">팩토리 메서드</span>
                                        <span class="px-2 py-1 bg-indigo-200 rounded text-xs">추상 팩토리</span>
                                        <span class="px-2 py-1 bg-indigo-200 rounded text-xs">빌더</span>
                                        <span class="px-2 py-1 bg-indigo-200 rounded text-xs">프로토타입</span>
                                    </div>
                                </div>

                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800 mb-2">구조 패턴 (Structural)</h4>
                                    <p class="text-sm text-gray-600 mb-2">클래스/객체의 구성과 관련된 패턴</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span class="px-2 py-1 bg-purple-200 rounded text-xs">어댑터</span>
                                        <span class="px-2 py-1 bg-purple-200 rounded text-xs">브릿지</span>
                                        <span class="px-2 py-1 bg-purple-200 rounded text-xs">컴포지트</span>
                                        <span class="px-2 py-1 bg-purple-200 rounded text-xs">데코레이터</span>
                                        <span class="px-2 py-1 bg-purple-200 rounded text-xs">퍼사드</span>
                                        <span class="px-2 py-1 bg-purple-200 rounded text-xs">플라이웨이트</span>
                                        <span class="px-2 py-1 bg-purple-200 rounded text-xs">프록시</span>
                                    </div>
                                </div>

                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-green-800 mb-2">행위 패턴 (Behavioral)</h4>
                                    <p class="text-sm text-gray-600 mb-2">객체 간 상호작용과 관련된 패턴</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span class="px-2 py-1 bg-green-200 rounded text-xs">옵저버</span>
                                        <span class="px-2 py-1 bg-green-200 rounded text-xs">전략</span>
                                        <span class="px-2 py-1 bg-green-200 rounded text-xs">템플릿 메서드</span>
                                        <span class="px-2 py-1 bg-green-200 rounded text-xs">커맨드</span>
                                        <span class="px-2 py-1 bg-green-200 rounded text-xs">상태</span>
                                        <span class="px-2 py-1 bg-green-200 rounded text-xs">방문자</span>
                                        <span class="px-2 py-1 bg-green-200 rounded text-xs">반복자</span>
                                        <span class="px-2 py-1 bg-green-200 rounded text-xs">중재자</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 주요 디자인 패턴 상세</h3>
                            <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-4">⚠️ 사람들이 많이 틀린 개념이에요!</span>

                            <div class="space-y-3">
                                <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-indigo-500">
                                    <h4 class="font-bold text-gray-800">싱글톤 (Singleton)</h4>
                                    <p class="text-sm text-gray-600">클래스의 인스턴스가 하나만 존재하도록 보장</p>
                                    <p class="text-xs text-blue-600 mt-1">예: 데이터베이스 연결, 로그 관리자</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-indigo-500">
                                    <h4 class="font-bold text-gray-800">팩토리 메서드 (Factory Method)</h4>
                                    <p class="text-sm text-gray-600">객체 생성을 서브클래스에 위임</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-purple-500">
                                    <h4 class="font-bold text-gray-800">어댑터 (Adapter)</h4>
                                    <p class="text-sm text-gray-600">호환되지 않는 인터페이스를 연결 (변환기)</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-purple-500">
                                    <h4 class="font-bold text-gray-800">퍼사드 (Facade)</h4>
                                    <p class="text-sm text-gray-600">복잡한 서브시스템에 단순한 인터페이스 제공</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500">
                                    <h4 class="font-bold text-gray-800">옵저버 (Observer)</h4>
                                    <p class="text-sm text-gray-600">객체 상태 변화를 다른 객체들에게 자동 통지</p>
                                    <p class="text-xs text-blue-600 mt-1">예: 이벤트 리스너, 구독 시스템</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500">
                                    <h4 class="font-bold text-gray-800">전략 (Strategy)</h4>
                                    <p class="text-sm text-gray-600">알고리즘을 캡슐화하여 교체 가능하게 함</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "architecture",
                title: "소프트웨어 아키텍처",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 소프트웨어 아키텍처 패턴</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="space-y-4">
                                <div class="bg-indigo-50 rounded-lg p-4">
                                    <h4 class="font-bold text-indigo-800 mb-2">레이어 패턴 (Layered Pattern)</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• 시스템을 계층으로 구분하여 구성</li>
                                        <li>• 각 계층은 하위 계층에만 의존</li>
                                        <li>• 예: OSI 7계층, MVC 패턴</li>
                                    </ul>
                                </div>

                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800 mb-2">클라이언트-서버 패턴</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• 하나의 서버와 다수의 클라이언트로 구성</li>
                                        <li>• 서버: 서비스 제공, 클라이언트: 서비스 요청</li>
                                    </ul>
                                </div>

                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800 mb-2">파이프-필터 패턴 (Pipe-Filter)</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• 데이터 스트림을 처리하는 시스템에 적합</li>
                                        <li>• 필터: 데이터 변환, 파이프: 데이터 전달</li>
                                        <li>• 예: 유닉스 셸, 컴파일러</li>
                                    </ul>
                                </div>

                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-green-800 mb-2">MVC 패턴 (Model-View-Controller)</h4>
                                    <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-2">⚠️ 사람들이 많이 틀린 개념이에요!</span>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• <strong>Model</strong>: 데이터와 비즈니스 로직</li>
                                        <li>• <strong>View</strong>: 사용자 인터페이스 (화면)</li>
                                        <li>• <strong>Controller</strong>: Model과 View 사이의 상호작용 제어</li>
                                    </ul>
                                </div>

                                <div class="bg-amber-50 rounded-lg p-4">
                                    <h4 class="font-bold text-amber-800 mb-2">마스터-슬레이브 패턴</h4>
                                    <p class="text-sm text-gray-700">마스터가 작업을 분배하고 슬레이브가 처리 후 결과 반환</p>
                                </div>

                                <div class="bg-red-50 rounded-lg p-4">
                                    <h4 class="font-bold text-red-800 mb-2">브로커 패턴</h4>
                                    <p class="text-sm text-gray-700">분산 시스템에서 컴포넌트 간 통신 조정 (브로커가 중개)</p>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 결합도 (Coupling)</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <p class="text-sm text-gray-700 mb-4">모듈 간의 상호 의존 정도. <strong class="text-red-600">낮을수록 좋음!</strong></p>

                            <div class="space-y-2">
                                <div class="flex items-center gap-3 bg-green-50 rounded-lg p-3">
                                    <span class="w-16 text-center px-2 py-1 bg-green-500 text-white text-xs rounded font-bold">좋음</span>
                                    <div>
                                        <span class="font-bold text-green-800">자료 결합도 (Data)</span>
                                        <p class="text-xs text-gray-600">파라미터로 자료만 전달</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 bg-green-50 rounded-lg p-3">
                                    <span class="w-16 text-center px-2 py-1 bg-green-400 text-white text-xs rounded font-bold">↓</span>
                                    <div>
                                        <span class="font-bold text-green-700">스탬프 결합도 (Stamp)</span>
                                        <p class="text-xs text-gray-600">배열, 레코드 등 자료구조 전달</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 bg-yellow-50 rounded-lg p-3">
                                    <span class="w-16 text-center px-2 py-1 bg-yellow-500 text-white text-xs rounded font-bold">↓</span>
                                    <div>
                                        <span class="font-bold text-yellow-700">제어 결합도 (Control)</span>
                                        <p class="text-xs text-gray-600">제어 신호(플래그) 전달</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 bg-orange-50 rounded-lg p-3">
                                    <span class="w-16 text-center px-2 py-1 bg-orange-500 text-white text-xs rounded font-bold">↓</span>
                                    <div>
                                        <span class="font-bold text-orange-700">외부 결합도 (External)</span>
                                        <p class="text-xs text-gray-600">외부에서 선언된 데이터 공유</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 bg-red-50 rounded-lg p-3">
                                    <span class="w-16 text-center px-2 py-1 bg-red-400 text-white text-xs rounded font-bold">↓</span>
                                    <div>
                                        <span class="font-bold text-red-600">공통 결합도 (Common)</span>
                                        <p class="text-xs text-gray-600">전역 변수 공유</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 bg-red-100 rounded-lg p-3">
                                    <span class="w-16 text-center px-2 py-1 bg-red-600 text-white text-xs rounded font-bold">나쁨</span>
                                    <div>
                                        <span class="font-bold text-red-700">내용 결합도 (Content)</span>
                                        <p class="text-xs text-gray-600">다른 모듈 내부 직접 참조</p>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <p class="text-sm font-bold text-blue-800">★ 암기 TIP: "자스제외공내" (자료→스탬프→제어→외부→공통→내용)</p>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 응집도 (Cohesion)</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <p class="text-sm text-gray-700 mb-4">모듈 내부 요소들의 관련성 정도. <strong class="text-green-600">높을수록 좋음!</strong></p>

                            <div class="space-y-2">
                                <div class="flex items-center gap-3 bg-green-50 rounded-lg p-3">
                                    <span class="w-16 text-center px-2 py-1 bg-green-600 text-white text-xs rounded font-bold">좋음</span>
                                    <div>
                                        <span class="font-bold text-green-800">기능적 응집도 (Functional)</span>
                                        <p class="text-xs text-gray-600">단일 기능만 수행</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 bg-green-50 rounded-lg p-3">
                                    <span class="w-16 text-center px-2 py-1 bg-green-500 text-white text-xs rounded font-bold">↓</span>
                                    <div>
                                        <span class="font-bold text-green-700">순차적 응집도 (Sequential)</span>
                                        <p class="text-xs text-gray-600">출력이 다음 입력으로 사용</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 bg-yellow-50 rounded-lg p-3">
                                    <span class="w-16 text-center px-2 py-1 bg-yellow-500 text-white text-xs rounded font-bold">↓</span>
                                    <div>
                                        <span class="font-bold text-yellow-700">교환적 응집도 (Communicational)</span>
                                        <p class="text-xs text-gray-600">동일한 입출력 데이터 사용</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 bg-orange-50 rounded-lg p-3">
                                    <span class="w-16 text-center px-2 py-1 bg-orange-500 text-white text-xs rounded font-bold">↓</span>
                                    <div>
                                        <span class="font-bold text-orange-700">절차적 응집도 (Procedural)</span>
                                        <p class="text-xs text-gray-600">순서대로 실행되어야 함</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 bg-red-50 rounded-lg p-3">
                                    <span class="w-16 text-center px-2 py-1 bg-red-400 text-white text-xs rounded font-bold">↓</span>
                                    <div>
                                        <span class="font-bold text-red-600">시간적 응집도 (Temporal)</span>
                                        <p class="text-xs text-gray-600">같은 시간에 실행</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 bg-red-50 rounded-lg p-3">
                                    <span class="w-16 text-center px-2 py-1 bg-red-500 text-white text-xs rounded font-bold">↓</span>
                                    <div>
                                        <span class="font-bold text-red-600">논리적 응집도 (Logical)</span>
                                        <p class="text-xs text-gray-600">유사한 성격의 기능들</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 bg-red-100 rounded-lg p-3">
                                    <span class="w-16 text-center px-2 py-1 bg-red-600 text-white text-xs rounded font-bold">나쁨</span>
                                    <div>
                                        <span class="font-bold text-red-700">우연적 응집도 (Coincidental)</span>
                                        <p class="text-xs text-gray-600">관련 없는 요소들의 모임</p>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <p class="text-sm font-bold text-blue-800">★ 암기 TIP: "기순교절시논우" (기능적→순차적→교환적→절차적→시간적→논리적→우연적)</p>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 객체지향 설계 원칙 (SOLID)</h3>
                            <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-4">⚠️ 사람들이 많이 틀린 개념이에요!</span>

                            <div class="space-y-3">
                                <div class="bg-indigo-50 rounded-lg p-4">
                                    <h4 class="font-bold text-indigo-800"><span class="text-xl">S</span>RP - 단일 책임 원칙</h4>
                                    <p class="text-sm text-gray-700">Single Responsibility Principle</p>
                                    <p class="text-sm text-gray-600">클래스는 하나의 책임만 가져야 함</p>
                                </div>
                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800"><span class="text-xl">O</span>CP - 개방-폐쇄 원칙</h4>
                                    <p class="text-sm text-gray-700">Open-Closed Principle</p>
                                    <p class="text-sm text-gray-600">확장에는 열려있고, 변경에는 닫혀있어야 함</p>
                                </div>
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800"><span class="text-xl">L</span>SP - 리스코프 치환 원칙</h4>
                                    <p class="text-sm text-gray-700">Liskov Substitution Principle</p>
                                    <p class="text-sm text-gray-600">자식 클래스는 부모 클래스를 대체할 수 있어야 함</p>
                                </div>
                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-green-800"><span class="text-xl">I</span>SP - 인터페이스 분리 원칙</h4>
                                    <p class="text-sm text-gray-700">Interface Segregation Principle</p>
                                    <p class="text-sm text-gray-600">클라이언트가 사용하지 않는 메서드에 의존하지 않아야 함</p>
                                </div>
                                <div class="bg-amber-50 rounded-lg p-4">
                                    <h4 class="font-bold text-amber-800"><span class="text-xl">D</span>IP - 의존성 역전 원칙</h4>
                                    <p class="text-sm text-gray-700">Dependency Inversion Principle</p>
                                    <p class="text-sm text-gray-600">추상화에 의존해야 하며, 구체화에 의존하면 안 됨</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "interface",
                title: "인터페이스 설계",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 인터페이스 개요</h3>

                            <div class="space-y-4">
                                <div class="bg-indigo-50 rounded-lg p-4">
                                    <h4 class="font-bold text-indigo-800 mb-2">인터페이스 종류</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• <strong>내부 인터페이스</strong>: 시스템 내 모듈 간 통신</li>
                                        <li>• <strong>외부 인터페이스</strong>: 다른 시스템과의 통신</li>
                                    </ul>
                                </div>

                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800 mb-2">인터페이스 방식</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• <strong>동기 방식</strong>: 요청 후 응답까지 대기</li>
                                        <li>• <strong>비동기 방식</strong>: 요청 후 다른 작업 수행 가능</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 미들웨어 (Middleware)</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <p class="text-sm text-gray-700 mb-4">운영체제와 응용 프로그램 사이에서 통신을 담당하는 소프트웨어</p>

                            <div class="space-y-3">
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">DB (Database)</h4>
                                    <p class="text-sm text-gray-600">데이터베이스와 연결 (ODBC, JDBC)</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">RPC (Remote Procedure Call)</h4>
                                    <p class="text-sm text-gray-600">원격 프로시저 호출</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">MOM (Message Oriented Middleware)</h4>
                                    <p class="text-sm text-gray-600">메시지 기반 비동기 통신</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">TP Monitor (Transaction Processing)</h4>
                                    <p class="text-sm text-gray-600">트랜잭션 처리 모니터</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">ORB (Object Request Broker)</h4>
                                    <p class="text-sm text-gray-600">객체 간 통신 중개 (CORBA)</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">WAS (Web Application Server)</h4>
                                    <p class="text-sm text-gray-600">웹 애플리케이션 실행 환경 (Tomcat, WebLogic)</p>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 데이터 교환 표준</h3>
                            <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-4">⚠️ 사람들이 많이 틀린 개념이에요!</span>

                            <div class="grid md:grid-cols-2 gap-4">
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800">JSON</h4>
                                    <p class="text-sm text-gray-600">JavaScript Object Notation</p>
                                    <p class="text-xs text-gray-500 mt-1">경량, 가독성 좋음</p>
                                </div>
                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-green-800">XML</h4>
                                    <p class="text-sm text-gray-600">eXtensible Markup Language</p>
                                    <p class="text-xs text-gray-500 mt-1">태그 기반, 확장성</p>
                                </div>
                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800">AJAX</h4>
                                    <p class="text-sm text-gray-600">Asynchronous JavaScript and XML</p>
                                    <p class="text-xs text-gray-500 mt-1">비동기 웹 통신</p>
                                </div>
                                <div class="bg-amber-50 rounded-lg p-4">
                                    <h4 class="font-bold text-amber-800">REST</h4>
                                    <p class="text-sm text-gray-600">REpresentational State Transfer</p>
                                    <p class="text-xs text-gray-500 mt-1">HTTP 기반 API 아키텍처</p>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 API (Application Programming Interface)</h3>

                            <div class="space-y-3">
                                <div class="bg-indigo-50 rounded-lg p-4">
                                    <h4 class="font-bold text-indigo-800 mb-2">REST API</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• HTTP 메서드 사용: GET(조회), POST(생성), PUT(수정), DELETE(삭제)</li>
                                        <li>• 무상태(Stateless) 통신</li>
                                        <li>• URI로 자원 표현</li>
                                    </ul>
                                </div>

                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800 mb-2">SOAP (Simple Object Access Protocol)</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• XML 기반 메시지 프로토콜</li>
                                        <li>• WSDL로 서비스 정의</li>
                                        <li>• 엄격한 표준, 보안 강점</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        ]
    },
    2: {
        title: "소프트웨어 개발",
        icon: "fa-code",
        color: "purple",
        sections: [
            {
                id: "integration",
                title: "통합 구현",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 통합 구현 개요</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="space-y-4">
                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800 mb-2">연계 메커니즘</h4>
                                    <ul class="text-sm text-gray-700 space-y-2">
                                        <li><strong>• 직접 연계</strong>: DB Link, API/Open API, DB Connection</li>
                                        <li><strong>• 간접 연계</strong>: EAI, ESB, 웹서비스(SOAP/WSDL)</li>
                                    </ul>
                                </div>

                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800 mb-2">EAI (Enterprise Application Integration)</h4>
                                    <p class="text-sm text-gray-700 mb-2">기업 내 애플리케이션 통합</p>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• Point-to-Point: 1:1 연결</li>
                                        <li>• Hub & Spoke: 중앙 허브 통한 연결</li>
                                        <li>• Message Bus: 메시지 버스 활용</li>
                                        <li>• Hybrid: 복합 방식</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "test",
                title: "소프트웨어 테스트",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 테스트 레벨</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="space-y-3">
                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800">1. 단위 테스트 (Unit Test)</h4>
                                    <p class="text-sm text-gray-600">개별 모듈/컴포넌트 테스트</p>
                                </div>
                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800">2. 통합 테스트 (Integration Test)</h4>
                                    <p class="text-sm text-gray-600">모듈 간 인터페이스 테스트</p>
                                </div>
                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800">3. 시스템 테스트 (System Test)</h4>
                                    <p class="text-sm text-gray-600">전체 시스템의 기능/비기능 테스트</p>
                                </div>
                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800">4. 인수 테스트 (Acceptance Test)</h4>
                                    <p class="text-sm text-gray-600">사용자가 직접 수행, 알파/베타 테스트</p>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 화이트박스 vs 블랙박스 테스트</h3>
                            <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-4">⚠️ 사람들이 많이 틀린 개념이에요!</span>

                            <div class="grid md:grid-cols-2 gap-4">
                                <div class="bg-gray-100 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800 mb-2">화이트박스 테스트</h4>
                                    <p class="text-sm text-gray-600 mb-2">내부 구조/로직 기반 테스트</p>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• 문장 검증(Statement)</li>
                                        <li>• 분기 검증(Branch/Decision)</li>
                                        <li>• 조건 검증(Condition)</li>
                                        <li>• 경로 검증(Path)</li>
                                        <li>• 기초 경로 검증</li>
                                        <li>• 루프 검증</li>
                                    </ul>
                                </div>

                                <div class="bg-gray-800 text-white rounded-lg p-4">
                                    <h4 class="font-bold mb-2">블랙박스 테스트</h4>
                                    <p class="text-sm text-gray-300 mb-2">기능/명세 기반 테스트</p>
                                    <ul class="text-sm space-y-1">
                                        <li>• 동등 분할(Equivalence Partitioning)</li>
                                        <li>• 경계값 분석(Boundary Value)</li>
                                        <li>• 원인-결과 그래프</li>
                                        <li>• 오류 예측</li>
                                        <li>• 비교 테스트</li>
                                        <li>• 상태 전이 테스트</li>
                                    </ul>
                                </div>
                            </div>

                            <div class="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                                <p class="text-sm font-bold text-red-800">★ 핵심 암기</p>
                                <p class="text-sm text-red-700">화이트박스 = 구조/코드/경로 기반</p>
                                <p class="text-sm text-red-700">블랙박스 = 기능/명세/입출력 기반</p>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 통합 테스트 방법</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="space-y-4">
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800 mb-2">하향식 통합 (Top-Down)</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• 상위 모듈에서 하위 모듈로 통합</li>
                                        <li>• <strong>스텁(Stub)</strong> 사용: 하위 모듈 대체</li>
                                        <li>• 깊이 우선/너비 우선 통합</li>
                                    </ul>
                                </div>

                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-green-800 mb-2">상향식 통합 (Bottom-Up)</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• 하위 모듈에서 상위 모듈로 통합</li>
                                        <li>• <strong>드라이버(Driver)</strong> 사용: 상위 모듈 대체</li>
                                        <li>• 클러스터 단위 테스트</li>
                                    </ul>
                                </div>

                                <div class="p-4 bg-amber-50 rounded-lg border border-amber-200">
                                    <p class="text-sm font-bold text-amber-800">★ 스텁 vs 드라이버 암기법</p>
                                    <p class="text-sm text-amber-700">스텁(Stub) = 하위 대체 (하향식)</p>
                                    <p class="text-sm text-amber-700">드라이버(Driver) = 상위 대체 (상향식)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "version",
                title: "형상 관리",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 형상 관리(SCM)</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="highlight-box rounded-lg p-4 mb-4">
                                <p class="font-bold text-amber-800">형상 관리 절차</p>
                                <p class="text-sm text-gray-700">형상 식별 → 형상 통제 → 형상 감사 → 형상 기록</p>
                            </div>

                            <div class="space-y-3">
                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800">형상 식별</h4>
                                    <p class="text-sm text-gray-600">관리 대상 정의, 베이스라인 설정</p>
                                </div>
                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800">형상 통제 (변경 관리)</h4>
                                    <p class="text-sm text-gray-600">변경 요청 검토, 승인, 적용</p>
                                </div>
                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800">형상 감사</h4>
                                    <p class="text-sm text-gray-600">무결성 검증, 기준선 준수 확인</p>
                                </div>
                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800">형상 기록</h4>
                                    <p class="text-sm text-gray-600">변경 이력 문서화</p>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 버전 관리 도구</h3>

                            <div class="space-y-3">
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">CVS (Concurrent Versions System)</h4>
                                    <p class="text-sm text-gray-600">초기 버전 관리 시스템, 중앙 집중식</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">SVN (Subversion)</h4>
                                    <p class="text-sm text-gray-600">CVS 개선, 중앙 집중식</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">Git</h4>
                                    <p class="text-sm text-gray-600">분산 버전 관리 시스템, 로컬 저장소 지원</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "datastructure",
                title: "자료구조",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 자료구조 개요</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="grid md:grid-cols-2 gap-4">
                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800 mb-2">선형 자료구조</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• 배열 (Array)</li>
                                        <li>• 연결 리스트 (Linked List)</li>
                                        <li>• 스택 (Stack)</li>
                                        <li>• 큐 (Queue)</li>
                                        <li>• 데크 (Deque)</li>
                                    </ul>
                                </div>
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800 mb-2">비선형 자료구조</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• 트리 (Tree)</li>
                                        <li>• 그래프 (Graph)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 스택 & 큐</h3>
                            <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-4">⚠️ 사람들이 많이 틀린 개념이에요!</span>

                            <div class="grid md:grid-cols-2 gap-4">
                                <div class="bg-indigo-50 rounded-lg p-4">
                                    <h4 class="font-bold text-indigo-800 mb-2">스택 (Stack)</h4>
                                    <p class="text-sm text-gray-700 font-bold mb-2">LIFO (Last In First Out)</p>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• Push: 삽입</li>
                                        <li>• Pop: 삭제</li>
                                        <li>• Top/Peek: 최상위 확인</li>
                                    </ul>
                                    <p class="text-xs text-blue-600 mt-2">활용: 후위 표기법, 함수 호출, 괄호 검사</p>
                                </div>
                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-green-800 mb-2">큐 (Queue)</h4>
                                    <p class="text-sm text-gray-700 font-bold mb-2">FIFO (First In First Out)</p>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• Enqueue: 삽입 (rear)</li>
                                        <li>• Dequeue: 삭제 (front)</li>
                                    </ul>
                                    <p class="text-xs text-blue-600 mt-2">활용: 프로세스 스케줄링, BFS</p>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 트리 (Tree)</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="space-y-4">
                                <div class="bg-amber-50 rounded-lg p-4">
                                    <h4 class="font-bold text-amber-800 mb-2">트리 용어</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• <strong>루트 (Root)</strong>: 최상위 노드</li>
                                        <li>• <strong>리프 (Leaf)</strong>: 자식이 없는 노드</li>
                                        <li>• <strong>깊이 (Depth)</strong>: 루트에서 해당 노드까지 거리</li>
                                        <li>• <strong>높이 (Height)</strong>: 트리의 최대 깊이</li>
                                        <li>• <strong>차수 (Degree)</strong>: 자식 노드의 수</li>
                                    </ul>
                                </div>

                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800 mb-2">이진 트리 순회</h4>
                                    <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-2">⚠️ 사람들이 많이 틀린 개념이에요!</span>
                                    <ul class="text-sm text-gray-700 space-y-2">
                                        <li>• <strong>전위 순회 (Preorder)</strong>: 루트 → 왼쪽 → 오른쪽</li>
                                        <li>• <strong>중위 순회 (Inorder)</strong>: 왼쪽 → 루트 → 오른쪽</li>
                                        <li>• <strong>후위 순회 (Postorder)</strong>: 왼쪽 → 오른쪽 → 루트</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 그래프 (Graph)</h3>

                            <div class="space-y-4">
                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800 mb-2">그래프 종류</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• <strong>방향 그래프</strong>: 간선에 방향이 있음</li>
                                        <li>• <strong>무방향 그래프</strong>: 간선에 방향 없음</li>
                                        <li>• <strong>가중치 그래프</strong>: 간선에 가중치 부여</li>
                                    </ul>
                                </div>

                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-green-800 mb-2">그래프 탐색</h4>
                                    <ul class="text-sm text-gray-700 space-y-2">
                                        <li>• <strong>DFS (깊이 우선 탐색)</strong>: 스택 사용, 한 방향으로 끝까지</li>
                                        <li>• <strong>BFS (너비 우선 탐색)</strong>: 큐 사용, 같은 레벨 먼저</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "algorithm",
                title: "알고리즘",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 정렬 알고리즘</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="space-y-3">
                                <div class="bg-red-50 rounded-lg p-4">
                                    <h4 class="font-bold text-red-800 mb-2">버블 정렬 (Bubble Sort)</h4>
                                    <p class="text-sm text-gray-700">인접한 두 원소를 비교하여 교환</p>
                                    <p class="text-xs text-gray-600">시간복잡도: O(n²)</p>
                                </div>
                                <div class="bg-orange-50 rounded-lg p-4">
                                    <h4 class="font-bold text-orange-800 mb-2">선택 정렬 (Selection Sort)</h4>
                                    <p class="text-sm text-gray-700">최솟값을 찾아 맨 앞과 교환</p>
                                    <p class="text-xs text-gray-600">시간복잡도: O(n²)</p>
                                </div>
                                <div class="bg-yellow-50 rounded-lg p-4">
                                    <h4 class="font-bold text-yellow-800 mb-2">삽입 정렬 (Insertion Sort)</h4>
                                    <p class="text-sm text-gray-700">정렬된 부분에 새 원소를 적절한 위치에 삽입</p>
                                    <p class="text-xs text-gray-600">시간복잡도: O(n²)</p>
                                </div>
                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-green-800 mb-2">퀵 정렬 (Quick Sort)</h4>
                                    <p class="text-sm text-gray-700">피벗을 기준으로 분할 정복</p>
                                    <p class="text-xs text-gray-600">시간복잡도: 평균 O(n log n), 최악 O(n²)</p>
                                </div>
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800 mb-2">합병 정렬 (Merge Sort)</h4>
                                    <p class="text-sm text-gray-700">분할 후 합병하면서 정렬</p>
                                    <p class="text-xs text-gray-600">시간복잡도: O(n log n), 안정 정렬</p>
                                </div>
                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800 mb-2">힙 정렬 (Heap Sort)</h4>
                                    <p class="text-sm text-gray-700">힙 자료구조 이용</p>
                                    <p class="text-xs text-gray-600">시간복잡도: O(n log n)</p>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 검색 알고리즘</h3>

                            <div class="grid md:grid-cols-2 gap-4">
                                <div class="bg-indigo-50 rounded-lg p-4">
                                    <h4 class="font-bold text-indigo-800 mb-2">순차 검색 (Sequential)</h4>
                                    <p class="text-sm text-gray-700">처음부터 끝까지 순서대로 검색</p>
                                    <p class="text-xs text-gray-600">시간복잡도: O(n)</p>
                                </div>
                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-green-800 mb-2">이진 검색 (Binary)</h4>
                                    <p class="text-sm text-gray-700">정렬된 데이터에서 중간값과 비교</p>
                                    <p class="text-xs text-gray-600">시간복잡도: O(log n)</p>
                                    <p class="text-xs text-red-600 font-bold mt-1">★ 반드시 정렬 필요!</p>
                                </div>
                                <div class="bg-amber-50 rounded-lg p-4">
                                    <h4 class="font-bold text-amber-800 mb-2">해시 검색 (Hash)</h4>
                                    <p class="text-sm text-gray-700">해시 함수로 위치 계산</p>
                                    <p class="text-xs text-gray-600">시간복잡도: O(1)</p>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 시간 복잡도 (Big-O)</h3>
                            <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-4">⚠️ 사람들이 많이 틀린 개념이에요!</span>

                            <div class="space-y-2">
                                <div class="flex items-center gap-3 bg-green-50 rounded-lg p-3">
                                    <span class="w-24 text-center px-2 py-1 bg-green-500 text-white text-xs rounded font-mono">O(1)</span>
                                    <span class="text-sm text-gray-700">상수 시간 - 해시 검색</span>
                                </div>
                                <div class="flex items-center gap-3 bg-green-50 rounded-lg p-3">
                                    <span class="w-24 text-center px-2 py-1 bg-green-400 text-white text-xs rounded font-mono">O(log n)</span>
                                    <span class="text-sm text-gray-700">로그 시간 - 이진 검색</span>
                                </div>
                                <div class="flex items-center gap-3 bg-yellow-50 rounded-lg p-3">
                                    <span class="w-24 text-center px-2 py-1 bg-yellow-500 text-white text-xs rounded font-mono">O(n)</span>
                                    <span class="text-sm text-gray-700">선형 시간 - 순차 검색</span>
                                </div>
                                <div class="flex items-center gap-3 bg-orange-50 rounded-lg p-3">
                                    <span class="w-24 text-center px-2 py-1 bg-orange-500 text-white text-xs rounded font-mono">O(n log n)</span>
                                    <span class="text-sm text-gray-700">퀵/합병/힙 정렬</span>
                                </div>
                                <div class="flex items-center gap-3 bg-red-50 rounded-lg p-3">
                                    <span class="w-24 text-center px-2 py-1 bg-red-500 text-white text-xs rounded font-mono">O(n²)</span>
                                    <span class="text-sm text-gray-700">버블/선택/삽입 정렬</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "packaging",
                title: "제품 소프트웨어 패키징",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 패키징 개요</h3>

                            <div class="bg-purple-50 rounded-lg p-4 mb-4">
                                <p class="text-sm text-gray-700">개발이 완료된 소프트웨어를 고객에게 전달하기 위한 형태로 묶는 것</p>
                            </div>

                            <div class="space-y-3">
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">패키징 고려사항</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• 사용자 시스템 환경 (OS, 하드웨어)</li>
                                        <li>• 직관적인 UI 제공</li>
                                        <li>• 관리 서비스 형태 고려</li>
                                        <li>• 보안 사항 적용</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 릴리즈 노트</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <p class="text-sm text-gray-700 mb-4">소프트웨어 배포 시 제공하는 변경/개선 사항을 정리한 문서</p>

                            <div class="bg-blue-50 rounded-lg p-4">
                                <h4 class="font-bold text-blue-800 mb-2">릴리즈 노트 항목</h4>
                                <ul class="text-sm text-gray-700 space-y-1">
                                    <li>• 헤더 (Header): 제품명, 버전, 날짜</li>
                                    <li>• 개요: 변경사항 요약</li>
                                    <li>• 목적: 변경 이유</li>
                                    <li>• 이슈 요약: 해결된 이슈 목록</li>
                                    <li>• 영향도: 변경으로 인한 영향</li>
                                    <li>• 면책 조항</li>
                                    <li>• 연락처</li>
                                </ul>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 빌드 자동화 도구</h3>

                            <div class="grid md:grid-cols-2 gap-4">
                                <div class="bg-amber-50 rounded-lg p-4">
                                    <h4 class="font-bold text-amber-800">Ant</h4>
                                    <p class="text-sm text-gray-600">Java 프로젝트 빌드, XML 기반</p>
                                </div>
                                <div class="bg-amber-50 rounded-lg p-4">
                                    <h4 class="font-bold text-amber-800">Maven</h4>
                                    <p class="text-sm text-gray-600">의존성 관리, POM.xml</p>
                                </div>
                                <div class="bg-amber-50 rounded-lg p-4">
                                    <h4 class="font-bold text-amber-800">Gradle</h4>
                                    <p class="text-sm text-gray-600">Groovy 기반, 유연한 빌드</p>
                                </div>
                                <div class="bg-amber-50 rounded-lg p-4">
                                    <h4 class="font-bold text-amber-800">Jenkins</h4>
                                    <p class="text-sm text-gray-600">CI/CD 도구, 자동 빌드/배포</p>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 DRM (Digital Rights Management)</h3>
                            <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-4">⚠️ 사람들이 많이 틀린 개념이에요!</span>

                            <p class="text-sm text-gray-700 mb-4">디지털 콘텐츠의 저작권 보호 기술</p>

                            <div class="space-y-3">
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">DRM 구성요소</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• <strong>암호화</strong>: 콘텐츠 암호화</li>
                                        <li>• <strong>키 관리</strong>: 암호화 키 생성/배포</li>
                                        <li>• <strong>인증</strong>: 사용자 인증</li>
                                        <li>• <strong>라이선스 발급</strong>: 사용 권한 부여</li>
                                        <li>• <strong>크랙 방지</strong>: 불법 복제 방지</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        ]
    },
    3: {
        title: "데이터베이스 구축",
        icon: "fa-database",
        color: "blue",
        sections: [
            {
                id: "modeling",
                title: "데이터베이스 설계",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 데이터 모델링 절차</h3>

                            <div class="space-y-3">
                                <div class="flex items-center gap-3 bg-blue-50 rounded-lg p-4">
                                    <span class="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</span>
                                    <div>
                                        <h4 class="font-bold text-blue-800">개념적 설계</h4>
                                        <p class="text-sm text-gray-600">E-R 다이어그램 작성</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 bg-blue-50 rounded-lg p-4">
                                    <span class="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</span>
                                    <div>
                                        <h4 class="font-bold text-blue-800">논리적 설계</h4>
                                        <p class="text-sm text-gray-600">테이블, 정규화 수행</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 bg-blue-50 rounded-lg p-4">
                                    <span class="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">3</span>
                                    <div>
                                        <h4 class="font-bold text-blue-800">물리적 설계</h4>
                                        <p class="text-sm text-gray-600">저장 구조, 인덱스 설계</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 E-R 다이어그램 기호</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="grid grid-cols-2 gap-3">
                                <div class="bg-gray-50 rounded-lg p-3 text-center">
                                    <div class="w-16 h-10 border-2 border-blue-500 mx-auto mb-2"></div>
                                    <p class="text-sm font-bold">사각형: 개체(Entity)</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-3 text-center">
                                    <div class="w-12 h-12 border-2 border-green-500 rounded-full mx-auto mb-2"></div>
                                    <p class="text-sm font-bold">타원: 속성(Attribute)</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-3 text-center">
                                    <div class="w-12 h-12 border-2 border-purple-500 rotate-45 mx-auto mb-2"></div>
                                    <p class="text-sm font-bold">마름모: 관계(Relationship)</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-3 text-center">
                                    <div class="w-16 h-0 border-t-2 border-gray-500 mx-auto mt-5 mb-2"></div>
                                    <p class="text-sm font-bold">선: 연결</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "normal",
                title: "정규화",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 정규화 단계</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>
                            <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-4 ml-2">⚠️ 사람들이 많이 틀린 개념이에요!</span>

                            <div class="highlight-box rounded-lg p-4 mb-4">
                                <p class="font-bold text-amber-800">암기 TIP: "도부이결다조"</p>
                                <p class="text-sm text-gray-700">1NF→2NF→3NF→BCNF→4NF→5NF</p>
                            </div>

                            <div class="space-y-4">
                                <div class="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                                    <h4 class="font-bold text-blue-800">1NF (제1정규형)</h4>
                                    <p class="text-sm text-gray-700"><strong>도메인이 원자값</strong>만 가짐</p>
                                    <p class="text-xs text-gray-500">반복 그룹 제거, 모든 값이 단일 값</p>
                                </div>

                                <div class="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                                    <h4 class="font-bold text-blue-800">2NF (제2정규형)</h4>
                                    <p class="text-sm text-gray-700"><strong>부분 함수 종속 제거</strong></p>
                                    <p class="text-xs text-gray-500">모든 속성이 기본키에 완전 함수 종속</p>
                                </div>

                                <div class="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                                    <h4 class="font-bold text-blue-800">3NF (제3정규형)</h4>
                                    <p class="text-sm text-gray-700"><strong>이행적 함수 종속 제거</strong></p>
                                    <p class="text-xs text-gray-500">A→B, B→C면 A→C 제거</p>
                                </div>

                                <div class="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                                    <h4 class="font-bold text-purple-800">BCNF (보이스-코드 정규형)</h4>
                                    <p class="text-sm text-gray-700"><strong>결정자가 모두 후보키</strong></p>
                                    <p class="text-xs text-gray-500">모든 결정자가 후보키여야 함</p>
                                </div>

                                <div class="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                                    <h4 class="font-bold text-green-800">4NF (제4정규형)</h4>
                                    <p class="text-sm text-gray-700"><strong>다치 종속(MVD) 제거</strong></p>
                                </div>

                                <div class="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                                    <h4 class="font-bold text-green-800">5NF (제5정규형)</h4>
                                    <p class="text-sm text-gray-700"><strong>조인 종속 제거</strong></p>
                                </div>
                            </div>

                            <div class="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                                <p class="text-sm font-bold text-red-800">★ 가장 많이 출제되는 포인트</p>
                                <p class="text-sm text-red-700">1NF: 원자값 | 2NF: 부분종속제거 | 3NF: 이행종속제거</p>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "sql",
                title: "SQL",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 SQL 분류</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="space-y-4">
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800 mb-2">DDL (Data Definition Language)</h4>
                                    <p class="text-sm text-gray-600 mb-2">데이터 정의어 - 구조 정의</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span class="px-2 py-1 bg-blue-200 rounded text-xs font-mono">CREATE</span>
                                        <span class="px-2 py-1 bg-blue-200 rounded text-xs font-mono">ALTER</span>
                                        <span class="px-2 py-1 bg-blue-200 rounded text-xs font-mono">DROP</span>
                                        <span class="px-2 py-1 bg-blue-200 rounded text-xs font-mono">TRUNCATE</span>
                                    </div>
                                </div>

                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-green-800 mb-2">DML (Data Manipulation Language)</h4>
                                    <p class="text-sm text-gray-600 mb-2">데이터 조작어 - 데이터 CRUD</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span class="px-2 py-1 bg-green-200 rounded text-xs font-mono">SELECT</span>
                                        <span class="px-2 py-1 bg-green-200 rounded text-xs font-mono">INSERT</span>
                                        <span class="px-2 py-1 bg-green-200 rounded text-xs font-mono">UPDATE</span>
                                        <span class="px-2 py-1 bg-green-200 rounded text-xs font-mono">DELETE</span>
                                    </div>
                                </div>

                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800 mb-2">DCL (Data Control Language)</h4>
                                    <p class="text-sm text-gray-600 mb-2">데이터 제어어 - 권한 관리</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span class="px-2 py-1 bg-purple-200 rounded text-xs font-mono">GRANT</span>
                                        <span class="px-2 py-1 bg-purple-200 rounded text-xs font-mono">REVOKE</span>
                                    </div>
                                </div>

                                <div class="bg-amber-50 rounded-lg p-4">
                                    <h4 class="font-bold text-amber-800 mb-2">TCL (Transaction Control Language)</h4>
                                    <p class="text-sm text-gray-600 mb-2">트랜잭션 제어어</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span class="px-2 py-1 bg-amber-200 rounded text-xs font-mono">COMMIT</span>
                                        <span class="px-2 py-1 bg-amber-200 rounded text-xs font-mono">ROLLBACK</span>
                                        <span class="px-2 py-1 bg-amber-200 rounded text-xs font-mono">SAVEPOINT</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 JOIN 종류</h3>
                            <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-4">⚠️ 사람들이 많이 틀린 개념이에요!</span>

                            <div class="space-y-3">
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">INNER JOIN</h4>
                                    <p class="text-sm text-gray-600">양쪽 테이블에 모두 있는 데이터만 반환</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">LEFT OUTER JOIN</h4>
                                    <p class="text-sm text-gray-600">왼쪽 테이블의 모든 데이터 + 매칭되는 오른쪽 데이터</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">RIGHT OUTER JOIN</h4>
                                    <p class="text-sm text-gray-600">오른쪽 테이블의 모든 데이터 + 매칭되는 왼쪽 데이터</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">FULL OUTER JOIN</h4>
                                    <p class="text-sm text-gray-600">양쪽 테이블의 모든 데이터</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">CROSS JOIN</h4>
                                    <p class="text-sm text-gray-600">카티션 곱 (모든 조합)</p>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 트랜잭션 특성 (ACID)</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="grid md:grid-cols-2 gap-3">
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800">Atomicity (원자성)</h4>
                                    <p class="text-sm text-gray-600">All or Nothing, 완전 실행 또는 전혀 실행 안됨</p>
                                </div>
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800">Consistency (일관성)</h4>
                                    <p class="text-sm text-gray-600">트랜잭션 전후 DB 상태 일관 유지</p>
                                </div>
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800">Isolation (독립성/격리성)</h4>
                                    <p class="text-sm text-gray-600">트랜잭션 간 간섭 없음</p>
                                </div>
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800">Durability (영속성/지속성)</h4>
                                    <p class="text-sm text-gray-600">완료된 트랜잭션 결과 영구 보존</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "physical",
                title: "물리적 데이터베이스 설계",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 인덱스 (Index)</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <p class="text-sm text-gray-700 mb-4">데이터 검색 속도를 향상시키기 위한 자료구조</p>

                            <div class="space-y-3">
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800 mb-2">인덱스 종류</h4>
                                    <ul class="text-sm text-gray-700 space-y-2">
                                        <li>• <strong>B-Tree 인덱스</strong>: 가장 일반적, 균형 트리</li>
                                        <li>• <strong>B+Tree 인덱스</strong>: 리프 노드에만 데이터, 순차 접근 효율적</li>
                                        <li>• <strong>해시 인덱스</strong>: 해시 함수 사용, 동등 비교에 효율적</li>
                                        <li>• <strong>비트맵 인덱스</strong>: 값의 종류가 적을 때 효율적</li>
                                    </ul>
                                </div>

                                <div class="bg-amber-50 rounded-lg p-4">
                                    <h4 class="font-bold text-amber-800 mb-2">클러스터 인덱스 vs 비클러스터 인덱스</h4>
                                    <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-2">⚠️ 사람들이 많이 틀린 개념이에요!</span>
                                    <ul class="text-sm text-gray-700 space-y-2">
                                        <li>• <strong>클러스터 인덱스</strong>: 데이터를 인덱스 순서로 물리적 정렬, 테이블당 1개</li>
                                        <li>• <strong>비클러스터 인덱스</strong>: 별도 인덱스 페이지 생성, 여러 개 가능</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 뷰 (View)</h3>

                            <p class="text-sm text-gray-700 mb-4">기본 테이블로부터 유도된 가상 테이블</p>

                            <div class="space-y-3">
                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-green-800 mb-2">뷰의 특징</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• 논리적 데이터 독립성 제공</li>
                                        <li>• 데이터 접근 제어 (보안)</li>
                                        <li>• 사용자별 다양한 관점 제공</li>
                                        <li>• 기본 테이블과 같은 형태의 구조</li>
                                    </ul>
                                </div>

                                <div class="bg-red-50 rounded-lg p-4">
                                    <h4 class="font-bold text-red-800 mb-2">뷰의 제약사항</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• ALTER로 변경 불가 (DROP 후 재생성)</li>
                                        <li>• 인덱스 생성 불가</li>
                                        <li>• 집계 함수 사용 뷰는 갱신 불가</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 파티션 (Partition)</h3>

                            <p class="text-sm text-gray-700 mb-4">대용량 테이블을 여러 개의 작은 단위로 나누는 기법</p>

                            <div class="space-y-3">
                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800 mb-2">파티션 유형</h4>
                                    <ul class="text-sm text-gray-700 space-y-2">
                                        <li>• <strong>범위 파티션 (Range)</strong>: 특정 범위로 분할 (날짜, 숫자)</li>
                                        <li>• <strong>해시 파티션 (Hash)</strong>: 해시 함수로 균등 분배</li>
                                        <li>• <strong>리스트 파티션 (List)</strong>: 특정 값 목록으로 분할</li>
                                        <li>• <strong>컴포지트 파티션</strong>: 위 방식 조합</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 클러스터 (Cluster)</h3>

                            <p class="text-sm text-gray-700 mb-4">자주 사용되는 테이블을 동일한 위치에 저장</p>

                            <div class="bg-blue-50 rounded-lg p-4">
                                <h4 class="font-bold text-blue-800 mb-2">클러스터 장점</h4>
                                <ul class="text-sm text-gray-700 space-y-1">
                                    <li>• 조인 성능 향상</li>
                                    <li>• 그룹화된 데이터 접근 효율적</li>
                                    <li>• 디스크 I/O 감소</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "adv_sql",
                title: "고급 SQL 활용",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 조인 (JOIN)</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="space-y-3">
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800">INNER JOIN</h4>
                                    <p class="text-sm text-gray-600">양쪽 테이블 모두 조건을 만족하는 행만</p>
                                    <code class="text-xs bg-gray-100 p-1 rounded">SELECT * FROM A INNER JOIN B ON A.id = B.id</code>
                                </div>
                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-green-800">LEFT OUTER JOIN</h4>
                                    <p class="text-sm text-gray-600">왼쪽 테이블의 모든 행 + 매칭되는 오른쪽 행</p>
                                </div>
                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800">RIGHT OUTER JOIN</h4>
                                    <p class="text-sm text-gray-600">오른쪽 테이블의 모든 행 + 매칭되는 왼쪽 행</p>
                                </div>
                                <div class="bg-amber-50 rounded-lg p-4">
                                    <h4 class="font-bold text-amber-800">FULL OUTER JOIN</h4>
                                    <p class="text-sm text-gray-600">양쪽 테이블의 모든 행</p>
                                </div>
                                <div class="bg-red-50 rounded-lg p-4">
                                    <h4 class="font-bold text-red-800">CROSS JOIN</h4>
                                    <p class="text-sm text-gray-600">카티션 곱 (모든 조합)</p>
                                </div>
                                <div class="bg-indigo-50 rounded-lg p-4">
                                    <h4 class="font-bold text-indigo-800">SELF JOIN</h4>
                                    <p class="text-sm text-gray-600">같은 테이블끼리 조인</p>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 서브쿼리 (Subquery)</h3>
                            <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-4">⚠️ 사람들이 많이 틀린 개념이에요!</span>

                            <div class="space-y-3">
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">단일행 서브쿼리</h4>
                                    <p class="text-sm text-gray-600">결과가 1행 1열, 비교연산자 사용 (=, >, <)</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">다중행 서브쿼리</h4>
                                    <p class="text-sm text-gray-600">결과가 여러 행, IN, ANY, ALL, EXISTS 사용</p>
                                    <ul class="text-xs text-gray-500 mt-2 space-y-1">
                                        <li>• IN: 목록 중 하나와 일치</li>
                                        <li>• ANY: 하나라도 만족</li>
                                        <li>• ALL: 모두 만족</li>
                                        <li>• EXISTS: 존재 여부 확인</li>
                                    </ul>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">다중열 서브쿼리</h4>
                                    <p class="text-sm text-gray-600">결과가 여러 열</p>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 집합 연산자</h3>

                            <div class="grid md:grid-cols-2 gap-4">
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800">UNION</h4>
                                    <p class="text-sm text-gray-600">합집합 (중복 제거)</p>
                                </div>
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800">UNION ALL</h4>
                                    <p class="text-sm text-gray-600">합집합 (중복 포함)</p>
                                </div>
                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-green-800">INTERSECT</h4>
                                    <p class="text-sm text-gray-600">교집합</p>
                                </div>
                                <div class="bg-red-50 rounded-lg p-4">
                                    <h4 class="font-bold text-red-800">EXCEPT / MINUS</h4>
                                    <p class="text-sm text-gray-600">차집합</p>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 윈도우 함수</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="space-y-3">
                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800 mb-2">순위 함수</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• <strong>ROW_NUMBER()</strong>: 고유 순위 (1,2,3,4,5)</li>
                                        <li>• <strong>RANK()</strong>: 동점 시 같은 순위, 다음 건너뜀 (1,2,2,4)</li>
                                        <li>• <strong>DENSE_RANK()</strong>: 동점 시 같은 순위, 연속 (1,2,2,3)</li>
                                    </ul>
                                </div>
                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-green-800 mb-2">집계 함수</h4>
                                    <p class="text-sm text-gray-600">SUM, AVG, COUNT, MAX, MIN을 OVER()와 함께 사용</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        ]
    },
    4: {
        title: "프로그래밍 언어 활용",
        icon: "fa-terminal",
        color: "green",
        sections: [
            {
                id: "basic",
                title: "프로그래밍 기초",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 변수와 자료형</h3>

                            <div class="space-y-4">
                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-green-800 mb-2">C언어 기본 자료형</h4>
                                    <div class="grid grid-cols-2 gap-2 text-sm">
                                        <div><code class="bg-gray-200 px-1 rounded">char</code> - 1바이트</div>
                                        <div><code class="bg-gray-200 px-1 rounded">short</code> - 2바이트</div>
                                        <div><code class="bg-gray-200 px-1 rounded">int</code> - 4바이트</div>
                                        <div><code class="bg-gray-200 px-1 rounded">long</code> - 4바이트</div>
                                        <div><code class="bg-gray-200 px-1 rounded">float</code> - 4바이트</div>
                                        <div><code class="bg-gray-200 px-1 rounded">double</code> - 8바이트</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 연산자 우선순위</h3>
                            <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-4">⚠️ 사람들이 많이 틀린 개념이에요!</span>

                            <div class="bg-gray-50 rounded-lg p-4">
                                <p class="text-sm text-gray-700 mb-2">높음 → 낮음</p>
                                <ol class="text-sm space-y-1">
                                    <li>1. 괄호 (), 배열 [], 멤버 . -></li>
                                    <li>2. 단항 연산자 !, ~, ++, --, sizeof</li>
                                    <li>3. 산술 연산자 *, /, %, +, -</li>
                                    <li>4. 시프트 연산자 <<, >></li>
                                    <li>5. 관계 연산자 <, >, <=, >=, ==, !=</li>
                                    <li>6. 비트 연산자 &, ^, |</li>
                                    <li>7. 논리 연산자 &&, ||</li>
                                    <li>8. 조건 연산자 ?:</li>
                                    <li>9. 대입 연산자 =, +=, -= 등</li>
                                    <li>10. 콤마 연산자 ,</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "output",
                title: "출력 문제 유형",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 C언어 출력 예제</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="bg-gray-900 rounded-lg p-4 mb-4">
                                <pre class="text-green-400 text-sm"><code>#include &lt;stdio.h&gt;
int main() {
    int a = 5, b = 3;
    printf("%d", a + b);  // 출력: 8
    printf("%d", a % b);  // 출력: 2 (나머지)
    printf("%d", a / b);  // 출력: 1 (정수 나눗셈)
    return 0;
}</code></pre>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 포인터</h3>
                            <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-4">⚠️ 사람들이 많이 틀린 개념이에요!</span>

                            <div class="bg-gray-900 rounded-lg p-4 mb-4">
                                <pre class="text-green-400 text-sm"><code>int a = 10;
int *p = &a;  // p는 a의 주소를 저장
printf("%d", *p);  // 출력: 10 (p가 가리키는 값)
printf("%p", p);   // 출력: a의 주소</code></pre>
                            </div>

                            <div class="p-4 bg-red-50 rounded-lg border border-red-200">
                                <p class="text-sm font-bold text-red-800">★ 핵심 암기</p>
                                <p class="text-sm text-red-700">& : 주소 연산자 (변수의 주소)</p>
                                <p class="text-sm text-red-700">* : 역참조 연산자 (주소의 값)</p>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 배열과 반복문</h3>

                            <div class="bg-gray-900 rounded-lg p-4 mb-4">
                                <pre class="text-green-400 text-sm"><code>int arr[5] = {1, 2, 3, 4, 5};
int sum = 0;
for(int i = 0; i < 5; i++) {
    sum += arr[i];
}
printf("%d", sum);  // 출력: 15</code></pre>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "java",
                title: "Java/Python",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 Java 기본 문법</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="bg-gray-900 rounded-lg p-4 mb-4">
                                <pre class="text-green-400 text-sm"><code>public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        int sum = 0;
        for(int num : arr) {  // 향상된 for문
            sum += num;
        }
        System.out.println(sum);  // 출력: 15
    }
}</code></pre>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 Python 기본 문법</h3>

                            <div class="bg-gray-900 rounded-lg p-4 mb-4">
                                <pre class="text-green-400 text-sm"><code>arr = [1, 2, 3, 4, 5]
print(sum(arr))  # 출력: 15

# 리스트 컴프리헨션
squares = [x**2 for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]

# 슬라이싱
print(arr[1:4])  # [2, 3, 4]
print(arr[::-1]) # [5, 4, 3, 2, 1] (역순)</code></pre>
                            </div>

                            <div class="p-4 bg-amber-50 rounded-lg border border-amber-200">
                                <p class="text-sm font-bold text-amber-800">★ Python 슬라이싱 암기</p>
                                <p class="text-sm text-amber-700">arr[start:end:step]</p>
                                <p class="text-sm text-amber-700">start 포함, end 미포함</p>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "os",
                title: "운영체제",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 프로세스 상태</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="space-y-2">
                                <div class="flex items-center gap-3 bg-blue-50 rounded-lg p-3">
                                    <span class="w-24 px-2 py-1 bg-blue-500 text-white text-xs rounded text-center">생성 (New)</span>
                                    <span class="text-sm text-gray-700">프로세스 생성 중</span>
                                </div>
                                <div class="flex items-center gap-3 bg-green-50 rounded-lg p-3">
                                    <span class="w-24 px-2 py-1 bg-green-500 text-white text-xs rounded text-center">준비 (Ready)</span>
                                    <span class="text-sm text-gray-700">CPU 할당 대기</span>
                                </div>
                                <div class="flex items-center gap-3 bg-amber-50 rounded-lg p-3">
                                    <span class="w-24 px-2 py-1 bg-amber-500 text-white text-xs rounded text-center">실행 (Running)</span>
                                    <span class="text-sm text-gray-700">CPU 점유하여 실행 중</span>
                                </div>
                                <div class="flex items-center gap-3 bg-purple-50 rounded-lg p-3">
                                    <span class="w-24 px-2 py-1 bg-purple-500 text-white text-xs rounded text-center">대기 (Waiting)</span>
                                    <span class="text-sm text-gray-700">I/O 완료 대기</span>
                                </div>
                                <div class="flex items-center gap-3 bg-red-50 rounded-lg p-3">
                                    <span class="w-24 px-2 py-1 bg-red-500 text-white text-xs rounded text-center">종료 (Exit)</span>
                                    <span class="text-sm text-gray-700">프로세스 종료</span>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 CPU 스케줄링</h3>
                            <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-4">⚠️ 사람들이 많이 틀린 개념이에요!</span>

                            <div class="space-y-4">
                                <div class="bg-indigo-50 rounded-lg p-4">
                                    <h4 class="font-bold text-indigo-800 mb-2">선점형 스케줄링</h4>
                                    <p class="text-sm text-gray-600 mb-2">실행 중인 프로세스를 중단하고 다른 프로세스에 CPU 할당</p>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• <strong>RR (Round Robin)</strong>: 시간 할당량(Time Quantum) 순환</li>
                                        <li>• <strong>SRT</strong>: 잔여 시간 가장 짧은 것 우선</li>
                                        <li>• <strong>다단계 큐</strong>: 여러 큐에 우선순위 부여</li>
                                    </ul>
                                </div>

                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800 mb-2">비선점형 스케줄링</h4>
                                    <p class="text-sm text-gray-600 mb-2">실행 중인 프로세스 완료까지 대기</p>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• <strong>FCFS (FIFO)</strong>: 도착 순서대로</li>
                                        <li>• <strong>SJF</strong>: 실행 시간 짧은 것 우선</li>
                                        <li>• <strong>우선순위</strong>: 높은 우선순위 먼저</li>
                                        <li>• <strong>HRN</strong>: (대기시간+실행시간)/실행시간</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 교착상태 (Deadlock)</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <p class="text-sm text-gray-700 mb-4">두 개 이상의 프로세스가 서로 자원을 기다리며 무한 대기</p>

                            <div class="bg-red-50 rounded-lg p-4 mb-4">
                                <h4 class="font-bold text-red-800 mb-2">교착상태 발생 4가지 조건</h4>
                                <ul class="text-sm text-gray-700 space-y-1">
                                    <li>• <strong>상호 배제 (Mutual Exclusion)</strong>: 한 자원을 한 프로세스만 사용</li>
                                    <li>• <strong>점유와 대기 (Hold & Wait)</strong>: 자원 보유하며 다른 자원 대기</li>
                                    <li>• <strong>비선점 (No Preemption)</strong>: 강제로 자원 뺏을 수 없음</li>
                                    <li>• <strong>환형 대기 (Circular Wait)</strong>: 순환적으로 대기</li>
                                </ul>
                            </div>

                            <div class="bg-green-50 rounded-lg p-4">
                                <h4 class="font-bold text-green-800 mb-2">교착상태 해결 방법</h4>
                                <ul class="text-sm text-gray-700 space-y-1">
                                    <li>• <strong>예방</strong>: 4조건 중 하나 제거</li>
                                    <li>• <strong>회피</strong>: 은행원 알고리즘</li>
                                    <li>• <strong>탐지</strong>: 자원할당 그래프</li>
                                    <li>• <strong>복구</strong>: 프로세스 종료, 자원 선점</li>
                                </ul>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 메모리 관리</h3>

                            <div class="space-y-4">
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800 mb-2">페이징 (Paging)</h4>
                                    <p class="text-sm text-gray-700">메모리를 동일 크기의 페이지로 분할</p>
                                    <p class="text-xs text-gray-600">내부 단편화 발생</p>
                                </div>
                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800 mb-2">세그먼테이션 (Segmentation)</h4>
                                    <p class="text-sm text-gray-700">논리적 단위(세그먼트)로 분할</p>
                                    <p class="text-xs text-gray-600">외부 단편화 발생</p>
                                </div>
                            </div>

                            <div class="mt-4 bg-amber-50 rounded-lg p-4">
                                <h4 class="font-bold text-amber-800 mb-2">페이지 교체 알고리즘</h4>
                                <ul class="text-sm text-gray-700 space-y-1">
                                    <li>• <strong>FIFO</strong>: 가장 먼저 적재된 페이지 교체</li>
                                    <li>• <strong>LRU</strong>: 가장 오래 사용되지 않은 페이지 교체</li>
                                    <li>• <strong>LFU</strong>: 사용 빈도 가장 낮은 페이지 교체</li>
                                    <li>• <strong>OPT</strong>: 가장 오래 사용되지 않을 페이지 교체 (이론적 최적)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "pointer",
                title: "포인터와 메모리",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 포인터 기초</h3>
                            <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-4">⚠️ 사람들이 많이 틀린 개념이에요!</span>

                            <div class="bg-green-50 rounded-lg p-4 mb-4">
                                <p class="text-sm text-gray-700 mb-2">포인터: 메모리 주소를 저장하는 변수</p>
                                <ul class="text-sm text-gray-700 space-y-1">
                                    <li>• <strong>&</strong>: 주소 연산자 (변수의 주소 반환)</li>
                                    <li>• <strong>*</strong>: 역참조 연산자 (주소의 값 반환)</li>
                                </ul>
                            </div>

                            <div class="bg-gray-900 rounded-lg p-4">
                                <pre class="text-green-400 text-sm"><code>int a = 10;
int *p = &a;   // p는 a의 주소를 저장

printf("%d", a);   // 10 (값)
printf("%p", &a);  // 주소 출력
printf("%p", p);   // 주소 출력 (위와 동일)
printf("%d", *p);  // 10 (역참조)</code></pre>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 배열과 포인터</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="bg-gray-900 rounded-lg p-4 mb-4">
                                <pre class="text-green-400 text-sm"><code>int arr[5] = {1, 2, 3, 4, 5};
int *p = arr;    // 배열명은 첫 요소의 주소

printf("%d", arr[0]);    // 1
printf("%d", *arr);      // 1
printf("%d", *p);        // 1
printf("%d", *(p+2));    // 3 (포인터 연산)
printf("%d", p[2]);      // 3</code></pre>
                            </div>

                            <div class="bg-red-50 rounded-lg p-4">
                                <p class="text-sm font-bold text-red-800">★ 핵심 암기</p>
                                <p class="text-sm text-red-700">arr[i] == *(arr + i) == *(p + i) == p[i]</p>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 2차원 배열</h3>

                            <div class="bg-gray-900 rounded-lg p-4 mb-4">
                                <pre class="text-green-400 text-sm"><code>int arr[2][3] = {{1,2,3}, {4,5,6}};

printf("%d", arr[1][2]);  // 6
printf("%d", *(*(arr+1)+2)); // 6
printf("%d", *(arr[1]+2));   // 6</code></pre>
                            </div>

                            <div class="bg-blue-50 rounded-lg p-4">
                                <h4 class="font-bold text-blue-800 mb-2">2차원 배열 메모리 배치</h4>
                                <p class="text-sm text-gray-700">행 우선 저장 (Row-major order)</p>
                                <p class="text-xs text-gray-600">arr[0][0], arr[0][1], arr[0][2], arr[1][0], ...</p>
                            </div>
                        </div>
                    </div>
                `
            }
        ]
    },
    5: {
        title: "정보시스템 구축관리",
        icon: "fa-shield-alt",
        color: "orange",
        sections: [
            {
                id: "security",
                title: "정보보안",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 보안 3요소 (CIA)</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="grid md:grid-cols-3 gap-3">
                                <div class="bg-orange-50 rounded-lg p-4">
                                    <h4 class="font-bold text-orange-800">기밀성 (Confidentiality)</h4>
                                    <p class="text-sm text-gray-600">인가된 사용자만 접근</p>
                                </div>
                                <div class="bg-orange-50 rounded-lg p-4">
                                    <h4 class="font-bold text-orange-800">무결성 (Integrity)</h4>
                                    <p class="text-sm text-gray-600">비인가 수정 방지</p>
                                </div>
                                <div class="bg-orange-50 rounded-lg p-4">
                                    <h4 class="font-bold text-orange-800">가용성 (Availability)</h4>
                                    <p class="text-sm text-gray-600">필요할 때 사용 가능</p>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 암호화 방식</h3>
                            <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-4">⚠️ 사람들이 많이 틀린 개념이에요!</span>

                            <div class="space-y-4">
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800 mb-2">대칭키 (비밀키) 암호화</h4>
                                    <p class="text-sm text-gray-700 mb-2">암호화/복호화 키가 동일</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span class="px-2 py-1 bg-blue-200 rounded text-xs">DES</span>
                                        <span class="px-2 py-1 bg-blue-200 rounded text-xs">3DES</span>
                                        <span class="px-2 py-1 bg-blue-200 rounded text-xs">AES</span>
                                        <span class="px-2 py-1 bg-blue-200 rounded text-xs">SEED</span>
                                        <span class="px-2 py-1 bg-blue-200 rounded text-xs">ARIA</span>
                                    </div>
                                </div>

                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-green-800 mb-2">비대칭키 (공개키) 암호화</h4>
                                    <p class="text-sm text-gray-700 mb-2">암호화/복호화 키가 다름 (공개키, 개인키)</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span class="px-2 py-1 bg-green-200 rounded text-xs">RSA</span>
                                        <span class="px-2 py-1 bg-green-200 rounded text-xs">ECC</span>
                                        <span class="px-2 py-1 bg-green-200 rounded text-xs">DSA</span>
                                    </div>
                                </div>

                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800 mb-2">해시 함수</h4>
                                    <p class="text-sm text-gray-700 mb-2">일방향 암호화 (복호화 불가)</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span class="px-2 py-1 bg-purple-200 rounded text-xs">MD5</span>
                                        <span class="px-2 py-1 bg-purple-200 rounded text-xs">SHA</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 주요 보안 공격</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="space-y-3">
                                <div class="bg-red-50 rounded-lg p-4">
                                    <h4 class="font-bold text-red-800">SQL Injection</h4>
                                    <p class="text-sm text-gray-600">입력값에 SQL 구문 삽입하여 DB 조작</p>
                                </div>
                                <div class="bg-red-50 rounded-lg p-4">
                                    <h4 class="font-bold text-red-800">XSS (Cross Site Scripting)</h4>
                                    <p class="text-sm text-gray-600">악성 스크립트 삽입, 사용자 브라우저에서 실행</p>
                                </div>
                                <div class="bg-red-50 rounded-lg p-4">
                                    <h4 class="font-bold text-red-800">CSRF (Cross Site Request Forgery)</h4>
                                    <p class="text-sm text-gray-600">사용자 의지와 무관하게 공격자 의도 행위 실행</p>
                                </div>
                                <div class="bg-red-50 rounded-lg p-4">
                                    <h4 class="font-bold text-red-800">DDoS (Distributed Denial of Service)</h4>
                                    <p class="text-sm text-gray-600">다수의 시스템으로 서버에 과부하</p>
                                </div>
                                <div class="bg-red-50 rounded-lg p-4">
                                    <h4 class="font-bold text-red-800">랜섬웨어 (Ransomware)</h4>
                                    <p class="text-sm text-gray-600">파일 암호화 후 금전 요구</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "network",
                title: "네트워크",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 OSI 7계층</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>
                            <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-4 ml-2">⚠️ 사람들이 많이 틀린 개념이에요!</span>

                            <div class="highlight-box rounded-lg p-4 mb-4">
                                <p class="font-bold text-amber-800">암기 TIP: "아파서 티나다 피"</p>
                                <p class="text-sm text-gray-700">응용-표현-세션-전송-네트워크-데이터링크-물리</p>
                            </div>

                            <div class="space-y-2">
                                <div class="flex items-center gap-3 bg-purple-50 rounded-lg p-3">
                                    <span class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">7</span>
                                    <div class="flex-1">
                                        <span class="font-bold text-purple-800">응용 계층</span>
                                        <span class="text-sm text-gray-600 ml-2">HTTP, FTP, SMTP</span>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 bg-purple-50 rounded-lg p-3">
                                    <span class="w-8 h-8 bg-purple-400 text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
                                    <div class="flex-1">
                                        <span class="font-bold text-purple-800">표현 계층</span>
                                        <span class="text-sm text-gray-600 ml-2">암호화, 압축, JPEG, MPEG</span>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 bg-purple-50 rounded-lg p-3">
                                    <span class="w-8 h-8 bg-purple-300 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                                    <div class="flex-1">
                                        <span class="font-bold text-purple-800">세션 계층</span>
                                        <span class="text-sm text-gray-600 ml-2">연결 설정/해제, SSL</span>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 bg-blue-50 rounded-lg p-3">
                                    <span class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                                    <div class="flex-1">
                                        <span class="font-bold text-blue-800">전송 계층</span>
                                        <span class="text-sm text-gray-600 ml-2">TCP, UDP | 포트 번호</span>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 bg-green-50 rounded-lg p-3">
                                    <span class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                                    <div class="flex-1">
                                        <span class="font-bold text-green-800">네트워크 계층</span>
                                        <span class="text-sm text-gray-600 ml-2">IP, ICMP, 라우터 | IP 주소</span>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 bg-yellow-50 rounded-lg p-3">
                                    <span class="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                                    <div class="flex-1">
                                        <span class="font-bold text-yellow-800">데이터링크 계층</span>
                                        <span class="text-sm text-gray-600 ml-2">이더넷, 스위치 | MAC 주소</span>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 bg-orange-50 rounded-lg p-3">
                                    <span class="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                                    <div class="flex-1">
                                        <span class="font-bold text-orange-800">물리 계층</span>
                                        <span class="text-sm text-gray-600 ml-2">케이블, 허브 | 비트</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 주요 프로토콜</h3>

                            <div class="grid md:grid-cols-2 gap-3">
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">TCP</h4>
                                    <p class="text-sm text-gray-600">연결형, 신뢰성, 3-way handshake</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">UDP</h4>
                                    <p class="text-sm text-gray-600">비연결형, 빠름, 신뢰성 낮음</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">HTTP</h4>
                                    <p class="text-sm text-gray-600">웹 문서 전송, 포트 80</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">HTTPS</h4>
                                    <p class="text-sm text-gray-600">HTTP + SSL/TLS, 포트 443</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">FTP</h4>
                                    <p class="text-sm text-gray-600">파일 전송, 포트 20/21</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">SMTP</h4>
                                    <p class="text-sm text-gray-600">메일 송신, 포트 25</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "sw_eng",
                title: "소프트웨어 공학",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 소프트웨어 비용 산정</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="space-y-4">
                                <div class="bg-orange-50 rounded-lg p-4">
                                    <h4 class="font-bold text-orange-800 mb-2">하향식 (전문가 기반)</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• 전문가 판단</li>
                                        <li>• 델파이 기법</li>
                                    </ul>
                                </div>

                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800 mb-2">상향식 (코드 기반)</h4>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• LOC (Line of Code) 기법</li>
                                        <li>• Man Month 기법</li>
                                        <li>• COCOMO 모델</li>
                                        <li>• Putnam 모델</li>
                                        <li>• FP (Function Point)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 COCOMO 모델</h3>
                            <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-4">⚠️ 사람들이 많이 틀린 개념이에요!</span>

                            <div class="space-y-3">
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">Organic (조직형)</h4>
                                    <p class="text-sm text-gray-600">소규모, 5만 라인 이하</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">Semi-Detached (반분리형)</h4>
                                    <p class="text-sm text-gray-600">중규모, 30만 라인 이하</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">Embedded (임베디드형)</h4>
                                    <p class="text-sm text-gray-600">대규모, 30만 라인 이상</p>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 일정 관리 (CPM/PERT)</h3>

                            <div class="grid md:grid-cols-2 gap-4">
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800">CPM (Critical Path Method)</h4>
                                    <p class="text-sm text-gray-600">임계 경로법, 가장 긴 경로 찾기</p>
                                </div>
                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-green-800">PERT</h4>
                                    <p class="text-sm text-gray-600">확률적 예측, 낙관/기대/비관치 사용</p>
                                </div>
                            </div>

                            <div class="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                                <p class="text-sm font-bold text-amber-800">★ PERT 기대시간 공식</p>
                                <p class="text-sm text-amber-700 font-mono">TE = (낙관치 + 4×기대치 + 비관치) / 6</p>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "attack",
                title: "보안 공격 유형",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 네트워크 공격</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="space-y-3">
                                <div class="bg-red-50 rounded-lg p-4">
                                    <h4 class="font-bold text-red-800">DoS (Denial of Service)</h4>
                                    <p class="text-sm text-gray-600">서비스 거부 공격, 시스템 자원 고갈</p>
                                </div>
                                <div class="bg-red-50 rounded-lg p-4">
                                    <h4 class="font-bold text-red-800">DDoS (Distributed DoS)</h4>
                                    <p class="text-sm text-gray-600">분산 서비스 거부 공격, 다수 시스템 이용</p>
                                </div>
                                <div class="bg-red-50 rounded-lg p-4">
                                    <h4 class="font-bold text-red-800">스니핑 (Sniffing)</h4>
                                    <p class="text-sm text-gray-600">네트워크 패킷 도청</p>
                                </div>
                                <div class="bg-red-50 rounded-lg p-4">
                                    <h4 class="font-bold text-red-800">스푸핑 (Spoofing)</h4>
                                    <p class="text-sm text-gray-600">신뢰된 시스템으로 위장 (IP/ARP/DNS)</p>
                                </div>
                                <div class="bg-red-50 rounded-lg p-4">
                                    <h4 class="font-bold text-red-800">세션 하이재킹</h4>
                                    <p class="text-sm text-gray-600">인증된 세션 가로채기</p>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 웹 공격 (OWASP Top 10)</h3>
                            <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-4">⚠️ 사람들이 많이 틀린 개념이에요!</span>

                            <div class="space-y-3">
                                <div class="bg-orange-50 rounded-lg p-4">
                                    <h4 class="font-bold text-orange-800">SQL Injection</h4>
                                    <p class="text-sm text-gray-600">입력값에 SQL 삽입하여 DB 조작</p>
                                    <p class="text-xs text-blue-600 mt-1">대응: Prepared Statement, 입력값 검증</p>
                                </div>
                                <div class="bg-orange-50 rounded-lg p-4">
                                    <h4 class="font-bold text-orange-800">XSS (Cross-Site Scripting)</h4>
                                    <p class="text-sm text-gray-600">악성 스크립트 삽입하여 실행</p>
                                    <p class="text-xs text-blue-600 mt-1">대응: 입출력 값 필터링, 이스케이프 처리</p>
                                </div>
                                <div class="bg-orange-50 rounded-lg p-4">
                                    <h4 class="font-bold text-orange-800">CSRF (Cross-Site Request Forgery)</h4>
                                    <p class="text-sm text-gray-600">사용자 모르게 요청 위조</p>
                                    <p class="text-xs text-blue-600 mt-1">대응: 토큰 사용, Referer 검증</p>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 악성코드 유형</h3>

                            <div class="grid md:grid-cols-2 gap-3">
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">바이러스 (Virus)</h4>
                                    <p class="text-sm text-gray-600">다른 프로그램에 기생, 복제</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">웜 (Worm)</h4>
                                    <p class="text-sm text-gray-600">자가 복제, 네트워크 전파</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">트로이목마 (Trojan)</h4>
                                    <p class="text-sm text-gray-600">정상 프로그램 위장, 백도어</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">랜섬웨어 (Ransomware)</h4>
                                    <p class="text-sm text-gray-600">파일 암호화 후 금품 요구</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">스파이웨어 (Spyware)</h4>
                                    <p class="text-sm text-gray-600">사용자 정보 몰래 수집</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">애드웨어 (Adware)</h4>
                                    <p class="text-sm text-gray-600">광고 강제 노출</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "crypto",
                title: "암호화",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 암호화 방식</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="grid md:grid-cols-2 gap-4">
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800 mb-2">대칭키 (비밀키)</h4>
                                    <p class="text-sm text-gray-700 mb-2">암호화/복호화 키 동일</p>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• DES (64bit 블록)</li>
                                        <li>• 3DES</li>
                                        <li>• <strong>AES</strong> (128/192/256bit)</li>
                                        <li>• SEED (국내 표준)</li>
                                        <li>• ARIA (국내 표준)</li>
                                    </ul>
                                    <p class="text-xs text-green-600 mt-2">장점: 빠름</p>
                                    <p class="text-xs text-red-600">단점: 키 배송 문제</p>
                                </div>
                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800 mb-2">비대칭키 (공개키)</h4>
                                    <p class="text-sm text-gray-700 mb-2">암호화/복호화 키 다름</p>
                                    <ul class="text-sm text-gray-700 space-y-1">
                                        <li>• <strong>RSA</strong> (소인수 분해)</li>
                                        <li>• DSA (전자서명)</li>
                                        <li>• ECC (타원곡선)</li>
                                    </ul>
                                    <p class="text-xs text-green-600 mt-2">장점: 키 배송 안전</p>
                                    <p class="text-xs text-red-600">단점: 느림</p>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 해시 함수</h3>
                            <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-4">⚠️ 사람들이 많이 틀린 개념이에요!</span>

                            <p class="text-sm text-gray-700 mb-4">임의 길이 입력 → 고정 길이 출력 (일방향)</p>

                            <div class="space-y-3">
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">MD5</h4>
                                    <p class="text-sm text-gray-600">128bit, 보안 취약 (충돌 발견)</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">SHA-1</h4>
                                    <p class="text-sm text-gray-600">160bit, 보안 취약</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">SHA-256</h4>
                                    <p class="text-sm text-gray-600">256bit, 현재 권장</p>
                                </div>
                            </div>

                            <div class="mt-4 bg-amber-50 rounded-lg p-4">
                                <p class="text-sm font-bold text-amber-800">해시 특징</p>
                                <ul class="text-sm text-amber-700 space-y-1">
                                    <li>• 일방향: 복호화 불가</li>
                                    <li>• 고정 길이 출력</li>
                                    <li>• 눈사태 효과: 입력 1bit 변경 시 출력 크게 변화</li>
                                </ul>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 전자서명</h3>

                            <div class="bg-green-50 rounded-lg p-4 mb-4">
                                <p class="text-sm text-gray-700 mb-2">송신자의 <strong>개인키</strong>로 서명, 수신자의 <strong>공개키</strong>로 검증</p>
                            </div>

                            <div class="bg-blue-50 rounded-lg p-4">
                                <h4 class="font-bold text-blue-800 mb-2">전자서명 특징</h4>
                                <ul class="text-sm text-gray-700 space-y-1">
                                    <li>• <strong>인증</strong>: 서명자 신원 확인</li>
                                    <li>• <strong>무결성</strong>: 변조 여부 확인</li>
                                    <li>• <strong>부인 방지</strong>: 서명 사실 부인 불가</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                id: "solution",
                title: "보안 솔루션",
                content: `
                    <div class="space-y-6">
                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 네트워크 보안 장비</h3>
                            <span class="inline-block px-3 py-1 badge-frequent text-white text-xs rounded-full mb-4">🔥 이 개념 자주 출제됐어요!</span>

                            <div class="space-y-3">
                                <div class="bg-orange-50 rounded-lg p-4">
                                    <h4 class="font-bold text-orange-800">방화벽 (Firewall)</h4>
                                    <p class="text-sm text-gray-600">네트워크 접근 제어, 패킷 필터링</p>
                                </div>
                                <div class="bg-orange-50 rounded-lg p-4">
                                    <h4 class="font-bold text-orange-800">IDS (Intrusion Detection System)</h4>
                                    <p class="text-sm text-gray-600">침입 탐지 시스템 (탐지만)</p>
                                </div>
                                <div class="bg-orange-50 rounded-lg p-4">
                                    <h4 class="font-bold text-orange-800">IPS (Intrusion Prevention System)</h4>
                                    <p class="text-sm text-gray-600">침입 방지 시스템 (탐지 + 차단)</p>
                                </div>
                                <div class="bg-orange-50 rounded-lg p-4">
                                    <h4 class="font-bold text-orange-800">VPN (Virtual Private Network)</h4>
                                    <p class="text-sm text-gray-600">가상 사설망, 암호화된 터널</p>
                                </div>
                                <div class="bg-orange-50 rounded-lg p-4">
                                    <h4 class="font-bold text-orange-800">WAF (Web Application Firewall)</h4>
                                    <p class="text-sm text-gray-600">웹 애플리케이션 방화벽</p>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 접근 제어 모델</h3>
                            <span class="inline-block px-2 py-1 badge-difficult text-white text-xs rounded-full mb-4">⚠️ 사람들이 많이 틀린 개념이에요!</span>

                            <div class="space-y-3">
                                <div class="bg-blue-50 rounded-lg p-4">
                                    <h4 class="font-bold text-blue-800">DAC (임의적 접근 제어)</h4>
                                    <p class="text-sm text-gray-600">Discretionary Access Control</p>
                                    <p class="text-sm text-gray-600">소유자가 권한 부여 (유닉스 파일 시스템)</p>
                                </div>
                                <div class="bg-green-50 rounded-lg p-4">
                                    <h4 class="font-bold text-green-800">MAC (강제적 접근 제어)</h4>
                                    <p class="text-sm text-gray-600">Mandatory Access Control</p>
                                    <p class="text-sm text-gray-600">보안 등급으로 관리자가 권한 부여</p>
                                </div>
                                <div class="bg-purple-50 rounded-lg p-4">
                                    <h4 class="font-bold text-purple-800">RBAC (역할 기반 접근 제어)</h4>
                                    <p class="text-sm text-gray-600">Role-Based Access Control</p>
                                    <p class="text-sm text-gray-600">사용자의 역할에 따라 권한 부여</p>
                                </div>
                            </div>
                        </div>

                        <div class="concept-section bg-white rounded-xl p-6 shadow-sm">
                            <h3 class="text-xl font-bold text-gray-800 mb-4">📌 인증 기술</h3>

                            <div class="space-y-3">
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">SSO (Single Sign-On)</h4>
                                    <p class="text-sm text-gray-600">한 번 로그인으로 여러 시스템 접근</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">OAuth</h4>
                                    <p class="text-sm text-gray-600">제3자 인증 (소셜 로그인)</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">OTP (One-Time Password)</h4>
                                    <p class="text-sm text-gray-600">일회용 비밀번호</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <h4 class="font-bold text-gray-800">생체 인증</h4>
                                    <p class="text-sm text-gray-600">지문, 홍채, 얼굴 인식</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        ]
    }
};

// 기출문제 데이터
const questions = {
    1: [
        {
            id: 101,
            question: "소프트웨어 생명주기 모델 중 위험 분석 단계가 포함되어 있어 대규모 프로젝트에 적합한 모델은?",
            options: ["폭포수 모델", "프로토타입 모델", "나선형 모델", "애자일 모델"],
            answer: 2,
            year: "2023년 1회",
            conceptId: "req",
            explanation: "나선형 모델은 Boehm이 제안한 모델로, 계획→위험분석→개발→평가의 4단계를 반복합니다. 위험 분석 단계가 포함된 유일한 모델입니다."
        },
        {
            id: 102,
            question: "애자일 방법론 중 XP(eXtreme Programming)의 핵심 가치가 아닌 것은?",
            options: ["용기(Courage)", "문서화(Documentation)", "의사소통(Communication)", "피드백(Feedback)"],
            answer: 1,
            year: "2023년 2회",
            conceptId: "req",
            explanation: "XP의 5가지 핵심 가치는 용기, 단순성, 의사소통, 피드백, 존중입니다. 문서화는 XP의 핵심 가치가 아니며, 오히려 애자일은 과도한 문서화를 지양합니다."
        },
        {
            id: 103,
            question: "UML 다이어그램 중 시스템의 동적인 행위를 나타내는 다이어그램이 아닌 것은?",
            options: ["유스케이스 다이어그램", "시퀀스 다이어그램", "클래스 다이어그램", "활동 다이어그램"],
            answer: 2,
            year: "2022년 3회",
            conceptId: "uml",
            explanation: "클래스 다이어그램은 구조적(정적) 다이어그램입니다. 유스케이스, 시퀀스, 활동 다이어그램은 모두 행위(동적) 다이어그램입니다."
        },
        {
            id: 104,
            question: "UML에서 클래스 간의 관계 중 '부분-전체' 관계이면서 생명주기가 독립적인 관계는?",
            options: ["일반화(Generalization)", "집합(Aggregation)", "합성(Composition)", "의존(Dependency)"],
            answer: 1,
            year: "2023년 1회",
            conceptId: "uml",
            explanation: "집합(Aggregation)은 전체-부분 관계이면서 생명주기가 독립적입니다(◇). 합성(Composition)은 생명주기가 종속적입니다(◆)."
        },
        {
            id: 105,
            question: "유스케이스 다이어그램에서 기본 유스케이스를 수행할 때 특정 조건에서 선택적으로 수행되는 관계는?",
            options: ["include", "extend", "generalization", "association"],
            answer: 1,
            year: "2022년 2회",
            conceptId: "uml",
            explanation: "extend 관계는 조건에 따라 선택적으로 실행됩니다. include는 반드시 실행되는 필수 관계입니다."
        },
        {
            id: 106,
            question: "요구사항 개발 프로세스의 순서로 올바른 것은?",
            options: ["분석→도출→명세→확인", "도출→분석→명세→확인", "명세→도출→분석→확인", "도출→명세→분석→확인"],
            answer: 1,
            year: "2023년 2회",
            conceptId: "req",
            explanation: "요구사항 개발 프로세스는 도출(Elicitation)→분석(Analysis)→명세(Specification)→확인(Validation) 순서입니다. '도분명확'으로 암기하세요."
        },
        {
            id: 107,
            question: "GoF 디자인 패턴 중 생성 패턴에 해당하지 않는 것은?",
            options: ["싱글톤(Singleton)", "팩토리 메서드(Factory Method)", "어댑터(Adapter)", "빌더(Builder)"],
            answer: 2,
            year: "2023년 1회",
            conceptId: "pattern",
            explanation: "어댑터(Adapter)는 구조 패턴입니다. 싱글톤, 팩토리 메서드, 빌더, 추상 팩토리, 프로토타입이 생성 패턴입니다."
        },
        {
            id: 108,
            question: "다음 중 UI 설계 원칙이 아닌 것은?",
            options: ["직관성", "유효성", "복잡성", "학습성"],
            answer: 2,
            year: "2022년 1회",
            conceptId: "design",
            explanation: "UI 설계 원칙은 직관성, 유효성, 학습성, 유연성입니다. 복잡성은 UI 설계에서 지양해야 할 요소입니다."
        },
        {
            id: 109,
            question: "스크럼(Scrum)에서 2~4주 단위의 반복 개발 주기를 무엇이라 하는가?",
            options: ["백로그", "스프린트", "데일리 스크럼", "스토리"],
            answer: 1,
            year: "2023년 3회",
            conceptId: "req",
            explanation: "스프린트(Sprint)는 스크럼에서 2~4주 단위의 반복 개발 주기입니다. 백로그는 기능 목록, 데일리 스크럼은 매일 15분 회의입니다."
        },
        {
            id: 110,
            question: "객체 상태 변화를 다른 객체들에게 자동으로 통지하는 디자인 패턴은?",
            options: ["싱글톤", "옵저버", "어댑터", "팩토리"],
            answer: 1,
            year: "2022년 2회",
            conceptId: "pattern",
            explanation: "옵저버(Observer) 패턴은 객체의 상태 변화를 다른 객체들에게 자동으로 통지합니다. 이벤트 리스너, 구독 시스템에서 사용됩니다."
        },
        {
            id: 111,
            question: "다음 중 사용자 인터페이스(UI) 유형이 아닌 것은?",
            options: ["CLI", "GUI", "NUI", "API"],
            answer: 3,
            year: "2023년 1회",
            conceptId: "design",
            explanation: "API는 Application Programming Interface로 UI 유형이 아닙니다. UI 유형은 CLI, GUI, NUI, OUI 등이 있습니다."
        },
        {
            id: 112,
            question: "UI 설계 도구 중 실제 작동하는 모형으로 인터랙션을 포함하는 것은?",
            options: ["와이어프레임", "목업", "스토리보드", "프로토타입"],
            answer: 3,
            year: "2022년 3회",
            conceptId: "design",
            explanation: "프로토타입은 실제 작동하는 모형으로 인터랙션을 포함합니다. 와이어프레임은 레이아웃, 목업은 정적 모형, 스토리보드는 화면 흐름을 나타냅니다."
        },
        {
            id: 113,
            question: "폭포수 모델의 특징으로 올바르지 않은 것은?",
            options: ["선형 순차적 모델이다", "각 단계가 끝나면 다음 단계로 진행한다", "요구사항 변경이 용이하다", "문서화가 잘 된다"],
            answer: 2,
            year: "2023년 2회",
            conceptId: "req",
            explanation: "폭포수 모델은 요구사항 변경이 어렵습니다. 이전 단계 완료 후 다음 단계로 진행하므로 변경에 유연하지 않습니다."
        },
        {
            id: 114,
            question: "GoF 디자인 패턴의 분류 중 행위 패턴에 해당하는 것은?",
            options: ["브릿지", "퍼사드", "전략", "컴포지트"],
            answer: 2,
            year: "2022년 1회",
            conceptId: "pattern",
            explanation: "전략(Strategy) 패턴은 행위 패턴입니다. 브릿지, 퍼사드, 컴포지트는 구조 패턴입니다."
        },
        {
            id: 115,
            question: "클래스의 인스턴스가 하나만 존재하도록 보장하는 디자인 패턴은?",
            options: ["싱글톤", "팩토리", "어댑터", "데코레이터"],
            answer: 0,
            year: "2023년 3회",
            conceptId: "pattern",
            explanation: "싱글톤(Singleton) 패턴은 클래스의 인스턴스가 오직 하나만 존재하도록 보장합니다. 데이터베이스 연결, 로그 관리자 등에 사용됩니다."
        },
        {
            id: 116,
            question: "XP의 12가지 실천 방법에 해당하지 않는 것은?",
            options: ["짝 프로그래밍", "테스트 주도 개발", "폭포수 개발", "지속적 통합"],
            answer: 2,
            year: "2022년 2회",
            conceptId: "req",
            explanation: "폭포수 개발은 XP의 실천 방법이 아닙니다. XP의 12가지 실천 방법에는 짝 프로그래밍, TDD, 지속적 통합, 리팩토링 등이 있습니다."
        },
        {
            id: 117,
            question: "UML에서 인터페이스 구현 관계를 나타내는 것은?",
            options: ["연관", "일반화", "실체화", "의존"],
            answer: 2,
            year: "2023년 1회",
            conceptId: "uml",
            explanation: "실체화(Realization)는 인터페이스 구현 관계를 나타냅니다. 점선에 빈 삼각형 화살표(- - -▷)로 표현합니다."
        },
        {
            id: 118,
            question: "호환되지 않는 인터페이스를 연결하여 함께 동작할 수 있게 하는 패턴은?",
            options: ["어댑터", "브릿지", "퍼사드", "프록시"],
            answer: 0,
            year: "2022년 3회",
            conceptId: "pattern",
            explanation: "어댑터(Adapter) 패턴은 호환되지 않는 인터페이스를 연결하는 변환기 역할을 합니다."
        },
        {
            id: 119,
            question: "복잡한 서브시스템에 단순한 인터페이스를 제공하는 패턴은?",
            options: ["어댑터", "브릿지", "퍼사드", "데코레이터"],
            answer: 2,
            year: "2023년 2회",
            conceptId: "pattern",
            explanation: "퍼사드(Facade) 패턴은 복잡한 서브시스템에 단순한 인터페이스를 제공합니다."
        },
        {
            id: 120,
            question: "유스케이스 다이어그램의 구성요소가 아닌 것은?",
            options: ["액터", "유스케이스", "시스템 경계", "클래스"],
            answer: 3,
            year: "2022년 1회",
            conceptId: "uml",
            explanation: "클래스는 클래스 다이어그램의 구성요소입니다. 유스케이스 다이어그램은 액터, 유스케이스, 시스템 경계로 구성됩니다."
        }
    ],
    2: [
        {
            id: 201,
            question: "소프트웨어 테스트 레벨 중 모듈 간 인터페이스를 테스트하는 것은?",
            options: ["단위 테스트", "통합 테스트", "시스템 테스트", "인수 테스트"],
            answer: 1,
            year: "2023년 1회",
            conceptId: "test",
            explanation: "통합 테스트는 모듈 간 인터페이스를 테스트합니다. 단위 테스트는 개별 모듈, 시스템 테스트는 전체 시스템, 인수 테스트는 사용자 수용 테스트입니다."
        },
        {
            id: 202,
            question: "화이트박스 테스트 기법이 아닌 것은?",
            options: ["문장 검증", "분기 검증", "경계값 분석", "경로 검증"],
            answer: 2,
            year: "2023년 2회",
            conceptId: "test",
            explanation: "경계값 분석은 블랙박스 테스트 기법입니다. 화이트박스 테스트는 내부 구조/코드 기반으로 문장, 분기, 조건, 경로 검증 등이 있습니다."
        },
        {
            id: 203,
            question: "하향식 통합 테스트에서 하위 모듈을 대체하는 것은?",
            options: ["드라이버", "스텁", "목", "페이크"],
            answer: 1,
            year: "2022년 3회",
            conceptId: "test",
            explanation: "스텁(Stub)은 하향식 통합 테스트에서 하위 모듈을 대체합니다. 드라이버(Driver)는 상향식 통합 테스트에서 상위 모듈을 대체합니다."
        },
        {
            id: 204,
            question: "형상 관리의 절차로 올바른 것은?",
            options: ["식별→감사→통제→기록", "식별→통제→감사→기록", "통제→식별→감사→기록", "식별→기록→통제→감사"],
            answer: 1,
            year: "2023년 1회",
            conceptId: "version",
            explanation: "형상 관리 절차는 형상 식별 → 형상 통제 → 형상 감사 → 형상 기록 순서입니다."
        },
        {
            id: 205,
            question: "블랙박스 테스트 기법 중 입력값을 유사한 그룹으로 나누어 대표값을 테스트하는 기법은?",
            options: ["경계값 분석", "동등 분할", "오류 예측", "원인-결과 그래프"],
            answer: 1,
            year: "2022년 2회",
            conceptId: "test",
            explanation: "동등 분할(Equivalence Partitioning)은 입력값을 유사한 그룹으로 나누어 각 그룹의 대표값을 테스트하는 기법입니다."
        },
        {
            id: 206,
            question: "상향식 통합 테스트에서 상위 모듈을 대체하는 것은?",
            options: ["스텁", "드라이버", "목", "스파이"],
            answer: 1,
            year: "2023년 2회",
            conceptId: "test",
            explanation: "드라이버(Driver)는 상향식 통합 테스트에서 상위 모듈을 대체합니다."
        },
        {
            id: 207,
            question: "형상 관리에서 변경 요청을 검토하고 승인하는 단계는?",
            options: ["형상 식별", "형상 통제", "형상 감사", "형상 기록"],
            answer: 1,
            year: "2022년 1회",
            conceptId: "version",
            explanation: "형상 통제(변경 관리)는 변경 요청을 검토하고 승인하는 단계입니다."
        },
        {
            id: 208,
            question: "분산 버전 관리 시스템으로 로컬 저장소를 지원하는 것은?",
            options: ["CVS", "SVN", "Git", "RCS"],
            answer: 2,
            year: "2023년 3회",
            conceptId: "version",
            explanation: "Git은 분산 버전 관리 시스템으로 로컬 저장소를 지원합니다. CVS, SVN은 중앙 집중식입니다."
        },
        {
            id: 209,
            question: "테스트 레벨 중 사용자가 직접 수행하는 테스트는?",
            options: ["단위 테스트", "통합 테스트", "시스템 테스트", "인수 테스트"],
            answer: 3,
            year: "2022년 2회",
            conceptId: "test",
            explanation: "인수 테스트는 사용자가 직접 수행하는 테스트로, 알파 테스트와 베타 테스트가 있습니다."
        },
        {
            id: 210,
            question: "EAI 구축 유형 중 중앙 허브를 통해 연결하는 방식은?",
            options: ["Point-to-Point", "Hub & Spoke", "Message Bus", "Hybrid"],
            answer: 1,
            year: "2023년 1회",
            conceptId: "integration",
            explanation: "Hub & Spoke 방식은 중앙 허브를 통해 연결합니다. Point-to-Point는 1:1 연결입니다."
        },
        {
            id: 211,
            question: "경계값 분석 기법에 대한 설명으로 옳은 것은?",
            options: ["내부 구조를 기반으로 테스트한다", "경계 부분의 값을 중심으로 테스트한다", "입력값을 그룹으로 나눈다", "모든 경로를 테스트한다"],
            answer: 1,
            year: "2022년 3회",
            conceptId: "test",
            explanation: "경계값 분석(Boundary Value Analysis)은 경계 부분(최소값, 최대값 등)의 값을 중심으로 테스트합니다."
        },
        {
            id: 212,
            question: "알파 테스트에 대한 설명으로 옳은 것은?",
            options: ["개발자 환경에서 사용자가 테스트", "실제 환경에서 사용자가 테스트", "개발자가 모듈을 테스트", "테스터가 시스템을 테스트"],
            answer: 0,
            year: "2023년 2회",
            conceptId: "test",
            explanation: "알파 테스트는 개발자 환경에서 사용자가 테스트합니다. 베타 테스트는 실제 환경에서 사용자가 테스트합니다."
        },
        {
            id: 213,
            question: "형상 관리에서 무결성을 검증하고 기준선 준수를 확인하는 단계는?",
            options: ["형상 식별", "형상 통제", "형상 감사", "형상 기록"],
            answer: 2,
            year: "2022년 1회",
            conceptId: "version",
            explanation: "형상 감사는 무결성을 검증하고 기준선(베이스라인) 준수를 확인하는 단계입니다."
        },
        {
            id: 214,
            question: "빅뱅 통합 테스트의 특징으로 옳은 것은?",
            options: ["점진적으로 통합한다", "모든 모듈을 한 번에 통합한다", "상위 모듈부터 통합한다", "하위 모듈부터 통합한다"],
            answer: 1,
            year: "2023년 3회",
            conceptId: "test",
            explanation: "빅뱅 통합 테스트는 모든 모듈을 한 번에 통합하여 테스트합니다."
        },
        {
            id: 215,
            question: "테스트 오라클 중 모든 입력값에 대한 기대 결과가 있는 것은?",
            options: ["참 오라클", "샘플링 오라클", "휴리스틱 오라클", "일관성 검사 오라클"],
            answer: 0,
            year: "2022년 2회",
            conceptId: "test",
            explanation: "참 오라클(True Oracle)은 모든 입력값에 대해 기대 결과가 정의되어 있습니다."
        },
        {
            id: 216,
            question: "다음 중 회귀 테스트에 대한 설명으로 옳은 것은?",
            options: ["새로운 기능만 테스트", "수정 후 기존 기능 영향 확인", "성능을 테스트", "보안을 테스트"],
            answer: 1,
            year: "2023년 1회",
            conceptId: "test",
            explanation: "회귀 테스트(Regression Test)는 수정 후 기존 기능에 영향이 없는지 확인하는 테스트입니다."
        },
        {
            id: 217,
            question: "테스트 케이스 구성 요소가 아닌 것은?",
            options: ["테스트 항목", "입력값", "예상 결과", "소스 코드"],
            answer: 3,
            year: "2022년 3회",
            conceptId: "test",
            explanation: "테스트 케이스는 테스트 항목, 입력값, 예상 결과, 전/후 조건 등으로 구성됩니다. 소스 코드는 포함되지 않습니다."
        },
        {
            id: 218,
            question: "결함 심각도 중 시스템을 사용할 수 없는 수준은?",
            options: ["Minor", "Major", "Critical", "Trivial"],
            answer: 2,
            year: "2023년 2회",
            conceptId: "test",
            explanation: "Critical은 시스템을 사용할 수 없는 심각한 수준의 결함입니다."
        },
        {
            id: 219,
            question: "코드 커버리지 중 모든 문장을 한 번 이상 실행하는 것은?",
            options: ["문장 커버리지", "분기 커버리지", "조건 커버리지", "경로 커버리지"],
            answer: 0,
            year: "2022년 1회",
            conceptId: "test",
            explanation: "문장 커버리지(Statement Coverage)는 모든 문장(코드 라인)을 한 번 이상 실행합니다."
        },
        {
            id: 220,
            question: "애플리케이션 통합 테스트 수행 시 테스트 드라이버의 역할은?",
            options: ["하위 모듈 대체", "상위 모듈 대체", "테스트 자동화", "결함 추적"],
            answer: 1,
            year: "2023년 3회",
            conceptId: "test",
            explanation: "테스트 드라이버는 상향식 통합 테스트에서 상위 모듈을 대체하여 하위 모듈을 호출합니다."
        }
    ],
    3: [
        {
            id: 301,
            question: "정규화 과정에서 이행적 함수 종속을 제거하는 단계는?",
            options: ["제1정규형", "제2정규형", "제3정규형", "BCNF"],
            answer: 2,
            year: "2023년 1회",
            conceptId: "normal",
            explanation: "제3정규형(3NF)은 이행적 함수 종속을 제거합니다. A→B, B→C일 때 A→C를 제거합니다."
        },
        {
            id: 302,
            question: "SQL 명령어 중 DDL에 해당하지 않는 것은?",
            options: ["CREATE", "ALTER", "SELECT", "DROP"],
            answer: 2,
            year: "2023년 2회",
            conceptId: "sql",
            explanation: "SELECT는 DML(데이터 조작어)입니다. DDL은 CREATE, ALTER, DROP, TRUNCATE입니다."
        },
        {
            id: 303,
            question: "트랜잭션의 특성 중 완료된 결과가 영구적으로 보존되는 것은?",
            options: ["원자성", "일관성", "독립성", "영속성"],
            answer: 3,
            year: "2022년 3회",
            conceptId: "sql",
            explanation: "영속성(Durability)은 완료된 트랜잭션의 결과가 영구적으로 보존되는 특성입니다."
        },
        {
            id: 304,
            question: "정규화 과정에서 부분 함수 종속을 제거하는 단계는?",
            options: ["제1정규형", "제2정규형", "제3정규형", "BCNF"],
            answer: 1,
            year: "2023년 1회",
            conceptId: "normal",
            explanation: "제2정규형(2NF)은 부분 함수 종속을 제거합니다. 모든 속성이 기본키에 완전 함수 종속되어야 합니다."
        },
        {
            id: 305,
            question: "E-R 다이어그램에서 개체를 나타내는 기호는?",
            options: ["타원", "마름모", "사각형", "삼각형"],
            answer: 2,
            year: "2022년 2회",
            conceptId: "modeling",
            explanation: "E-R 다이어그램에서 사각형은 개체(Entity), 타원은 속성(Attribute), 마름모는 관계(Relationship)를 나타냅니다."
        },
        {
            id: 306,
            question: "양쪽 테이블에 모두 있는 데이터만 반환하는 JOIN은?",
            options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN"],
            answer: 2,
            year: "2023년 2회",
            conceptId: "sql",
            explanation: "INNER JOIN은 양쪽 테이블에 모두 있는(매칭되는) 데이터만 반환합니다."
        },
        {
            id: 307,
            question: "트랜잭션의 특성 중 트랜잭션이 완전히 실행되거나 전혀 실행되지 않는 것은?",
            options: ["원자성", "일관성", "독립성", "영속성"],
            answer: 0,
            year: "2022년 1회",
            conceptId: "sql",
            explanation: "원자성(Atomicity)은 All or Nothing으로, 트랜잭션이 완전히 실행되거나 전혀 실행되지 않아야 합니다."
        },
        {
            id: 308,
            question: "다음 중 DCL(데이터 제어어)에 해당하는 것은?",
            options: ["SELECT", "INSERT", "GRANT", "CREATE"],
            answer: 2,
            year: "2023년 3회",
            conceptId: "sql",
            explanation: "GRANT는 DCL로 권한을 부여합니다. REVOKE도 DCL입니다."
        },
        {
            id: 309,
            question: "정규화 과정에서 도메인이 원자값만 가지도록 하는 단계는?",
            options: ["제1정규형", "제2정규형", "제3정규형", "BCNF"],
            answer: 0,
            year: "2022년 2회",
            conceptId: "normal",
            explanation: "제1정규형(1NF)은 도메인이 원자값만 가지도록 합니다. 반복 그룹을 제거합니다."
        },
        {
            id: 310,
            question: "모든 결정자가 후보키여야 하는 정규형은?",
            options: ["제2정규형", "제3정규형", "BCNF", "제4정규형"],
            answer: 2,
            year: "2023년 1회",
            conceptId: "normal",
            explanation: "BCNF(보이스-코드 정규형)는 모든 결정자가 후보키여야 합니다."
        },
        {
            id: 311,
            question: "트랜잭션 제어어(TCL)가 아닌 것은?",
            options: ["COMMIT", "ROLLBACK", "SAVEPOINT", "GRANT"],
            answer: 3,
            year: "2022년 3회",
            conceptId: "sql",
            explanation: "GRANT는 DCL(데이터 제어어)입니다. TCL은 COMMIT, ROLLBACK, SAVEPOINT입니다."
        },
        {
            id: 312,
            question: "뷰(View)에 대한 설명으로 옳지 않은 것은?",
            options: ["가상 테이블이다", "물리적으로 저장된다", "데이터 보안에 유용하다", "논리적 독립성을 제공한다"],
            answer: 1,
            year: "2023년 2회",
            conceptId: "sql",
            explanation: "뷰는 물리적으로 저장되지 않는 가상 테이블입니다."
        },
        {
            id: 313,
            question: "카티션 곱(모든 조합)을 반환하는 JOIN은?",
            options: ["INNER JOIN", "OUTER JOIN", "CROSS JOIN", "NATURAL JOIN"],
            answer: 2,
            year: "2022년 1회",
            conceptId: "sql",
            explanation: "CROSS JOIN은 카티션 곱으로 두 테이블의 모든 조합을 반환합니다."
        },
        {
            id: 314,
            question: "인덱스에 대한 설명으로 옳지 않은 것은?",
            options: ["검색 속도 향상", "삽입/삭제 시 오버헤드", "저장 공간 필요", "항상 검색 성능 향상"],
            answer: 3,
            year: "2023년 3회",
            conceptId: "sql",
            explanation: "인덱스는 항상 검색 성능을 향상시키지 않습니다. 데이터가 적거나 변경이 많으면 오히려 성능이 저하될 수 있습니다."
        },
        {
            id: 315,
            question: "데이터베이스 설계 단계 중 E-R 다이어그램을 작성하는 단계는?",
            options: ["요구사항 분석", "개념적 설계", "논리적 설계", "물리적 설계"],
            answer: 1,
            year: "2022년 2회",
            conceptId: "modeling",
            explanation: "개념적 설계 단계에서 E-R 다이어그램을 작성합니다."
        },
        {
            id: 316,
            question: "다치 종속(MVD)을 제거하는 정규형은?",
            options: ["제3정규형", "BCNF", "제4정규형", "제5정규형"],
            answer: 2,
            year: "2023년 1회",
            conceptId: "normal",
            explanation: "제4정규형(4NF)은 다치 종속(MVD)을 제거합니다."
        },
        {
            id: 317,
            question: "트랜잭션의 특성 중 동시에 실행되는 트랜잭션이 서로 간섭하지 않는 것은?",
            options: ["원자성", "일관성", "독립성", "영속성"],
            answer: 2,
            year: "2022년 3회",
            conceptId: "sql",
            explanation: "독립성/격리성(Isolation)은 동시에 실행되는 트랜잭션이 서로 간섭하지 않는 특성입니다."
        },
        {
            id: 318,
            question: "관계 대수 연산 중 두 릴레이션에서 공통 속성으로 결합하는 것은?",
            options: ["선택", "프로젝션", "조인", "합집합"],
            answer: 2,
            year: "2023년 2회",
            conceptId: "sql",
            explanation: "조인(Join)은 두 릴레이션을 공통 속성으로 결합하는 연산입니다."
        },
        {
            id: 319,
            question: "데이터베이스 이상(Anomaly) 현상이 아닌 것은?",
            options: ["삽입 이상", "삭제 이상", "갱신 이상", "조회 이상"],
            answer: 3,
            year: "2022년 1회",
            conceptId: "normal",
            explanation: "데이터베이스 이상 현상은 삽입 이상, 삭제 이상, 갱신 이상입니다. 조회 이상은 없습니다."
        },
        {
            id: 320,
            question: "NULL 값을 비교할 때 사용하는 연산자는?",
            options: ["= NULL", "== NULL", "IS NULL", "EQUALS NULL"],
            answer: 2,
            year: "2023년 3회",
            conceptId: "sql",
            explanation: "NULL 값은 IS NULL 또는 IS NOT NULL로 비교합니다. =, ==는 사용할 수 없습니다."
        }
    ],
    4: [
        {
            id: 401,
            question: "C언어에서 다음 코드의 출력 결과는?\nint a = 10, b = 3;\nprintf(\"%d\", a % b);",
            options: ["1", "3", "10", "0"],
            answer: 0,
            year: "2023년 1회",
            conceptId: "basic",
            explanation: "% 연산자는 나머지를 구합니다. 10 % 3 = 1 (10을 3으로 나눈 나머지)"
        },
        {
            id: 402,
            question: "C언어에서 포인터 변수 p가 변수 a의 주소를 저장할 때 a의 값을 출력하는 방법은?",
            options: ["p", "&p", "*p", "**p"],
            answer: 2,
            year: "2023년 2회",
            conceptId: "output",
            explanation: "*p는 포인터 p가 가리키는 주소의 값(역참조)입니다. &는 주소 연산자입니다."
        },
        {
            id: 403,
            question: "다음 C 코드의 출력 결과는?\nint arr[5] = {1, 2, 3, 4, 5};\nprintf(\"%d\", arr[2]);",
            options: ["1", "2", "3", "4"],
            answer: 2,
            year: "2022년 3회",
            conceptId: "output",
            explanation: "배열 인덱스는 0부터 시작합니다. arr[2]는 세 번째 요소인 3입니다."
        },
        {
            id: 404,
            question: "C언어에서 주소 연산자는?",
            options: ["*", "&", "->", "."],
            answer: 1,
            year: "2023년 1회",
            conceptId: "output",
            explanation: "& 연산자는 변수의 주소를 반환합니다. *는 역참조 연산자입니다."
        },
        {
            id: 405,
            question: "다음 C 코드의 출력 결과는?\nint i;\nfor(i=0; i<5; i++) {\n  if(i==3) break;\n}\nprintf(\"%d\", i);",
            options: ["2", "3", "4", "5"],
            answer: 1,
            year: "2022년 2회",
            conceptId: "output",
            explanation: "i가 3일 때 break로 반복문을 빠져나가므로 i는 3입니다."
        },
        {
            id: 406,
            question: "Python에서 리스트 arr = [1,2,3,4,5]일 때 arr[1:4]의 결과는?",
            options: ["[1,2,3]", "[2,3,4]", "[1,2,3,4]", "[2,3,4,5]"],
            answer: 1,
            year: "2023년 2회",
            conceptId: "java",
            explanation: "Python 슬라이싱에서 arr[1:4]는 인덱스 1부터 3까지(4 미포함)입니다. 결과는 [2,3,4]입니다."
        },
        {
            id: 407,
            question: "Java에서 클래스 상속 시 사용하는 키워드는?",
            options: ["implements", "extends", "inherits", "super"],
            answer: 1,
            year: "2022년 1회",
            conceptId: "java",
            explanation: "Java에서 클래스 상속은 extends를 사용합니다. implements는 인터페이스 구현에 사용합니다."
        },
        {
            id: 408,
            question: "다음 C 코드의 출력 결과는?\nint a=5, b=3;\nprintf(\"%d\", a>b ? a : b);",
            options: ["3", "5", "1", "0"],
            answer: 1,
            year: "2023년 3회",
            conceptId: "basic",
            explanation: "삼항 연산자 a>b ? a : b에서 5>3은 참이므로 a의 값인 5가 출력됩니다."
        },
        {
            id: 409,
            question: "다음 중 C언어의 반복문이 아닌 것은?",
            options: ["for", "while", "do-while", "foreach"],
            answer: 3,
            year: "2022년 2회",
            conceptId: "basic",
            explanation: "C언어의 반복문은 for, while, do-while입니다. foreach는 C언어에 없습니다."
        },
        {
            id: 410,
            question: "Python에서 리스트를 역순으로 만드는 슬라이싱은?",
            options: ["arr[0:-1]", "arr[-1:0]", "arr[::-1]", "arr[::1]"],
            answer: 2,
            year: "2023년 1회",
            conceptId: "java",
            explanation: "arr[::-1]은 리스트를 역순으로 만듭니다. step이 -1이면 역순입니다."
        },
        {
            id: 411,
            question: "다음 C 코드의 출력 결과는?\nint a=10;\nprintf(\"%d\", ++a);",
            options: ["9", "10", "11", "12"],
            answer: 2,
            year: "2022년 3회",
            conceptId: "basic",
            explanation: "++a는 전위 증가 연산자로, 먼저 a를 1 증가시킨 후 값을 반환합니다. 결과는 11입니다."
        },
        {
            id: 412,
            question: "Java에서 인터페이스 구현 시 사용하는 키워드는?",
            options: ["extends", "implements", "interface", "abstract"],
            answer: 1,
            year: "2023년 2회",
            conceptId: "java",
            explanation: "Java에서 인터페이스 구현은 implements를 사용합니다."
        },
        {
            id: 413,
            question: "다음 C 코드의 출력 결과는?\nint a=5;\na += 3;\nprintf(\"%d\", a);",
            options: ["2", "5", "8", "15"],
            answer: 2,
            year: "2022년 1회",
            conceptId: "basic",
            explanation: "a += 3은 a = a + 3과 같습니다. 5 + 3 = 8입니다."
        },
        {
            id: 414,
            question: "다음 C 코드의 출력 결과는?\nint arr[] = {1,2,3};\nprintf(\"%d\", sizeof(arr)/sizeof(int));",
            options: ["1", "2", "3", "12"],
            answer: 2,
            year: "2023년 3회",
            conceptId: "output",
            explanation: "배열 전체 크기(12바이트)를 int 크기(4바이트)로 나누면 배열 요소 개수 3이 됩니다."
        },
        {
            id: 415,
            question: "Python에서 문자열 'Hello'의 길이를 구하는 함수는?",
            options: ["size('Hello')", "length('Hello')", "len('Hello')", "count('Hello')"],
            answer: 2,
            year: "2022년 2회",
            conceptId: "java",
            explanation: "Python에서 문자열이나 리스트의 길이는 len() 함수로 구합니다."
        },
        {
            id: 416,
            question: "다음 C 코드의 출력 결과는?\nint i, sum=0;\nfor(i=1; i<=5; i++) sum += i;\nprintf(\"%d\", sum);",
            options: ["10", "15", "20", "25"],
            answer: 1,
            year: "2023년 1회",
            conceptId: "output",
            explanation: "1+2+3+4+5 = 15입니다."
        },
        {
            id: 417,
            question: "Java에서 부모 클래스의 생성자를 호출하는 키워드는?",
            options: ["this", "super", "parent", "base"],
            answer: 1,
            year: "2022년 3회",
            conceptId: "java",
            explanation: "super는 부모 클래스의 생성자나 메서드를 호출할 때 사용합니다."
        },
        {
            id: 418,
            question: "다음 C 코드의 출력 결과는?\nint a=10, b=20;\nint *p = &a;\n*p = b;\nprintf(\"%d\", a);",
            options: ["10", "20", "주소값", "에러"],
            answer: 1,
            year: "2023년 2회",
            conceptId: "output",
            explanation: "p는 a의 주소를 가리키고, *p = b는 a의 값을 b(20)로 변경합니다."
        },
        {
            id: 419,
            question: "Python 리스트 컴프리헨션 [x*2 for x in range(3)]의 결과는?",
            options: ["[0,1,2]", "[2,4,6]", "[0,2,4]", "[1,2,3]"],
            answer: 2,
            year: "2022년 1회",
            conceptId: "java",
            explanation: "range(3)은 0,1,2이고 각각 2를 곱하면 [0,2,4]입니다."
        },
        {
            id: 420,
            question: "다음 C 코드의 출력 결과는?\nint a=5, b=2;\nprintf(\"%d\", a/b);",
            options: ["2", "2.5", "3", "1"],
            answer: 0,
            year: "2023년 3회",
            conceptId: "basic",
            explanation: "정수 나눗셈에서 5/2는 소수점이 버려져 2가 됩니다."
        }
    ],
    5: [
        {
            id: 501,
            question: "정보보안의 3대 요소(CIA)에 해당하지 않는 것은?",
            options: ["기밀성", "무결성", "가용성", "신뢰성"],
            answer: 3,
            year: "2023년 1회",
            conceptId: "security",
            explanation: "정보보안 3대 요소(CIA)는 기밀성(Confidentiality), 무결성(Integrity), 가용성(Availability)입니다."
        },
        {
            id: 502,
            question: "대칭키 암호화 알고리즘이 아닌 것은?",
            options: ["DES", "AES", "RSA", "SEED"],
            answer: 2,
            year: "2023년 2회",
            conceptId: "security",
            explanation: "RSA는 비대칭키(공개키) 암호화 알고리즘입니다. DES, AES, SEED는 대칭키 알고리즘입니다."
        },
        {
            id: 503,
            question: "OSI 7계층 중 IP 주소를 사용하는 계층은?",
            options: ["데이터링크 계층", "네트워크 계층", "전송 계층", "응용 계층"],
            answer: 1,
            year: "2022년 3회",
            conceptId: "network",
            explanation: "네트워크 계층(3계층)은 IP 주소를 사용합니다. 데이터링크 계층은 MAC 주소, 전송 계층은 포트 번호를 사용합니다."
        },
        {
            id: 504,
            question: "입력값에 SQL 구문을 삽입하여 데이터베이스를 조작하는 공격은?",
            options: ["XSS", "SQL Injection", "CSRF", "DDoS"],
            answer: 1,
            year: "2023년 1회",
            conceptId: "security",
            explanation: "SQL Injection은 입력값에 SQL 구문을 삽입하여 데이터베이스를 조작하는 공격입니다."
        },
        {
            id: 505,
            question: "TCP/IP 프로토콜에서 신뢰성 있는 연결형 서비스를 제공하는 것은?",
            options: ["TCP", "UDP", "IP", "ICMP"],
            answer: 0,
            year: "2022년 2회",
            conceptId: "network",
            explanation: "TCP는 연결형, 신뢰성 있는 서비스를 제공합니다. UDP는 비연결형입니다."
        },
        {
            id: 506,
            question: "COCOMO 모델의 프로젝트 유형 중 소규모(5만 라인 이하)에 해당하는 것은?",
            options: ["Organic", "Semi-Detached", "Embedded", "Basic"],
            answer: 0,
            year: "2023년 2회",
            conceptId: "sw_eng",
            explanation: "Organic(조직형)은 소규모 5만 라인 이하입니다. Semi-Detached는 중규모, Embedded는 대규모입니다."
        },
        {
            id: 507,
            question: "OSI 7계층 중 암호화와 압축을 담당하는 계층은?",
            options: ["응용 계층", "표현 계층", "세션 계층", "전송 계층"],
            answer: 1,
            year: "2022년 1회",
            conceptId: "network",
            explanation: "표현 계층(6계층)은 암호화, 압축, 코드 변환을 담당합니다."
        },
        {
            id: 508,
            question: "악성 스크립트를 삽입하여 사용자 브라우저에서 실행하게 하는 공격은?",
            options: ["SQL Injection", "XSS", "CSRF", "Buffer Overflow"],
            answer: 1,
            year: "2023년 3회",
            conceptId: "security",
            explanation: "XSS(Cross Site Scripting)는 악성 스크립트를 삽입하여 사용자 브라우저에서 실행되게 하는 공격입니다."
        },
        {
            id: 509,
            question: "HTTP의 기본 포트 번호는?",
            options: ["21", "22", "80", "443"],
            answer: 2,
            year: "2022년 2회",
            conceptId: "network",
            explanation: "HTTP는 포트 80, HTTPS는 443, FTP는 21, SSH는 22입니다."
        },
        {
            id: 510,
            question: "파일을 암호화하고 금전을 요구하는 악성코드는?",
            options: ["바이러스", "웜", "트로이목마", "랜섬웨어"],
            answer: 3,
            year: "2023년 1회",
            conceptId: "security",
            explanation: "랜섬웨어(Ransomware)는 파일을 암호화하고 복호화 대가로 금전을 요구합니다."
        },
        {
            id: 511,
            question: "소프트웨어 비용 산정 기법 중 전문가 판단에 의한 하향식 기법은?",
            options: ["LOC", "COCOMO", "델파이 기법", "FP"],
            answer: 2,
            year: "2022년 3회",
            conceptId: "sw_eng",
            explanation: "델파이 기법은 전문가 판단에 의한 하향식 비용 산정 기법입니다."
        },
        {
            id: 512,
            question: "OSI 7계층 중 MAC 주소를 사용하는 계층은?",
            options: ["물리 계층", "데이터링크 계층", "네트워크 계층", "전송 계층"],
            answer: 1,
            year: "2023년 2회",
            conceptId: "network",
            explanation: "데이터링크 계층(2계층)은 MAC 주소를 사용합니다."
        },
        {
            id: 513,
            question: "다수의 시스템을 이용하여 서버에 과부하를 주는 공격은?",
            options: ["DoS", "DDoS", "Sniffing", "Spoofing"],
            answer: 1,
            year: "2022년 1회",
            conceptId: "security",
            explanation: "DDoS(Distributed DoS)는 다수의 시스템을 이용하여 서버에 과부하를 주는 분산 서비스 거부 공격입니다."
        },
        {
            id: 514,
            question: "일방향 암호화로 복호화가 불가능한 것은?",
            options: ["대칭키 암호화", "비대칭키 암호화", "해시 함수", "스트림 암호"],
            answer: 2,
            year: "2023년 3회",
            conceptId: "security",
            explanation: "해시 함수는 일방향 암호화로 복호화가 불가능합니다. MD5, SHA 등이 있습니다."
        },
        {
            id: 515,
            question: "PERT 기법에서 기대 시간 공식으로 옳은 것은?",
            options: ["(낙관+비관)/2", "(낙관+4×기대+비관)/6", "(낙관+기대+비관)/3", "(낙관×비관)/기대"],
            answer: 1,
            year: "2022년 2회",
            conceptId: "sw_eng",
            explanation: "PERT 기대 시간 = (낙관치 + 4×기대치 + 비관치) / 6"
        },
        {
            id: 516,
            question: "OSI 7계층 중 포트 번호를 사용하는 계층은?",
            options: ["네트워크 계층", "전송 계층", "세션 계층", "응용 계층"],
            answer: 1,
            year: "2023년 1회",
            conceptId: "network",
            explanation: "전송 계층(4계층)은 포트 번호를 사용합니다. TCP, UDP가 이 계층에 해당합니다."
        },
        {
            id: 517,
            question: "사용자 의지와 무관하게 공격자의 의도된 행위를 수행하게 하는 공격은?",
            options: ["SQL Injection", "XSS", "CSRF", "Phishing"],
            answer: 2,
            year: "2022년 3회",
            conceptId: "security",
            explanation: "CSRF(Cross Site Request Forgery)는 사용자 의지와 무관하게 공격자의 의도된 행위를 수행하게 하는 공격입니다."
        },
        {
            id: 518,
            question: "CPM에서 가장 긴 경로를 무엇이라 하는가?",
            options: ["최단 경로", "임계 경로", "최적 경로", "기본 경로"],
            answer: 1,
            year: "2023년 2회",
            conceptId: "sw_eng",
            explanation: "CPM(Critical Path Method)에서 가장 긴 경로를 임계 경로(Critical Path)라고 합니다."
        },
        {
            id: 519,
            question: "비연결형 프로토콜로 빠르지만 신뢰성이 낮은 것은?",
            options: ["TCP", "UDP", "HTTP", "FTP"],
            answer: 1,
            year: "2022년 1회",
            conceptId: "network",
            explanation: "UDP는 비연결형 프로토콜로 빠르지만 신뢰성이 낮습니다."
        },
        {
            id: 520,
            question: "함수 점수(FP) 기법에서 측정하는 요소가 아닌 것은?",
            options: ["입력", "출력", "코드 라인 수", "조회"],
            answer: 2,
            year: "2023년 3회",
            conceptId: "sw_eng",
            explanation: "FP 기법은 입력, 출력, 조회, 파일, 인터페이스를 측정합니다. 코드 라인 수는 LOC 기법입니다."
        }
    ]
};
