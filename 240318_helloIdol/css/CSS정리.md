# style 적용하는 3가지 방법
1. 인라인 방법 <... style="" ...>
2. head 태그 안 `<style> ... </style>` 
3. `<link href="css파일">`


# CSS 형식
```css
선택자 {
    속성 : 값; /* 선언부 */
}
```

# 선택자
<pre>
* : 모든 태그 적용
#id : 아이디 적용
.class : 클래스 적용
TAG : 태그 적용

<hr>
<b> 시험문제 나오겠다~~ </b>
선택자1, 선택자2 : 선택자1 또는 선택자2
선택자1 선택자2 : 선택자1의 자손 선택자2
선택자1 > 선택자2 : 선택자1의 자식 선택자2

선택자1 + 선택자2 : 선택자1 바로 밑 선택자2
선택자1 ~ 선택자2 : 선택자1 밑 선택자2 모두

[속성="값"] : 속성의 속성값이 값일 때 적용

선택자:first-child() : 선택자<span style="color:yellow">가</span> 첫 번째 자식
선택자:nth-child(N) : 선택자<span style="color:yellow">가</span> n번째 자식 
선택자:last-child() : 선택자<span style="color:yellow">가</span> 막내 자식

<hr>
선택자:hover : 선택자에 커서를 가져가면 그 선택자 선택

* > TAG > class > id
</pre>

# 우선순위
1. !important -> 속성 : 값  !important;
2. (인라인 style : HTML 파일 안 태그의 style 속성)
3. #id
4. .class
5. <태그>
6. `*`
- <span style="color:yellow">구체적인 것이 포괄적인 것보다 더 우선순위가 높다!</span>
- 같은 우선순위일 때는 <span style="color:yellow">나중에 쓰는게 적용</span>된다.