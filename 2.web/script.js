
// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/cCFZeL2dP/";

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
  console.log("start model loading");
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();
  labelContainer = document.getElementById("label-container");
  for (let i = 0; i < maxPredictions; i++) { // and class labels
    labelContainer.appendChild(document.createElement("div"));
  }
  await console.log("finish model loading");
}

function makeLabelContainer(prediction) {
  for (let i = 0; i < 3; i++) {
    if (i == 0) {
      labelContainer.childNodes[i].style.fontWeight = "bold";
    }
    var colors = colorMap[i]

    var barGraphLabel = document.createElement("div");
    barGraphLabel.className = "bar-graph-label";
    barGraphLabel.innerHTML = prediction[i].className;
    barGraphLabel.style = "display:inline-block;color:" + colors[0] + ";"

    var tmBarGraph = makeBarGraph(prediction[i].probability.toFixed(2) * 100, colors);
    const barGraphHolder = document.createElement("div");
    barGraphHolder.className = "bar-graph-holder";
    barGraphHolder.appendChild(barGraphLabel);
    barGraphHolder.appendChild(tmBarGraph);
    while (labelContainer.childNodes[i].firstChild) {
      labelContainer.childNodes[i].removeChild(labelContainer.childNodes[i].firstChild);
    }
    labelContainer.childNodes[i].appendChild(barGraphHolder);
  }
}

function makeBarGraph(value, colors) {
  var valueLabel = document.createElement("span");
  valueLabel.id = "value-label";
  valueLabel.innerHTML = value + "%";
  valueLabel.style = "color:" + colors[2] + ";";
  var inner = document.createElement("div");
  inner.id = "inner";
  inner.style = "width:" + value + "%" + ";background-color:" + colors[0] + ";"

  inner.appendChild(valueLabel);
  var container = document.createElement("div");
  container.id = "container";
  container.style = "background-color:" + colors[1] + ";"
  container.appendChild(inner);

  var tmBarGraph = document.createElement("tm-bar-graph");
  tmBarGraph.appendChild(container);

  return tmBarGraph;
}

async function predict() {
  console.log("start predict()");
  var image = document.getElementById("file-image", false)
  const prediction = await model.predict(image);
  prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));

  const college = prediction[0].probability > 0.3 ? prediction[0].className : "Unknown";
  const messageIndex = Math.floor(Math.random() * comments[college].length);
  const resultMessage = comments[college][messageIndex];
  document.getElementById("result-message").innerHTML = resultMessage;
  if (college != "Unknown") {
    makeLabelContainer(prediction);
  }
  await console.log("finish predict()");
}


