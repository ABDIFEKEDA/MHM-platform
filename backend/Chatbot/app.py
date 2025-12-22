from flask import Flask, request, jsonify
from datetime import datetime
from flask_cors import CORS
import logging
import json
from typing import Dict, Optional

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Statistics tracking
chat_stats = {
    "total_requests": 0,
    "successful_responses": 0,
    "unknown_queries": 0,
    "by_category": {
        "greeting": 0,
        "time_date": 0,
        "maternal_health": 0,
        "farewell": 0,
        "thanks": 0,
        "unknown": 0
    }
}

# Store chat history (in-memory, for demo purposes)
chat_history = []

def process_message(user_message: str) -> Dict[str, str]:
    """Process user message and return appropriate response"""
    user_message = user_message.lower().strip()
    category = "unknown"
    
    if not user_message:
        reply = "Please enter a message."
        category = "unknown"
    
    elif "hello" in user_message or "hi " in user_message or "hey" in user_message:
        reply = "Hi 👋, how can I help you today?"
        category = "greeting"
    
    elif "what time is it" in user_message:
        reply = f"The current time is {datetime.now().strftime('%H:%M:%S')}"
        category = "time_date"
    
    elif "date" in user_message:
        reply = f"Today's date is {datetime.now().strftime('%Y-%m-%d')}"
        category = "time_date"
    
    elif "bye" in user_message or "goodbye" in user_message or "see you" in user_message:
        reply = "Goodbye! Take care."
        category = "farewell"
    
    elif "your name" in user_message or "who are you" in user_message:
        reply = "I'm your maternal health chatbot assistant 🤖."
        category = "greeting"
    
    elif "i need your assistance" in user_message or "help" in user_message:
        reply = "I can answer questions about time, date, appointments, and general greetings."
        category = "maternal_health"
    
    elif "appointment" in user_message:
        reply = "You can schedule an appointment by contacting your doctor directly."
        category = "maternal_health"
    
    elif "patient" in user_message:
        reply = "Patients are monitored through the maternal health system dashboard."
        category = "maternal_health"
    
    elif "alert" in user_message:
        reply = "Alerts are triggered when patient vitals cross risk thresholds."
        category = "maternal_health"
    
    elif "thanks" in user_message or "thank you" in user_message:
        reply = "You're welcome! Happy to help 😊."
        category = "thanks"
    
    else:
        reply = "Sorry, I don't understand that. I can help with greetings, time, date, appointments, patient info, and alerts."
        category = "unknown"
    
    return {"reply": reply, "category": category}

@app.route("/chat", methods=["POST"])
def chat():
    """Main chat endpoint"""
    try:
        data = request.get_json()
        
        if not data or "message" not in data:
            return jsonify({
                "reply": "Please provide a 'message' in your request.",
                "error": "Invalid request format"
            }), 400
        
        user_message = data.get("message", "").strip()
        chat_stats["total_requests"] += 1
        
        # Process the message
        result = process_message(user_message)
        response_category = result["category"]
        
        # Update statistics
        if response_category in chat_stats["by_category"]:
            chat_stats["by_category"][response_category] += 1
        
        if response_category != "unknown":
            chat_stats["successful_responses"] += 1
        else:
            chat_stats["unknown_queries"] += 1
        
        # Log the interaction
        timestamp = datetime.now().isoformat()
        interaction = {
            "timestamp": timestamp,
            "user_message": user_message,
            "bot_reply": result["reply"],
            "category": response_category
        }
        chat_history.append(interaction)
        
        
        if len(chat_history) > 100:
            chat_history.pop(0)
        
        logger.info(f"Chat: '{user_message}' -> '{result['reply']}' (Category: {response_category})")
        
        return jsonify({
            "reply": result["reply"],
            "category": response_category,
            "timestamp": timestamp
        })
    
    except Exception as e:
        logger.error(f"Error processing chat request: {str(e)}")
        return jsonify({
            "reply": "Sorry, I encountered an error. Please try again.",
            "error": str(e)
        }), 500

@app.route("/stats", methods=["GET"])
def get_stats():
    """Get chatbot statistics"""
    return jsonify({
        "statistics": chat_stats,
        "total_interactions": len(chat_history),
        "uptime": datetime.now().isoformat()
    })

@app.route("/history", methods=["GET"])
def get_history():
    """Get chat history"""
    limit = request.args.get("limit", default=50, type=int)
    return jsonify({
        "history": chat_history[-limit:],
        "total": len(chat_history)
    })

@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "maternal-health-chatbot",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    })

@app.route("/test", methods=["GET"])
def test_endpoint():
    """Test endpoint to verify server is running"""
    return jsonify({
        "message": "Chatbot server is running!",
        "endpoints": {
            "POST /chat": "Send chat messages",
            "GET /stats": "Get chatbot statistics",
            "GET /history": "Get chat history",
            "GET /health": "Health check",
            "GET /test": "This test endpoint"
        }
    })

@app.route("/reset", methods=["POST"])
def reset_stats():
    """Reset statistics (for testing)"""
    global chat_stats, chat_history
    chat_stats = {
        "total_requests": 0,
        "successful_responses": 0,
        "unknown_queries": 0,
        "by_category": {
            "greeting": 0,
            "time_date": 0,
            "maternal_health": 0,
            "farewell": 0,
            "thanks": 0,
            "unknown": 0
        }
    }
    chat_history = []
    return jsonify({"message": "Statistics and history reset successfully"})

if __name__ == "__main__":
    print("=" * 60)
    print("MATERNAL HEALTH CHATBOT SERVER")
    print("=" * 60)
    print(f"Server starting on http://0.0.0.0:5001")
    print("\nAvailable endpoints:")
    print("  POST /chat     - Main chat endpoint")
    print("  GET  /stats    - Get chatbot statistics")
    print("  GET  /history  - Get chat history")
    print("  GET  /health   - Health check")
    print("  GET  /test     - Test endpoint")
    print("  POST /reset    - Reset statistics")
    print("=" * 60)
    
    app.run(host="0.0.0.0", port=5001, debug=True)