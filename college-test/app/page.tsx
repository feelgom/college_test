import Image from "next/image"
import githubIcon from '../public/github-icon.jpg';
import uploadImg from '../public/upload_img.svg';
import {ekUpload} from '../public/static/script.js';

export default function Home() {
  let disqus_config = function () {
    this.page.url = "https://disqus.com/by/feelgom/";  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = "college-test"; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
  };
  (function () { // DON'T EDIT BELOW THIS LINE
    if (typeof window === 'object') {
      // Check if document is finally loaded
      let s = document.createElement('script');
      s.src = 'https://feelgom.disqus.com/embed.js';
      let date:number =  +new Date();
      s.setAttribute('data-timestamp', date.toString());
      (document.head || document.body).appendChild(s);
      document.addEventListener("DOMContentLoaded", function () {
        alert('Finished loading')
      });
    }
  })();


  return (
    <div>
      <nav className="navbar navbar-expand-lg nav-distance">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">학과상 테스트</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Pricing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* <!-- main text --> */}
      <section className="section">
        <h1 className="title">인공지능 학과상 테스트</h1>
        <h2 className="subtitle">내 얼굴은 어떤 학과에 어울릴까?</h2>
      </section>

      {/* <!-- github link --> */}
      <section className="github">
        <div className="container mt-5 github-cover d-flex flex-row-reverse">
          {/* <img src="img/github-icon.jpg" alt="" className="github-icon"/> */}
          <Image src={githubIcon} alt="" className="github-icon"/>
          <a href="https://github.com/feelgom" className="github-link">By @feelgom &nbsp;</a>
        </div>

        {/* <!-- 방문자수 카운터 --> */}
        <div className="container visit-counter d-flex flex-row-reverse">
          <img src="https://www.cutercounter.com/hits.php?id=hmxnokxx&nd=6&style=1" alt="hit counter"/>
          <a>today:</a>
        </div>

      </section>

      {/* <!-- <button type="button" onclick="predict()">예측</button> --> */}
      {/* <!-- Upload  --> */}
      <form id="file-upload-form" className="mt-5 container uploader">
        <input id="file-upload" type="file" name="fileUpload" accept="image/*" />
        <label htmlFor="file-upload" id="file-drag" className="image-upload-wrap">

          {/* <!-- before image uploaded --> */}
          <div id="start">
            <Image src={uploadImg} alt="" className="mt-5 pt-5 upload-icon"/>
              <h3 className="mb-5 pb-5 pt-2 upload-text">얼굴 사진을 올려놓거나 눌러서 업로드하세요!</h3>
              <div id="notimage" className="hidden">Please select an image</div>
          </div>

          {/* <!-- after image uploaded --> */}
          <img id="file-image" src="#" alt="Preview" className="hidden"/>
            <p id="result-message"></p>
            <div id="label-container"></div>

            <div id="response" className="hidden">
              <div id="messages"></div>
            </div>
        </label>
      </form>

      <ins className="kakao_ad_area" style={{display:"none"}} data-ad-unit="DAN-8J3hFhTYJd6wghzX" data-ad-width="320"
        data-ad-height="50"></ins>
      <script type="text/javascript" src="//t1.daumcdn.net/kas/static/ba.min.js" async></script>

      {/* <!-- 댓글 구현 --> */}
      <section className="mt-5 container commnet">
        <div id="disqus_thread"></div>
        <noscript>현재 사용 중인 브라우저는 스크립트를 지원하지 않거나, 해당 기능이 활성화되어 있지 않아서 댓글 기능을 사용할 수 없습니다.</noscript>
      </section>

      <ins className="kakao_ad_area" style={{display:"none"}} data-ad-unit="DAN-gV4MdSdfXFZpjtOr" data-ad-width="728"
        data-ad-height="90"></ins>
      <script type="text/javascript" src="//t1.daumcdn.net/kas/static/ba.min.js" async></script>

      {/* <!-- footer --> */}
      <div className="mt-5 pt-3 footer">
        <p>© feelgom 2023. All Rights Reserved.</p>
        <p>Privacy &nbsp&nbsp | &nbsp&nbsp Terms &nbsp&nbsp | &nbsp&nbsp FAQ</p>
      </div>

      {/* <!-- script --> */}
      <script async src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
        integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
        crossOrigin="anonymous"></script>
      <script async src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"
        integrity="sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS"
        crossOrigin="anonymous"></script>
      <script async src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js" crossOrigin="anonymous"></script>
      <script async src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js"></script>
      {/* <script type="text/javascript" src="public/static/script.js"></script> */}

    </div>
  )
}