// File Upload
//
function ekUpload() {
  function Init() {
    console.log("Upload Initialised");
    model_loaded = init()
    var fileSelect = document.getElementById("file-upload"),
      fileDrag = document.getElementById("file-drag");

    fileSelect.addEventListener("change", fileSelectHandler, false);

    // Is XHR2 available?
    var xhr = new XMLHttpRequest();
    if (xhr.upload) {
      // File Drop
      fileDrag.addEventListener("dragover", fileDragHover, false);
      fileDrag.addEventListener("dragleave", fileDragHover, false);
      fileDrag.addEventListener("drop", fileSelectHandler, false);
    }
  }

  function fileDragHover(e) {
    var fileDrag = document.getElementById("file-drag");

    e.stopPropagation();
    e.preventDefault();

    fileDrag.className =
      e.type === "dragover" ? "hover" : "modal-body file-upload";
  }

  async function fileSelectHandler(e) {
    // Fetch FileList object
    var files = e.target.files || e.dataTransfer.files;

    // Cancel event and hover styling
    fileDragHover(e);

    // Process all File objects
    for (var i = 0, f; (f = files[i]); i++) {
      // image_loaded = await parseFile(f);
      parseFile(f).then((res) => {
        console.log(res)
        setTimeout(function () {
          model_loaded.then(() => predict());
        }, 500);// 3초 후에 predict() 실행
      })
      // uploadFile(f);
    }
  }

  // Output
  function output(msg) {
    var m = document.getElementById("messages");
    m.innerHTML = msg;
  }

  async function parseFile(file) {
    console.log(file.name);

    var imageName = file.name;

    var isGood = /\.(?=gif|jpg|png|jpeg)/gi.test(imageName);
    if (isGood) {
      document.getElementById("start").classList.add("hidden");
      document.getElementById("retry").classList.remove("hidden");
      document.getElementById("notimage").classList.add("hidden");
      // Thumbnail Preview
      document.getElementById("file-image").classList.remove("hidden");
      document.getElementById("file-image").src = window.URL.createObjectURL(file);
      return "finish parseFile()"
    } else {
      document.getElementById("file-image").classList.add("hidden");
      document.getElementById("notimage").classList.remove("hidden");
      document.getElementById("start").classList.remove("hidden");
      document.getElementById("retry").classList.add("hidden");
      document.getElementById("file-upload-form").reset();
    }
  }

  function uploadFile(file) {
    var xhr = new XMLHttpRequest(),
      fileInput = document.getElementById("class-roster-file"),
      fileSizeLimit = 1024; // In MB
    if (xhr.upload) {
      // Check if file is less than x MB
      if (file.size <= fileSizeLimit * 1024 * 1024) {

        // File received / failed
        xhr.onreadystatechange = function (e) {
          if (xhr.readyState == 4) {
            // Everything is good!
            // progress.className = (xhr.status == 200 ? "success" : "failure");
            // document.location.reload(true);
          }
        };

        // Start upload
        xhr.open(
          "POST",
          document.getElementById("file-upload-form").action,
          true
        );
        xhr.setRequestHeader("X-File-Name", file.name);
        xhr.setRequestHeader("X-File-Size", file.size);
        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.send(file);
      } else {
        output("Please upload a smaller file (< " + fileSizeLimit + " MB).");
      }
    }
  }

  // Check for the various File API support.
  if (window.File && window.FileList && window.FileReader) {
    Init();
  } else {
    document.getElementById("file-drag").style.display = "none";
  }
}
ekUpload();

var colorMap = [
  ["#E67701", "#FFECE2", "#ffffff"],
  ["#D84C6F", "#FFE9EC", "#ffffff"],
  ["#794AEF", "#F1F0FF", "#ffffff"],
  ["#1967D2", "#D2E3FC", "#ffffff"],
  ["#E67701", "#FFECE2", "#ffffff"],
  ["#D84C6F", "#FFE9EC", "#ffffff"]
]

