import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Groq from "groq-sdk";

const FarmerVoiceAssistant = () => {
  const [conversation, setConversation] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const groq = new Groq({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });

  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      setError("Your browser does not support speech recognition.");
    }
  }, []);

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const generateAIResponse = async (userQuery) => {
    try {
      const result = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant helping farmers understand government schemes, crop insurance, farming methods, and general agricultural queries in a friendly tone.",
          },
          {
            role: "user",
            content: userQuery,
          },
        ],
        model: "llama3-8b-8192",
        max_tokens: 300,
        temperature: 0.7,
      });

      return (
        result.choices[0]?.message?.content?.trim() ||
        "Sorry, I couldn't process your query. Please try again."
      );
    } catch (error) {
      console.error("AI Response Error:", error);
      return "I faced some issues generating a response. Please try again later.";
    }
  };

  const getSuggestions = (query) => {
    const keywords = query.toLowerCase().split(" ");
    const schemes = {
      insurance: "Pradhan Mantri Fasal Bima Yojana: Provides crop insurance to farmers.",
      loan: "Kisan Credit Card (KCC): Offers short-term loans to farmers at subsidized interest rates.",
      subsidy: "PM-Kisan Samman Nidhi: Direct financial assistance of ₹6,000/year for small and marginal farmers.",
      organic: "Paramparagat Krishi Vikas Yojana: Promotes organic farming practices.",
      irrigation: "Pradhan Mantri Krishi Sinchai Yojana: Supports micro-irrigation and water conservation.",
    };

    return Object.entries(schemes)
      .filter(([key]) => keywords.includes(key))
      .map(([, value]) => value);
  };

  const handleStartListening = () => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      setError("Your browser does not support speech recognition.");
      return;
    }

    setError("");
    resetTranscript();
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
  };

  const handleStopListening = async () => {
    SpeechRecognition.stopListening();
    setIsListening(false);

    const finalQuery = transcript.trim();
    resetTranscript();

    if (finalQuery) {
      setConversation((prev) => [...prev, { type: "user", text: finalQuery }]);
      setSuggestions(getSuggestions(finalQuery));

      setIsProcessing(true);
      try {
        const aiResponse = await generateAIResponse(finalQuery);
        setConversation((prev) => [...prev, { type: "ai", text: aiResponse }]);
        speakText(aiResponse);
      } catch (error) {
        console.error("Error processing response:", error);
      } finally {
        setIsProcessing(false);
      }
    } else {
      const errorMessage = "I didn't catch that. Please try speaking again.";
      setConversation((prev) => [
        ...prev,
        { type: "ai", text: errorMessage },
      ]);
      speakText(errorMessage);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <h2>AI Voice Assistant For Farmers</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      <button
        onClick={isListening ? handleStopListening : handleStartListening}
        disabled={isProcessing}
        style={{
          padding: "10px 20px",
          fontSize: "18px",
          backgroundColor: isListening
            ? "#dc3545"
            : isProcessing
            ? "#6c757d"
            : "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        {isListening ? "Stop" : isProcessing ? "Processing..." : "Speak"}
      </button>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "10px",
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        {conversation.map((message, index) => (
          <div
            key={index}
            style={{
              textAlign: message.type === "user" ? "right" : "left",
              margin: "10px 0",
              padding: "10px",
              backgroundColor:
                message.type === "user" ? "#e6f2ff" : "#f0f0f0",
              borderRadius: "10px",
            }}
          >
            {message.text}
          </div>
        ))}
      </div>

      {suggestions.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>Suggested Schemes:</h3>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FarmerVoiceAssistant;
