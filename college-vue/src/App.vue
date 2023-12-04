<template>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>인공지능 학과상 테스트</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="style.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
      rel="stylesheet"
    />
  </head>

  <body>
    <!-- Google Tag Manager (noscript) -->
    <noscript
      ><iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-M6LHPP3K"
        height="0"
        width="0"
        style="display: none; visibility: hidden"
      ></iframe
    ></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <!-- navigation bar -->
    <nav class="navbar navbar-expand-lg nav-distance">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">학과상 테스트</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <!-- <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li> -->
          </ul>
        </div>
      </div>
    </nav>

    <!-- main text -->
    <section class="section">
      <h1 class="title">인공지능 학과상 테스트</h1>
      <h2 class="subtitle">내 얼굴은 어떤 학과에 어울릴까?</h2>
    </section>

    <!-- github link -->
    <section class="github">
      <div class="container mt-5 github-cover d-flex flex-row-reverse">
        <img src="img/github-icon.jpg" alt="" class="github-icon" />
        <a href="https://github.com/feelgom" class="github-link"
          >By @feelgom &nbsp;</a
        >
      </div>

      <!-- 방문자수 카운터 -->
      <div class="container visit-counter d-flex flex-row-reverse">
        <img
          src="https://www.cutercounter.com/hits.php?id=hmxnokxx&nd=6&style=1"
          border="0"
          alt="hit counter"
        /><a>total:</a>
      </div>
    </section>

    <!-- Upload  -->
    <form id="file-upload-form" class="uploader mt-5 container">
      <input id="file-upload" type="file" name="fileUpload" accept="image/*" />
      <label
        for="file-upload"
        id="file-drag"
        class="pt-5 pb-4 image-upload-wrap"
      >
        <!-- before model loaded -->
        <div id="waiting">
          <h3 class="mt-2 upload-text">페이지 로딩 중 입니다</h3>
          <h3 class="mt-2 upload-text">조금만 기다려주세요~</h3>
        </div>

        <!-- before image uploaded -->
        <div id="start" class="hidden">
          <img src="img/upload_img.svg" alt="" class="upload-icon" />
          <h3 class="mt-2 upload-text">
            얼굴 사진을 올려놓거나 눌러서 업로드하세요!
          </h3>
        </div>

        <!-- after image uploaded -->
        <img
          id="file-image"
          src="#"
          alt="Preview"
          class="hidden uploaded-image"
        />
        <p id="result-message"></p>
        <div id="label-container"></div>

        <!-- SNS Share BEGIN -->
        <!-- <div class="sns-share a2a_kit a2a_kit_size_32 a2a_default_style">
        <a class="a2a_dd" href="https://www.addtoany.com/share"></a>
        <a class="a2a_button_kakao"></a>
        <a class="a2a_button_facebook"></a>
        <a class="a2a_button_linkedin"></a>
      </div>
      <script async src="https://static.addtoany.com/menu/page.js"></script> -->
        <!-- SNS Share END -->

        <div id="retry" class="hidden mt-3">
          <h3 class="mt-2">다른 사진으로 다시하기</h3>
          <div id="notimage">Please select an image</div>
        </div>
      </label>
    </form>

    <div class="mt-2 container comment">
      <p>
        본 테스트에 사용된 사진은 어디에도 저장되지 않으며 전송되지 않습니다.
        이용하는 기기 내에서만 모델분석이 이루어집니다.
      </p>
    </div>
  </body>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  methods: {
    sayHello() {
      alert("Hello");
    },
  },
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css);
@import url("https://fonts.googleapis.com/css?family=Roboto");


html,
body {
  height: 100%;
  text-align: center;
}

.uploader {
  border-radius: 10px;
  background: #F6F7FA;
  border: 1.5px solid #F6F7FA;
  padding: 8% 5%;
}

.image-upload-wrap {
  width: 50%;
  margin: 0 auto;
  border-radius: 10px;
  background: #FFFFFF;
  border: 1.5px dashed #35465D;
  box-shadow: 0px 4px 4px 0px #00000040;
}

.modal-body {
  width: 55%;
}