var comments = {
  "공과대학": [
    "얼굴 분석 결과, 공과대학과 어울리는 당신의 직감 뛰어난 눈빛이에요! 여기서는 기계에게도 '안녕'이라고 말할 수 있는 공학자를 양성해요.",
    "얼굴에는 고요한 전자회로와 함께 자동차 엔진 소리가 느껴집니다! 공과대학에서는 이런 '엔지니어 뇌'를 개발하는 데 도움이 될 거예요.",
    "당신의 얼굴은 마치 문제를 푸는 고속 컴퓨터처럼 생겼어요! 공과대학, 여기서는 문제를 해결하고 새로운 기술을 개발합니다."
  ],
  "문과대학": [
    "얼굴 분석 결과, 당신은 언어의 마법사입니다! 문과대학에서는 단어들을 마법처럼 다루고, 글로 세상을 바꾸는 법을 배워요.",
    "얼굴에서 예술적 감성이 느껴져요! 문과대학은 여기에서 그림자와 빛을 다루는 예술가로 성장하는 곳이에요.",
    "당신의 얼굴은 어떤 문학 작품의 주인공처럼 생겼어요! 문과대학에서는 당신의 이야기를 쓰고 세상에 전해봐요."
  ],
  "법과대학": [
    "당신의 얼굴은 공정함과 결단력을 상징하고 있어요! 법과대학은 이런 민정을 중요시하며, 사회 정의를 위한 변호사로 성장하는 곳이에요.",
    "얼굴에서는 사회적 책임감이 느껴져요! 법과대학에서는 어떤 경우에도 믿을 만한 법률 전문가로 성장할 수 있어요.",
    "얼굴 분석 결과, 당신은 공평한 사회를 위한 변화를 원하는 마음이 큰 사람입니다. 법과대학은 여기에서 그런 열정을 키우는 곳이에요."
  ],
  "의과대학": [
    "얼굴에서는 건강과 진료의 긍정적 에너지가 느껴져요! 의과대학은 환자의 삶을 개선하고, 의사로서 세상을 더 나은 곳으로 만드는 곳입니다.",
    "당신의 얼굴은 신뢰와 안정감을 전해줘요. 의과대학에서는 환자들을 안심시키고 건강을 회복시키는 능력을 키우게 될 거예요.",
    "의과대학은 건강에 관한 지식과 관심을 가진 사람들의 집합소입니다. 여기에서 환자의 생명을 존중하고 삶의 질을 향상시킬 수 있어요."
  ],
  "자연과학대학": [
    "얼굴에서는 자연계와의 조화를 보여줘요! 자연과학대학에서는 지구와 우주의 비밀을 해명하고, 새로운 발견을 향한 여정을 떠날 수 있어요.",
    "얼굴 분석 결과, 당신은 과학자의 눈을 가지고 있어요! 자연과학대학에서는 지구의 생태계와 물리적 법칙을 탐험하게 될 거예요.",
    "자연과학대학은 호기심과 탐구 정신을 중요시하는 곳입니다. 얼굴처럼 무한한 발견을 기대해보세요!"
  ],
  "음악대학": [
    "음악 대학에 어울리는 얼굴! 음악의 감성과 예술적 표현을 통해 세계를 아름답게 만들어보세요.",
    "얼굴에서는 노래가 흘러나오는 것 같아요! 음악대학에서는 소리로 감정을 전달하고, 세상을 감동으로 채울 수 있어요.",
    "음악 대학은 음악의 힘을 이용하여 인류의 감정을 움직이는 곳입니다. 여기에서 음악의 마법을 배우세요!"
  ],
  "경영대학": [
    "얼굴에서 창업가 정신이 느껴져요! 경영대학은 여기에서 비즈니스 아이디어를 현실로 만들어요. 스타트업을 꿈꾸는 당신, 여기로 오세요!",
    "당신의 얼굴에는 성공한 CEO의 미소가 있어요! 경영대학은 이런 리더로 성장하는 곳입니다.",
    "얼굴 분석 결과, 당신은 재무부서와 협력하는 탁월한 능력을 가지고 있어요! 경영대학에서는 돈을 효율적으로 관리하고, 비즈니스를 성공으로 이끌 수 있어요.",
    "당신의 얼굴은 마치 비즈니스 팀의 리더처럼 생겼어요! 경영대학에서는 현실 비즈니스 시나리오를 다루고 미래의 경영자로 성장할 수 있어요.",
    "얼굴 분석 결과, 당신은 비즈니스 세계를 향한 열정을 가지고 있어요! 경영대학에서는 전략을 짜고 조직을 성공으로 이끄는 방법을 배울 수 있어요.",
    "경영대학은 경제와 사회에 영향을 미치는 곳입니다. 비즈니스의 미래를 예측하고 변화를 주도하세요."
  ],
  "체육대학": [
    "체육대학에 어울리는 활기찬 얼굴이에요! 스포츠와 운동을 사랑하는 당신, 여기서는 운동의 재미와 건강을 추구합니다.",
    "당신의 얼굴은 운동장과 농구코트에서 뽐내기 딱 좋아요! 체육대학에서는 스포츠를 통해 팀워크와 리더십을 배우고, 운동 미학을 키워요.",
    "체육대학은 활동적인 삶을 즐기고, 얼굴처럼 건강한 미래를 만들어나갈 수 있는 곳이에요!"
  ],
  "사범대학": [
    "얼굴에서는 교육에 대한 열정이 느껴져요! 사범대학에서는 학생들을 가르치고 지식을 전달하며, 미래를 밝게 만들어요.",
    "사범대학은 교육을 통해 사회에 긍정적인 변화를 이끄는 곳입니다. 얼굴처럼 밝은 미래를 함께 만들어보세요.",
    "얼굴 분석 결과, 당신은 지식을 나누는 데 열정을 가지고 있어요! 사범대학에서는 학생들에게 지식과 가치를 전해주는 능력을 키울 수 있어요."
  ],
  "Unknown": [
    "이 사진만 봐서는 잘 모르겠어요... 다른 사진을 올려봐주시겠어요?!"
  ]
}