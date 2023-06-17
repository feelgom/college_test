
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

async function predict() {
  console.log("start predict()");
  var image = document.getElementById("file-image", false)
  const prediction = await model.predict(image);
  prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));

  var college = prediction[0].className;
  var probability = prediction[0].probability.toFixed(2);
  var resultMessage;
  switch (college) {
    case "공과대학":
      if (probability > 0.6){
        resultMessage = "확신의 공대상!ㅋㅋㅋ"
        break
      } else if (probability > 0.3) {
        resultMessage = "당신은 공대상이군요!"
        break
      }
    case "문과대학":
      if (probability > 0.6) {
        resultMessage = "확신의 문과상!ㅋㅋㅋ"
        break
      } else if (probability > 0.3) {
        resultMessage = "당신은 혹시 문과대생?!"
        break
      }
    case "법과대학":
      if (probability > 0.6) {
        resultMessage = "당신은 법대생입니다!!!"
        break
      } else if (probability > 0.3) {
        resultMessage = "당신은 법대에 어울리는상이군요!"
        break
      }
    case "의과대학":
      if (probability > 0.6) {
        resultMessage = "당신은 누가봐도 의대생입니다!!!"
        break
      } else if (probability > 0.3) {
        resultMessage = "당신은 의대상이군요!"
        break
      }
    case "자연과학대학":
      if (probability > 0.6) {
        resultMessage = "확신의 이과상!ㅋㅋㅋㅋ"
        break
      } else if (probability > 0.3) {
        resultMessage = "당신은 자연대상이군요!"
        break
      }
    case "음악대학":
      if (probability > 0.6) {
        resultMessage = "음악 좀 하시나요?!ㅋㅋㅋㅋ"
        break
      } else if (probability > 0.3) {
        resultMessage = "당신은 음대상이군요!"
        break
      }
    default:
      resultMessage = "이 사진만 봐서는 잘 모르겠어요... 다른 사진을 올려봐주시겠어요?!"
  }
  document.getElementById("result-message").innerHTML = resultMessage;

  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction;
  }
  await console.log("finish predict()");
}


// File Upload
//
function ekUpload() {
  function Init() {
    console.log("Upload Initialised");
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

  function fileSelectHandler(e) {
    // Fetch FileList object
    var files = e.target.files || e.dataTransfer.files;

    // Cancel event and hover styling
    fileDragHover(e);

    // Process all File objects
    for (var i = 0, f; (f = files[i]); i++) {
      parseFile(f);
      // uploadFile(f);
      model_loaded = init()
      model_loaded.then(() => predict())
    }
  }

  // Output
  function output(msg) {
    // Response
    var m = document.getElementById("messages");
    m.innerHTML = msg;
  }

  function parseFile(file) {
    console.log(file.name);

    var imageName = file.name;

    var isGood = /\.(?=gif|jpg|png|jpeg)/gi.test(imageName);
    if (isGood) {
      document.getElementById("start").classList.add("hidden");
      document.getElementById("response").classList.remove("hidden");
      document.getElementById("notimage").classList.add("hidden");
      // Thumbnail Preview
      document.getElementById("file-image").classList.remove("hidden");
      document.getElementById("file-image").src = window.URL.createObjectURL(file);
    } else {
      document.getElementById("file-image").classList.add("hidden");
      document.getElementById("notimage").classList.remove("hidden");
      document.getElementById("start").classList.remove("hidden");
      document.getElementById("response").classList.add("hidden");
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


