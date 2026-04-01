// Chatbox Functionality
class Chatbox {
  constructor() {
    this.chatbox = document.getElementById('chatbox');
    this.chatboxToggle = document.getElementById('chatboxToggle');
    this.chatboxClose = document.getElementById('chatboxClose');
    this.chatboxInput = document.getElementById('chatboxInput');
    this.chatboxSend = document.getElementById('chatboxSend');
    this.chatboxMessages = document.getElementById('chatboxMessages');
    this.chatboxBadge = document.querySelector('.chatbox-badge');
    this.voiceToggle = document.getElementById('voiceToggle');
    this.modeToggle = document.getElementById('modeToggle');
    
    // Voice elements
    this.voiceButton = null;
    this.speechRecognition = null;
    this.speechSynthesis = window.speechSynthesis;
    this.isListening = false;
    this.isSpeaking = false;
    this.voiceEnabled = true;
    
    // Conversation mode: 'voice' or 'text'
    this.conversationMode = 'text'; // Default to text mode
    
    this.isOpen = false;
    this.messageCount = 1;
    
    this.knowledgeBase = {
      // General company info
      'company': 'Zimora Technologies is a modern IT solutions company focused on delivering high-quality digital products that help businesses grow, compete and scale in today\'s fast-paced digital world.',
      'about': 'We specialize in building secure, user-friendly and performance-driven solutions tailored to each client\'s unique goals. From idea to deployment, we work closely with our clients to ensure every project delivers real value and measurable results.',
      'mission': 'Our mission is to empower businesses with cutting-edge technology solutions that drive growth, efficiency, and competitive advantage in the digital marketplace.',
      'vision': 'Our vision is to be the trusted partner for businesses seeking digital transformation, delivering innovative solutions that exceed expectations and create lasting value.',
      'ceo': 'Our CEO is Alex Dev, who leads Zimora Technologies with a vision for innovation and excellence in digital solutions. Under Alex\'s leadership, we continue to deliver cutting-edge technology solutions that help businesses thrive in the digital age.',
      'who is the ceo': 'Our CEO is Alex Dev, who leads Zimora Technologies with a vision for innovation and excellence in digital solutions. Under Alex\'s leadership, we continue to deliver cutting-edge technology solutions that help businesses thrive in the digital age.',
      
      // Services
      'services': 'We offer Web Development, Mobile & Web App Development, and Digital Marketing services. Each service is tailored to meet your specific business needs.',
      'web development': 'We create business and corporate websites, company portfolio websites, e-commerce platforms, custom web systems, responsive and mobile-friendly designs, and website optimization.',
      'app development': 'Our mobile and web app development includes web applications, mobile-friendly systems, admin and management panels, API development and integrations, custom software solutions, and system maintenance.',
      'digital marketing': 'Our digital marketing services cover SEO, social media marketing strategies, brand positioning and online presence, content marketing and planning, website traffic growth strategies, and performance analysis.',
      
      // Technologies
      'technologies': 'We work with modern technologies including React, Angular, Vue.js, Node.js, Python, JavaScript, HTML5, CSS3, WordPress, PHP, MySQL, Git, Docker, AWS, Google Cloud, and React Native.',
      
      // Contact info
      'contact': 'You can reach us via email at zimoratechnologies@gmail.com, call us at +1 (555) 123-4567, or visit our office at Nairobi, Kenya - Westlands Business District, 1234 Tech Hub Building.',
      'location': 'Our office is located in Nairobi, Kenya at Westlands Business District, 1234 Tech Hub Building.',
      'email': 'You can email us at zimoratechnologies@gmail.com for general inquiries, support@zimoratech.com for support, or sales@zimoratech.com for sales.',
      'phone': 'You can call us at: Main: +1 (555) 123-4567, Support: +1 (555) 123-4568, Sales: +1 (555) 123-4569.',
      'hours': 'Our business hours are: Monday - Friday: 9:00 AM - 6:00 PM, Saturday: 10:00 AM - 2:00 PM, Sunday: Closed.',
      
      // Process and pricing
      'process': 'Our process starts with understanding your needs, followed by planning, development, testing, and deployment. We maintain transparent communication throughout the project.',
      'pricing': 'Our pricing varies based on project complexity and requirements. We offer competitive rates and provide detailed quotes after understanding your specific needs. Contact us for a personalized quote.',
      
      // Why choose us
      'why choose': 'You should choose Zimora Technologies for our client-focused development approach, modern and scalable technologies, clean and user-friendly designs, transparent communication, and reliable support and maintenance.',
      
      // Default responses
      'hello': 'Hello! Welcome to Zimora Technologies. How can I help you today?',
      'hi': 'Hi there! I\'m here to help you learn about our services and solutions. What would you like to know?',
      'thanks': 'You\'re welcome! Is there anything else I can help you with?',
      'thank you': 'You\'re welcome! Feel free to ask if you have more questions.',
      'bye': 'Goodbye! Feel free to reach out anytime if you need assistance.',
      'goodbye': 'Goodbye! We look forward to helping you with your digital needs.',

      // Reply (added)
      'reply': 'Thank you for your message! We appreciate you reaching out to Zimora Technologies. How can we assist you today with your web development, app development, or digital marketing needs?'
    };
    
    this.init();
    this.initVoiceFeatures();
  }
  
