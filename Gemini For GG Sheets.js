// API key for authentication
// API key để xác thực
const API_KEY = 'YOUR_API_KEY';

// API endpoint for generating content
// API endpoint để tạo nội dung
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

/**
 * Function to interact with GPT model
 * Hàm để tương tác với mô hình GPT
 * @param {string} prompt - The prompt to send to the GPT model - Chuỗi câu hỏi để gửi đến mô hình GPT
 * @returns {string} - The response from the GPT model - Phản hồi từ mô hình GPT
 */
function askGPT(prompt) {
  // Constructing the payload for the API request
  // Xây dựng payload cho yêu cầu API
  const payload = {
    contents: [
      {
        role: "model",
        parts: [
          {
            text: "I'm your helpful assistant in Google Sheets. My name is Gemini For GG Sheets GPT."
            // Đoạn văn bản mô tả vai trò của mô hình
          }
        ]
      },
      {
        role: "user",
        parts: [
          {
            text: prompt
            // Đoạn văn bản của người dùng
            // Chuỗi câu hỏi từ người dùng
          }
        ]
      }
    ]
  };

  // Options for the UrlFetchApp.fetch call
  // Các tùy chọn cho lệnh UrlFetchApp.fetch
  const options = {
    method: 'post',
    // HTTP method
    // Phương thức HTTP
    contentType: 'application/json',
    // Content type of the request
    // Loại nội dung của yêu cầu
    payload: JSON.stringify(payload),
    // Convert the payload object to a JSON string
    // Chuyển đổi đối tượng payload thành chuỗi JSON
    muteHttpExceptions: true
    // Prevents exceptions from being thrown for HTTP errors
    // Ngăn chặn ngoại lệ bị ném ra cho các lỗi HTTP
  };

  try {
    // Sending the request to the API
    // Gửi yêu cầu đến API
    const response = UrlFetchApp.fetch(URL, options);

    // Check if the response status code is 200 (OK)
    // Kiểm tra nếu mã trạng thái phản hồi là 200 (OK)
    if (response.getResponseCode() === 200) {
      // Parsing the JSON response
      // Phân tích phản hồi JSON
      const json = JSON.parse(response.getContentText());

      // Check if the response contains the expected structure
      // Kiểm tra nếu phản hồi chứa cấu trúc như mong đợi
      if (json.candidates && json.candidates.length > 0 && json.candidates[0].content.parts.length > 0) {
        // Returning the text part of the response
        // Trả về phần văn bản của phản hồi
        return json.candidates[0].content.parts[0].text;
      } else {
        // Handle unexpected JSON structure
        // Xử lý cấu trúc JSON không như mong đợi
        return 'Error: Unexpected response structure';
      }
    } else {
      // Handle non-200 HTTP response codes
      // Xử lý các mã phản hồi HTTP không phải 200
      return `Error: Received response code ${response.getResponseCode()}`;
    }
  } catch (e) {
    // Returning the error message in case of an exception
    // Trả về thông báo lỗi trong trường hợp xảy ra ngoại lệ
    return `Error: ${e.message}`;
  }
}