function readFeedback() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();

  let feedbackText = "";

  // Loop through each response (skip header row)
  for (let i = 1; i < data.length; i++) {
    feedbackText +=
      "Liked: " + data[i][1] + "\n" +
      "Improve: " + data[i][2] + "\n" +
      "Suggestion: " + data[i][3] + "\n\n";
  }

  // ✅ Write COMBINED RAW FEEDBACK
  sheet.getRange("F1").setValue("Combined Feedback");
  sheet.getRange("F2").setValue(feedbackText);

  // ✅ Prepare prompt for AI
  const prompt = `
You are an AI assistant analyzing event feedback.

Give:
1. Overall sentiment
2. What people liked most
3. Common problems
4. Suggestions for improvement

Feedback:
${feedbackText}
`;

  // ✅ Call Gemini
  const aiSummary = callGemini(prompt);

  // ✅ Write AI SUMMARY in next column
  sheet.getRange("G1").setValue("AI Feedback Summary");
  sheet.getRange("G2").setValue(aiSummary);
}
