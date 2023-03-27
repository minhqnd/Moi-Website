function searchQuestion() {
    // Lấy giá trị của ô input
    const question = document.getElementById("question-input").value;
  
    // Hiển thị phần tử "loading"
    const loading = document.getElementById("loading");
    loading.style.display = "block";
  
    // Gửi request đến API
    fetch(`https://api.minhquang.xyz/tracnghiem/${question}`)
      .then(response => response.json())
      .then(data => {
        // Ẩn phần tử "loading"
        loading.style.display = "none";
  
        // Hiển thị kết quả lên trang web
        const hoidap247 = data.hoidap247;
        const moon = data.moon;
        const vietjack = data.vietjack;
  
        showResult(hoidap247, "hoidap247");
        showResult(moon, "moon");
        showResult(vietjack, "vietjack");
      });
  }
  
  
  function showResult(result, website) {
    // Lấy phần tử hiển thị kết quả
    const questionList = document.querySelector(`#${website} .question-list`);
  
    // Xóa các phần tử cũ
    questionList.innerHTML = "";
  
    // Hiển thị kết quả mới
    const question = result.question;
    const answer = result.answer;
    const explain = result.explain;
    const link = result.link;
  
    const html = `
      <h3><a href="${link}" target="_blank">${link}</a></h3>
      <p>Câu hỏi: ${question}</p>
      <p>Câu trả lời: ${answer}</p>
      <p>Giải thích: ${explain}</p>
    `;
  
    questionList.innerHTML = html;
  }