  init() {
    // Only initialize if all required elements exist
    if (!this.chatbox || !this.chatboxToggle || !this.chatboxClose || !this.chatboxInput || !this.chatboxSend || !this.chatboxMessages) {
      console.warn('Chatbox elements not found. Skipping initialization.');
      return;
    }
    
    // Event listeners
    this.chatboxToggle.addEventListener('click', () => this.toggleChatbox());
    this.chatboxClose.addEventListener('click', () => this.closeChatbox());
    this.chatboxSend.addEventListener('click', () => this.sendMessage());
    this.chatboxInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });
    
    // Voice toggle event listener
    if (this.voiceToggle) {
      this.voiceToggle.addEventListener('click', () => this.toggleVoice());
    }
    
    // Mode toggle event listener
    if (this.modeToggle) {
      this.modeToggle.addEventListener('click', () => this.toggleMode());
    }
    
    // Initialize chatbox state
    this.resetChatbox();
    this.updateModeUI();
  }
  
  initVoiceFeatures() {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      this.initSpeechRecognition();
    }
    
    // Check if browser supports speech synthesis
    if ('speechSynthesis' in window) {
      this.speechSynthesis = window.speechSynthesis;
    }
    
    // Create voice button only if in voice mode
    if (this.conversationMode === 'voice') {
      this.createVoiceButton();
    }
  }
  
  toggleMode() {
    this.conversationMode = this.conversationMode === 'voice' ? 'text' : 'voice';
    this.updateModeUI();
    this.showNotification(`Switched to ${this.conversationMode} mode`);
    
    // Handle mode-specific features
    if (this.conversationMode === 'voice') {
      this.createVoiceButton();
      this.voiceEnabled = true;
      if (this.voiceToggle) {
        this.voiceToggle.style.display = 'flex';
      }
    } else {
      this.removeVoiceButton();
      this.voiceEnabled = false;
      if (this.voiceToggle) {
        this.voiceToggle.style.display = 'none';
      }
      // Stop any ongoing voice activities
      if (this.speechRecognition && this.isListening) {
        this.speechRecognition.stop();
      }
      if (this.speechSynthesis && this.isSpeaking) {
        this.speechSynthesis.cancel();
      }
    }
  }
  
  updateModeUI() {
    if (!this.modeToggle) return;
    
    if (this.conversationMode === 'voice') {
      this.modeToggle.innerHTML = '<i class="fa-solid fa-microphone"></i>';
      this.modeToggle.title = 'Voice mode - Click to switch to text';
      this.modeToggle.style.color = '#0066cc'; // Blue color
    } else {
      this.modeToggle.innerHTML = '<i class="fa-solid fa-keyboard"></i>';
      this.modeToggle.title = 'Text mode - Click to switch to voice';
      this.modeToggle.style.color = '#0066cc'; // Blue color
    }
  }
  
  removeVoiceButton() {
    if (this.voiceButton && this.voiceButton.parentNode) {
      this.voiceButton.parentNode.removeChild(this.voiceButton);
      this.voiceButton = null;
    }
  }
  
  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.speechRecognition = new SpeechRecognition();
    
    // Enhanced settings for better question recognition
    this.speechRecognition.continuous = false;
    this.speechRecognition.interimResults = true; // Enable interim results for better UX
    this.speechRecognition.maxAlternatives = 3; // Get multiple recognition alternatives
    this.speechRecognition.lang = 'en-US';
    
    let finalTranscript = '';
    let interimTranscript = '';
    
    this.speechRecognition.onstart = () => {
      this.isListening = true;
      this.updateVoiceButton(true);
      finalTranscript = '';
      interimTranscript = '';
      this.showListeningIndicator();
    };
    
    this.speechRecognition.onresult = (event) => {
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
          
          // Check if it's a complete question
          if (this.isQuestion(finalTranscript.trim())) {
            this.chatboxInput.value = finalTranscript.trim();
            this.speechRecognition.stop();
            setTimeout(() => this.sendMessage(), 500);
          }
        } else {
          interimTranscript += transcript;
        }
      }
      
      // Show interim results in input for better feedback
      this.chatboxInput.value = finalTranscript + interimTranscript;
    };
    
    this.speechRecognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      this.isListening = false;
      this.updateVoiceButton(false);
      this.hideListeningIndicator();
      
      if (event.error === 'no-speech') {
        this.showNotification('No speech detected. Please try speaking clearly.');
      } else if (event.error === 'not-allowed') {
        this.showNotification('Microphone access denied. Please allow microphone access to use voice input.');
      } else if (event.error === 'network') {
        this.showNotification('Network error. Please check your internet connection.');
      } else if (event.error === 'audio-capture') {
        this.showNotification('No microphone found. Please connect a microphone.');
      }
    };
    
    this.speechRecognition.onend = () => {
      this.isListening = false;
      this.updateVoiceButton(false);
      this.hideListeningIndicator();
      
      // If we have a transcript but didn't detect it as a question, still send it
      if (finalTranscript.trim() && !this.isQuestion(finalTranscript.trim())) {
        this.chatboxInput.value = finalTranscript.trim();
        setTimeout(() => this.sendMessage(), 500);
      }
    };
  }
  
  isQuestion(text) {
    const questionWords = [
      'what', 'who', 'where', 'when', 'why', 'how', 'which', 'whose', 'whom',
      'are', 'is', 'do', 'does', 'did', 'can', 'could', 'would', 'should',
      'will', 'may', 'might', 'must', 'shall', 'tell', 'explain', 'describe',
      'show', 'give', 'help', 'need', 'want', 'looking for', 'searching',
      '?', '¿', '؟' // Question marks in different languages
    ];
    
    const lowerText = text.toLowerCase();
    
    // Check if text ends with question mark or contains question words
    return lowerText.includes('?') || 
           lowerText.includes('¿') || 
           lowerText.includes('؟') ||
           questionWords.some(word => lowerText.includes(word));
  }
  
  showListeningIndicator() {
    // Create or update listening indicator in input placeholder
    if (!this.chatboxInput) return;
    
    this.originalPlaceholder = this.chatboxInput.placeholder;
    this.chatboxInput.placeholder = '🎤 Listening... Speak clearly';
    this.chatboxInput.style.background = 'rgba(255, 77, 0, 0.05)';
    this.chatboxInput.style.borderColor = '#ff4d00';
  }
  
  hideListeningIndicator() {
    if (!this.chatboxInput) return;
    
    this.chatboxInput.placeholder = this.originalPlaceholder || 'Type your message...';
    this.chatboxInput.style.background = '';
    this.chatboxInput.style.borderColor = '';
  }
  
  createVoiceButton() {
    const inputWrapper = document.querySelector('.chatbox-input-wrapper');
    if (!inputWrapper) return;
    
    this.voiceButton = document.createElement('button');
    this.voiceButton.id = 'voiceButton';
    this.voiceButton.className = 'voice-button';
    this.voiceButton.innerHTML = '<i class="fa-solid fa-microphone"></i>';
    this.voiceButton.title = 'Click to speak';
    
    this.voiceButton.addEventListener('click', () => this.toggleVoiceInput());
    
    inputWrapper.appendChild(this.voiceButton);
  }
  
  toggleVoiceInput() {
    if (!this.speechRecognition) {
      this.showNotification('Voice input is not supported in your browser.');
      return;
    }
    
    if (this.isListening) {
      this.speechRecognition.stop();
    } else {
      this.speechRecognition.start();
    }
  }
  
  updateVoiceButton(isListening) {
    if (!this.voiceButton) return;
    
    if (isListening) {
      this.voiceButton.classList.add('listening');
      this.voiceButton.innerHTML = '<i class="fa-solid fa-stop"></i>';
      this.voiceButton.title = 'Stop recording';
    } else {
      this.voiceButton.classList.remove('listening');
      this.voiceButton.innerHTML = '<i class="fa-solid fa-microphone"></i>';
      this.voiceButton.title = 'Click to speak';
    }
  }
  
  speakText(text) {
    if (!this.speechSynthesis || !this.voiceEnabled) return;
    
    // Stop any ongoing speech
    this.speechSynthesis.cancel();
    
    // Clean up text for better speech
    const cleanText = this.cleanTextForSpeech(text);
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';
    utterance.rate = 0.9; // Slightly slower for better comprehension
    utterance.pitch = 1.0;
    utterance.volume = 0.9; // Slightly lower volume
    
    // Get available voices and prefer female voice for assistant
    const voices = this.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.includes('Female') || 
      voice.name.includes('Samantha') || 
      voice.name.includes('Karen') ||
      voice.name.includes('Google US English Female')
    ) || voices.find(voice => voice.lang.includes('en')) || voices[0];
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    utterance.onstart = () => {
      this.isSpeaking = true;
      this.updateSpeakingState(true);
    };
    
    utterance.onend = () => {
      this.isSpeaking = false;
      this.updateSpeakingState(false);
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      this.isSpeaking = false;
      this.updateSpeakingState(false);
      this.showNotification('Voice synthesis error. Please try again.');
    };
    
    // Add pause between sentences for better comprehension
    utterance.onboundary = (event) => {
      if (event.name === 'sentence') {
        // Small pause between sentences
        setTimeout(() => {}, 200);
      }
    };
    
    this.speechSynthesis.speak(utterance);
  }
  
  cleanTextForSpeech(text) {
    // Clean text for better speech synthesis
    return text
      .replace(/Zimora Technologies/g, 'Zimora Technologies') // Ensure proper pronunciation
      .replace(/Alex Dev/g, 'Alex Dev') // Ensure proper name pronunciation
      .replace(/\bCEO\b/g, 'C E O') // Spell out CEO
      .replace(/\bi\.e\.\b/g, 'that is') // Replace i.e. with that is
      .replace(/\be\.g\.\b/g, 'for example') // Replace e.g. with for example
      .replace(/\bIT\b/g, 'I T') // Spell out IT
      .replace(/\bSEO\b/g, 'S E O') // Spell out SEO
      .replace(/\bUI\b/g, 'U I') // Spell out UI
      .replace(/\bUX\b/g, 'U X') // Spell out UX
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim();
  }
  
  updateSpeakingState(isSpeaking) {
    // Update all voice buttons to show speaking state
    const voiceButtons = document.querySelectorAll('.message-voice-btn');
    voiceButtons.forEach(btn => {
      if (isSpeaking) {
        btn.style.background = '#ef4444';
        btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        btn.title = 'Speaking...';
      } else {
        btn.style.background = 'rgba(255, 77, 0, 0.1)';
        btn.innerHTML = '<i class="fa-solid fa-volume-up"></i>';
        btn.title = 'Listen to message';
      }
    });
  }
  
  showNotification(message) {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.className = 'voice-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff4d00;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 100000;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
  
  toggleVoice() {
    this.voiceEnabled = !this.voiceEnabled;
    
    if (this.voiceToggle) {
      if (this.voiceEnabled) {
        this.voiceToggle.innerHTML = '<i class="fa-solid fa-volume-up"></i>';
        this.voiceToggle.title = 'Voice enabled - Click to disable';
        this.voiceToggle.style.color = '#ff4d00';
        this.showNotification('Voice responses enabled');
      } else {
        this.voiceToggle.innerHTML = '<i class="fa-solid fa-volume-mute"></i>';
        this.voiceToggle.title = 'Voice disabled - Click to enable';
        this.voiceToggle.style.color = '#6b7280';
        this.showNotification('Voice responses disabled');
        
        // Stop any ongoing speech
        if (this.speechSynthesis) {
          this.speechSynthesis.cancel();
        }
      }
    }
  }
  
  toggleChatbox() {
    if (this.isOpen) {
      this.closeChatbox();
    } else {
      this.openChatbox();
    }
  }
  
  openChatbox() {
    this.chatbox.classList.add('active');
    this.chatboxBadge.style.display = 'none';
    this.isOpen = true;
    this.chatboxInput.focus();
  }
  
  closeChatbox() {
    this.chatbox.classList.remove('active');
    this.isOpen = false;
  }
  
  resetChatbox() {
    // Only proceed if messages container exists
    if (!this.chatboxMessages) return;
    
    // Clear all messages except the first bot message
    const messages = this.chatboxMessages.querySelectorAll('.message');
    messages.forEach((message, index) => {
      if (index > 0) {
        message.remove();
      }
    });
    
    // Reset message count
    this.messageCount = 1;
    
    // Hide badge
    if (this.chatboxBadge) {
      this.chatboxBadge.style.display = 'none';
    }
  }
  
  sendMessage() {
    const message = this.chatboxInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    this.addMessage(message, 'user');
    
    // Clear input
    this.chatboxInput.value = '';
    
    // Show typing indicator
    this.showTypingIndicator();
    
    // Generate bot response
    setTimeout(() => {
      this.removeTypingIndicator();
      const response = this.generateResponse(message);
      this.addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000); // Random delay for realism
  }
  
  addMessage(text, sender) {
    if (!this.chatboxMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = sender === 'bot' ? '<i class="fa-solid fa-robot"></i>' : '<i class="fa-solid fa-user"></i>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Add voice button for bot messages only in voice mode
    if (sender === 'bot' && this.conversationMode === 'voice') {
      const voiceBtn = document.createElement('button');
      voiceBtn.className = 'message-voice-btn';
      voiceBtn.innerHTML = '<i class="fa-solid fa-volume-up"></i>';
      voiceBtn.title = 'Listen to message';
      voiceBtn.addEventListener('click', () => this.speakText(text));
      
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      contentDiv.appendChild(paragraph);
      contentDiv.appendChild(voiceBtn);
    } else {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      contentDiv.appendChild(paragraph);
    }
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    this.chatboxMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    this.chatboxMessages.scrollTop = this.chatboxMessages.scrollHeight;
    
    // Update message count and badge
    if (sender === 'bot') {
      this.messageCount++;
      if (!this.isOpen && this.chatboxBadge) {
        this.chatboxBadge.textContent = this.messageCount;
        this.chatboxBadge.style.display = 'block';
      }
      
      // Auto-speak bot responses only in voice mode and if voice is enabled
      if (this.conversationMode === 'voice' && this.voiceEnabled && !this.isSpeaking) {
        setTimeout(() => this.speakText(text), 500);
      }
    }
  }
  
  showTypingIndicator() {
    if (!this.chatboxMessages) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = `
      <div class="message-avatar">
        <i class="fa-solid fa-robot"></i>
      </div>
      <div class="message-content">
        <div class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
    
    this.chatboxMessages.appendChild(typingDiv);
    this.chatboxMessages.scrollTop = this.chatboxMessages.scrollHeight;
  }
  
  removeTypingIndicator() {
    if (!this.chatboxMessages) return;
    
    const typingIndicator = this.chatboxMessages.querySelector('.typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }
  
  generateResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(this.knowledgeBase)) {
      if (message.includes(key)) {
        return response;
      }
    }
    
    // Check for service-related queries
    if (message.includes('what') && message.includes('service')) {
      return 'We offer three main services: Web Development (websites and web systems), Mobile & Web App Development (applications and software), and Digital Marketing (SEO, social media, and online growth strategies). Which service interests you most?';
    }
    
    // Check for pricing queries
    if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
      return 'Our pricing varies based on project complexity and requirements. We provide customized quotes after understanding your specific needs. Would you like to schedule a consultation to discuss your project?';
    }
    
    // Check for project-related queries
    if (message.includes('project') || message.includes('portfolio') || message.includes('work')) {
      return 'We\'ve worked on various projects including business websites, e-commerce platforms, mobile applications, and digital marketing campaigns. You can view some of our featured projects on the Our Projects page. What type of project are you interested in?';
    }
    
    // Check for help/support queries
    if (message.includes('help') || message.includes('support') || message.includes('assist')) {
      return 'I\'m here to help! I can answer questions about our services, company information, contact details, technologies we use, and much more. What specific information would you like to know?';
    }
    
    // Default response
    return 'I\'m not sure I understand. I can help you with information about our services (web development, app development, digital marketing), company details, contact information, and technologies we use. Could you please rephrase your question or ask about something specific?';
  }
}

// Initialize chatbox when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Only initialize if chatbox elements exist
  if (document.getElementById('chatbox')) {
    window.chatbox = new Chatbox();
    
    // Reset chatbox when page is loaded (fresh start)
    if (window.chatbox) {
      window.chatbox.resetChatbox();
    }
  }
});
