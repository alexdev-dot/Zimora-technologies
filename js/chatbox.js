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
    
    // Conversation memory
    this.conversationHistory = [];
    this.userProfile = {
      name: null,
      interests: [],
      previousTopics: [],
      lastInteraction: null
    };
    
    // Personality traits
    this.personality = {
      enthusiasm: 0.7,
      empathy: 0.8,
      helpfulness: 0.9,
      casualness: 0.6
    };
    
    // Response patterns for natural conversation
    this.conversationPatterns = {
      greetings: ['Hello there!', 'Hi!', 'Hey!', 'Good to see you!', 'Welcome!'],
      acknowledgments: ['I see', 'Got it', 'That makes sense', 'I understand', 'Right'],
      transitions: ['Speaking of which', 'That reminds me', 'By the way', 'You know what', 'Interesting'],
      enthusiasm: ['That\'s great!', 'Excellent!', 'Wonderful!', 'Fantastic!', 'That\'s exciting!'],
      thinking: ['Let me think about that...', 'Hmm, good question...', 'That\'s interesting...', 'Well...', 'So...'],
      helpful: ['I\'d be happy to help with that!', 'Let me assist you with this', 'I can definitely help', 'Here\'s what I can do'],
      casual: ['Awesome!', 'Cool!', 'Great!', 'Perfect!', 'Sounds good!']
    };
    
    this.knowledgeBase = {
      // General company info
      'company': 'Zimora Technologies is a modern IT solutions company focused on delivering high-quality digital products that help businesses grow, compete and scale in today\'s fast-paced digital world.',
      'about': 'We specialize in building secure, user-friendly and performance-driven solutions tailored to each client\'s unique goals. From idea to deployment, we work closely with our clients to ensure every project delivers real value and measurable results.',
      'mission': 'Our mission is to empower businesses with cutting-edge technology solutions that drive growth, efficiency, and competitive advantage in the digital marketplace.',
      'vision': 'Our vision is to be the trusted partner for businesses seeking digital transformation, delivering innovative solutions that exceed expectations and create lasting value.',
      'ceo': 'Our CEO is Alex Dev, who leads Zimora Technologies with a vision for innovation and excellence in digital solutions. Under Alex\'s leadership, we continue to deliver cutting-edge technology solutions that help businesses thrive in the digital age.',
      'who is the ceo': 'Our CEO is Alex Dev, who leads Zimora Technologies with a vision for innovation and excellence in digital solutions. Under Alex\'s leadership, we continue to deliver cutting-edge technology solutions that help businesses thrive in the digital age.',
      
      // Services
      'services': 'We offer comprehensive IT services including Web Development, Web Application Development, Digital Marketing, Hosting & Domain Setup, E-commerce Solutions, and Maintenance & Support. Each service is tailored to meet your specific business needs.',
      'web development': 'We create business and corporate websites, company portfolio websites, real estate platforms, custom web systems, responsive and mobile-friendly designs, and website optimization and performance improvements.',
      'web app development': 'Our web application development includes custom web applications, admin and management panels, API development and integrations, custom software solutions, and system maintenance and upgrades.',
      'digital marketing': 'Our digital marketing services cover search engine optimization (SEO), social media marketing strategies, brand positioning and online presence, content marketing and planning, website traffic growth strategies, and performance analysis and reporting.',
      'hosting': 'Our hosting and domain setup services include domain registration support, website hosting setup, SSL installation, email hosting (business emails), and server configuration & deployment.',
      'domain': 'Our hosting and domain setup services include domain registration support, website hosting setup, SSL installation, email hosting (business emails), and server configuration & deployment.',
      'e-commerce': 'Our e-commerce solutions include custom e-commerce development, payment gateway integration, product catalog management, shopping cart & checkout optimization, and security and compliance.',
      'ecommerce': 'Our e-commerce solutions include custom e-commerce development, payment gateway integration, product catalog management, shopping cart & checkout optimization, and security and compliance.',
      'maintenance': 'Our maintenance and support services include regular website updates, bug fixing and improvements, performance monitoring, content updates, and 24/7 technical support.',
      'support': 'Our maintenance and support services include regular website updates, bug fixing and improvements, performance monitoring, content updates, and 24/7 technical support.',
      
      // Technologies
      'technologies': 'We work with modern technologies including React, Angular, Vue.js, Node.js, Python, JavaScript, HTML5, CSS3, WordPress, PHP, MySQL, Git, Docker, AWS, and Google Cloud.',
      
      // Contact info
      'contact': 'You can reach us via email at zimoratechnologies@gmail.com, call us at +254 (117) 411-547.',
      'location': 'located in Ruiru, Kiambu',
      'email': 'You can email us at zimoratechnologies@gmail.com for general inquiries.',
      'phone': 'You can call us at: +254 117 411 547.',
      'hours': 'Our business hours are: Monday - Friday: 9:00 AM - 6:00 PM, Saturday: 10:00 AM - 2:00 PM, Sunday: Closed.',
      
      // Process and pricing
      'process': 'Our process starts with understanding your needs, followed by planning, development, testing, and deployment. We maintain transparent communication throughout the project.',
      'pricing': 'Our pricing varies based on project complexity and requirements. We offer competitive rates and provide detailed quotes after understanding your specific needs. Contact us for a personalized quote.',
      
      // Why choose us
      'why choose': 'You should choose Zimora Technologies for our client-focused development approach, modern and scalable technologies, clean and user-friendly designs, transparent communication, and reliable support and maintenance.',
      
      // Default responses
      'hello': this.getRandomPattern('greetings') + ' Welcome to Zimora Technologies! I\'m excited to help you explore our digital solutions. What brings you here today?',
      'hi': this.getRandomPattern('greetings') + ' Great to connect with you! I\'m here to help you learn about our services. What\'s on your mind?',
      'hey': 'Hey there! I\'m glad you reached out. How can I assist you with your digital needs today?',
      'good morning': 'Good morning! I hope you\'re having a great start to your day. How can I help you with our tech solutions?',
      'good afternoon': 'Good afternoon! Thanks for stopping by. What can I help you with today?',
      'thanks': this.getRandomPattern('casual') + ' You\'re very welcome! Is there anything else I can help you with?',
      'thank you': 'My pleasure! I\'m always here to help. What else would you like to know?',
      'bye': this.getRandomPattern('casual') + ' It was great chatting with you! Feel free to reach out anytime. Have a wonderful day!',
      'goodbye': 'Goodbye for now! I am here whenever you need assistance with your digital projects. Take care!',
      'see you': 'See you later! Don\'t hesitate to come back if you need more help.',
      'how are you': 'I am doing fantastic, thanks for asking! I am always excited to help people like you discover great tech solutions. How are you doing today?',

      // Reply (added)
      'reply': 'Thank you so much for reaching out! I really appreciate you taking time to connect with Zimora Technologies. ' + this.getRandomPattern('helpful') + ' What specific area can I assist you with today - web development, digital marketing, or perhaps our custom solutions?'
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
  
  // Helper method to get random pattern from conversation patterns
  getRandomPattern(type) {
    const patterns = this.conversationPatterns[type];
    if (!patterns || patterns.length === 0) return '';
    return patterns[Math.floor(Math.random() * patterns.length)];
  }
  
  // Helper method to add personality to responses
  addPersonalityToResponse(baseResponse) {
    const random = Math.random();
    let enhancedResponse = baseResponse;
    
    // Add enthusiasm based on personality trait
    if (random < this.personality.enthusiasm) {
      const enthusiasm = this.getRandomPattern('enthusiasm');
      enhancedResponse = enthusiasm + ' ' + enhancedResponse;
    }
    
    // Add casual touch
    if (random < this.personality.casualness) {
      const casual = this.getRandomPattern('casual');
      enhancedResponse = enhancedResponse + ' ' + casual;
    }
    
    return enhancedResponse;
  }
  
  // Helper method to simulate thinking time
  getThinkingDelay(messageLength) {
    // Base delay + variable time based on message complexity
    const baseDelay = 800;
    const complexityDelay = Math.min(messageLength * 50, 2000);
    const randomVariation = Math.random() * 1000;
    
    return baseDelay + complexityDelay + randomVariation;
  }
  
  // Helper method to update conversation memory
  updateConversationHistory(userMessage, botResponse) {
    this.conversationHistory.push({
      userMessage,
      botResponse,
      timestamp: new Date().toISOString(),
      topics: this.extractTopics(userMessage)
    });
    
    // Keep only last 10 conversations to avoid memory bloat
    if (this.conversationHistory.length > 10) {
      this.conversationHistory.shift();
    }
    
    // Update user profile
    this.updateUserProfile(userMessage);
  }
  
  // Helper method to extract topics from messages
  extractTopics(message) {
    const topics = [];
    const topicKeywords = {
      'web development': ['web', 'website', 'development', 'design', 'frontend', 'backend'],
      'digital marketing': ['marketing', 'seo', 'social media', 'advertising', 'promotion'],
      'e-commerce': ['ecommerce', 'e-commerce', 'shop', 'store', 'payment', 'shopping'],
      'hosting': ['hosting', 'server', 'domain', 'ssl', 'email'],
      'mobile': ['mobile', 'app', 'ios', 'android'],
      'pricing': ['price', 'cost', 'pricing', 'budget', 'quote'],
      'contact': ['contact', 'reach', 'email', 'phone', 'call']
    };
    
    const lowerMessage = message.toLowerCase();
    for (const [topic, keywords] of Object.entries(topicKeywords)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        topics.push(topic);
      }
    }
    
    return topics;
  }
  
  // Helper method to update user profile
  updateUserProfile(message) {
    const topics = this.extractTopics(message);
    
    // Add new interests
    topics.forEach(topic => {
      if (!this.userProfile.interests.includes(topic)) {
        this.userProfile.interests.push(topic);
      }
    });
    
    // Update previous topics
    this.userProfile.previousTopics = [...new Set([...this.userProfile.previousTopics, ...topics])];
    this.userProfile.lastInteraction = new Date().toISOString();
  }
  
  // Helper method to generate contextual follow-up questions
  generateFollowUpQuestion(currentTopics) {
    const followUps = {
      'web development': [
        'What type of website are you looking to create?',
        'Do you have any specific design preferences in mind?',
        'What features would be most important for your website?'
      ],
      'digital marketing': [
        'What are your main marketing goals?',
        'Who is your target audience?',
        'Have you tried any marketing strategies before?'
      ],
      'e-commerce': [
        'What kind of products will you be selling?',
        'Do you need help with payment gateway integration?',
        'How many products do you plan to list?'
      ],
      'pricing': [
        'What\'s your approximate budget for this project?',
        'Would you like a detailed breakdown of our pricing?',
        'Are you looking for a one-time project or ongoing support?'
      ]
    };
    
    for (const topic of currentTopics) {
      if (followUps[topic]) {
        const questions = followUps[topic];
        return questions[Math.floor(Math.random() * questions.length)];
      }
    }
    
    return null;
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
    
    // Show thinking indicator with personality
    this.showTypingIndicator();
    
    // Calculate thinking delay based on message complexity
    const thinkingDelay = this.getThinkingDelay(message.length);
    
    // Generate bot response with delay
    setTimeout(() => {
      this.removeTypingIndicator();
      const response = this.generateResponse(message);
      const enhancedResponse = this.addPersonalityToResponse(response);
      
      this.addMessage(enhancedResponse, 'bot');
      
      // Update conversation memory
      this.updateConversationHistory(message, enhancedResponse);
      
      // Generate contextual follow-up if appropriate
      const topics = this.extractTopics(message);
      if (Math.random() < 0.3 && topics.length > 0) { // 30% chance to ask follow-up
        setTimeout(() => {
          const followUp = this.generateFollowUpQuestion(topics);
          if (followUp) {
            const followUpWithPersonality = this.getRandomPattern('thinking') + ' ' + followUp;
            this.addMessage(followUpWithPersonality, 'bot');
          }
        }, 2000 + Math.random() * 2000);
      }
    }, thinkingDelay);
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
    
    // Check for conversation context first
    if (this.conversationHistory.length > 0) {
      const lastTopic = this.userProfile.previousTopics[this.userProfile.previousTopics.length - 1];
      if (lastTopic && this.extractTopics(userMessage).length === 0) {
        // User is continuing conversation about previous topic
        return this.getRandomPattern('acknowledgments') + ', let me tell you more about ' + lastTopic + '. ' + this.getDetailedTopicInfo(lastTopic);
      }
    }
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(this.knowledgeBase)) {
      if (message.includes(key)) {
        return response;
      }
    }
    
    // Enhanced service-related queries with personality
    if (message.includes('what') && message.includes('service')) {
      return this.getRandomPattern('helpful') + ' We offer six main services: Web Development (business websites, real estate platforms, custom web systems), Web Application Development (custom web applications, admin panels, APIs), Digital Marketing (SEO, social media, brand positioning), Hosting & Domain Setup (domain registration, SSL, server configuration), E-commerce Solutions (custom development, payment integration), and Maintenance & Support (24/7 technical support, updates). Which service interests you most?';
    }
    
    // Enhanced pricing queries with empathy
    if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
      return this.getRandomPattern('thinking') + ' Our pricing varies based on project complexity and requirements. We provide customized quotes after understanding your specific needs. ' + this.getRandomPattern('enthusiasm') + ' Would you like to schedule a consultation to discuss your project?';
    }
    
    // Enhanced project-related queries with enthusiasm
    if (message.includes('project') || message.includes('portfolio') || message.includes('work')) {
      return this.getRandomPattern('enthusiasm') + ' We\'ve worked on various projects including business websites, real estate platforms, e-commerce solutions, mobile applications, web applications, and digital marketing campaigns. You can view some of our featured projects on the Our Projects page. What type of project are you interested in?';
    }
    
    // Enhanced help/support queries with warmth
    if (message.includes('help') || message.includes('support') || message.includes('assist')) {
      return this.getRandomPattern('helpful') + ' I\'m here to help! I can answer questions about our services (web development, web application development, digital marketing, hosting, e-commerce solutions), company details, contact information, technologies we use, and much more. What specific information would you like to know?';
    }
    
    // Check for user emotions and respond empathetically
    if (message.includes('confused') || message.includes('lost') || message.includes('unclear')) {
      return this.getRandomPattern('acknowledgments') + ', I completely understand. Let me make this simpler for you. ' + this.getRandomPattern('helpful') + ' What specific challenge are you trying to solve with your business?';
    }
    
    if (message.includes('excited') || message.includes('interested') || message.includes('looking forward')) {
      return this.getRandomPattern('enthusiasm') + ' I\'m excited too! It sounds like you\'re ready to start something amazing. ' + this.getRandomPattern('helpful') + ' What service caught your attention?';
    }
    
    // Enhanced default response with personality
    const acknowledgment = this.getRandomPattern('acknowledgments');
    const helpful = this.getRandomPattern('helpful');
    return acknowledgment + ', I\'m not sure I understand completely. ' + helpful + ' I can help you with information about our services (web development, web application development, digital marketing, hosting, e-commerce solutions), company details, contact information, and technologies we use. Could you please rephrase your question or tell me more about what you\'re looking for?';
  }
  
  // Helper method to get detailed topic information
  getDetailedTopicInfo(topic) {
    const topicDetails = {
      'web development': 'We create stunning, responsive websites that not only look great but also perform exceptionally well. Our team focuses on user experience and conversion optimization.',
      'digital marketing': 'Our marketing strategies are data-driven and tailored to your specific industry. We help you reach your target audience effectively.',
      'e-commerce': 'We build secure, scalable online stores with seamless payment integration and inventory management systems.',
      'hosting': 'We provide reliable hosting solutions with 99.9% uptime, daily backups, and excellent technical support.',
      'pricing': 'We offer flexible pricing models to fit different budgets, from startups to enterprise-level solutions.'
    };
    
    return topicDetails[topic] || 'Let me provide you with more detailed information about this area.';
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