.image-upload-wrap:hover {
  background: #27363d;
  border: 1.5px dashed #35465D;
}

.upload-icon {
  width: 30%
}

.upload-text {
  width: 61%;
  font-family: 'Jua';
  font-size: 1.2rem;
  line-height: 1.53;
  text-align: center;
  color: #35465D;
  margin: 0 auto;
}

.uploader #waiting.hidden {
  display: none;
}

.uploader label.hover #start i.fa {
  transform: scale(0.8);
  opacity: 0.3;
}


.uploader #start.hidden {
  display: none;
}

.uploader #start i.fa {
  font-size: 50px;
  margin-bottom: 1rem;
  transition: all .2s ease-in-out;
}

.uploader #retry {
  float: left;
  clear: both;
  width: 100%;
  font-family: 'Jua';
  font-size: 1.2rem;
  line-height: 1.53;
  align-items: center;
  color: #35465D;
  background-color: #a7aeb8;
  margin: 0 auto;
  border-radius: 10px;
}

.uploader #retry:hover {
  background: #27363d;
  border: 1.5px dashed #35465D;
}

.uploader #retry.hidden {
  display: none;
}

.uploader #retry #messages {
  margin-bottom: .5rem;
}

.uploader #file-image {
  display: inline;
  margin: 0 auto .5rem auto;
  width: 80%;
  height: auto;
  max-width: 180px;
  border-radius: 10px;
}

.uploader #file-image.hidden {
  display: none;
}

.uploader #notimage {
  display: block;
  float: left;
  clear: both;
  width: 100%;
}

.uploader #notimage.hidden {
  display: none;
}

.uploader input[type="file"] {
  display: none;
}

.uploader div {
  margin: 0 0 .5rem 0;
  color: #5f6982;
}

.nav-distance {
  padding: 2.1% 7.7%
}

.navbar-brand {
  font-family: 'Jua';
  font-style: normal;
  font-weight: 400;
  display: flex;
  align-items: center;
  color: #35465D;
}

.navbar {
  --bs-navbar-toggler-border-color: #ffffff
}

.section {
  margin-top: 100px
}

.title {
  font-family: 'Jua';
  line-height: 1.67;
  align-items: center;
  text-align: center;
  color: #35465D;
}

.subtitle {
  font-family: 'Jua';
  line-height: 1.53;
  align-items: center;
  text-align: center;
  color: #35465D;
}

@media screen and (max-width: 600px) {
  html {
    font-size: 10px
  }

  .navbar-brand {
    font-size: 2rem;
  }
}

.github-link {
  font-family: 'Jua';
  font-size: 1rem;
  line-height: 1.71;
  align-items: center;
  text-align: center;
  text-decoration-line: underline;
  color: #F73737;
}

.github-icon {
  width: 1.6rem;
}

div#disqus_thread iframe[sandbox] {
  max-height: 0px !important;
}

.comment {
  text-align: center;
  font-family: "Jua";
  font-size: 16px;
  line-height: 0.2;
  color: #555b68;
}

.footer {
  text-align: center;
  background: #0f1f35;
  height: 50px;
}

.footer p {
  font-family: "Jua";
  font-size: 12px;
  line-height: 0.2;
  color: #555b68;
}

.uploaded-image {
  border-radius: 10px;
}

.bar-graph-holder {
  display: flex;
  margin-bottom: 12px;
  align-items: center;
  justify-content: space-between;
}

.bar-graph-label {
  color: #E67701;
}

tm-bar-graph {
  width: 60%;
  border-radius: 5px;
  height: 29px;
  display: block;
  overflow: hidden;
}

tm-bar-graph #container {
  background-color: #FFECE2;
  width: 100%;
  height: 100%;
}

tm-bar-graph #inner {
  position: relative;
  background-color: #E67701;
  height: 100%;
  border-radius: 5px;
}

tm-bar-graph #value-label {
  /* color: #ffffff; */
  position: absolute;
  top: 50%;
  right: 5px;
  font-size: 10px;
  font-weight: 400;
  transform: translate(0, -50%)
}
</style>
