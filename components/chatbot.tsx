'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

interface ConversationHistory {
  userMessage: string;
  botResponse: string;
  timestamp: string;
  topics: string[];
}

interface UserProfile {
  name: string | null;
  interests: string[];
  previousTopics: string[];
  lastInteraction: string | null;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hello! I'm the Zimora Technologies assistant. How can I help you learn about our services and solutions today?",
      sender: 'bot',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(1);
  const [conversationMode, setConversationMode] = useState<'text' | 'voice'>('text');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [notification, setNotification] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechRecognitionRef = useRef<any>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);

  const conversationHistory = useRef<ConversationHistory[]>([]);
  const userProfile = useRef<UserProfile>({
    name: null,
    interests: [],
    previousTopics: [],
    lastInteraction: null,
  });

  const personality = {
    enthusiasm: 0.7,
    empathy: 0.8,
    helpfulness: 0.9,
    casualness: 0.6,
  };

  const conversationPatterns = {
    greetings: ['Hello there!', 'Hi!', 'Hey!', 'Good to see you!', 'Welcome!'],
    acknowledgments: ['I see', 'Got it', 'That makes sense', 'I understand', 'Right'],
    transitions: ['Speaking of which', 'That reminds me', 'By the way', 'You know what', 'Interesting'],
    enthusiasm: ["That's great!", 'Excellent!', 'Wonderful!', 'Fantastic!', "That's exciting!"],
    thinking: ['Let me think about that...', 'Hmm, good question...', "That's interesting...", 'Well...', 'So...'],
    helpful: ["I'd be happy to help with that!", 'Let me assist you with this', 'I can definitely help', "Here's what I can do"],
    casual: ['Awesome!', 'Cool!', 'Great!', 'Perfect!', 'Sounds good!'],
  };

  const knowledgeBase: Record<string, string> = {
    company: 'Zimora Technologies is a modern IT solutions company focused on delivering high-quality digital products that help businesses grow, compete and scale in today\'s fast-paced digital world.',
    about: 'We specialize in building secure, user-friendly and performance-driven solutions tailored to each client\'s unique goals. From idea to deployment, we work closely with our clients to ensure every project delivers real value and measurable results.',
    mission: 'Our mission is to empower businesses with cutting-edge technology solutions that drive growth, efficiency, and competitive advantage in the digital marketplace.',
    vision: 'Our vision is to be the trusted partner for businesses seeking digital transformation, delivering innovative solutions that exceed expectations and create lasting value.',
    ceo: 'Our CEO is Alex Dev, who leads Zimora Technologies with a vision for innovation and excellence in digital solutions. Under Alex\'s leadership, we continue to deliver cutting-edge technology solutions that help businesses thrive in the digital age.',
    'who is the ceo': 'Our CEO is Alex Dev, who leads Zimora Technologies with a vision for innovation and excellence in digital solutions. Under Alex\'s leadership, we continue to deliver cutting-edge technology solutions that help businesses thrive in the digital age.',
    services: 'We offer comprehensive IT services including Web Development, Web Application Development, Digital Marketing, Hosting & Domain Setup, E-commerce Solutions, and Maintenance & Support. Each service is tailored to meet your specific business needs.',
    'web development': 'We create business and corporate websites, company portfolio websites, real estate platforms, custom web systems, responsive and mobile-friendly designs, and website optimization and performance improvements.',
    'web app development': 'Our web application development includes custom web applications, admin and management panels, API development and integrations, custom software solutions, and system maintenance and upgrades.',
    'digital marketing': 'Our digital marketing services cover search engine optimization (SEO), social media marketing strategies, brand positioning and online presence, content marketing and planning, website traffic growth strategies, and performance analysis and reporting.',
    hosting: 'Our hosting and domain setup services include domain registration support, website hosting setup, SSL installation, email hosting (business emails), and server configuration & deployment.',
    domain: 'Our hosting and domain setup services include domain registration support, website hosting setup, SSL installation, email hosting (business emails), and server configuration & deployment.',
    'e-commerce': 'Our e-commerce solutions include custom e-commerce development, payment gateway integration, product catalog management, shopping cart & checkout optimization, and security and compliance.',
    ecommerce: 'Our e-commerce solutions include custom e-commerce development, payment gateway integration, product catalog management, shopping cart & checkout optimization, and security and compliance.',
    maintenance: 'Our maintenance and support services include regular website updates, bug fixing and improvements, performance monitoring, content updates, and 24/7 technical support.',
    support: 'Our maintenance and support services include regular website updates, bug fixing and improvements, performance monitoring, content updates, and 24/7 technical support.',
    technologies: 'We work with modern technologies including React, Angular, Vue.js, Node.js, Python, JavaScript, HTML5, CSS3, WordPress, PHP, MySQL, Git, Docker, AWS, and Google Cloud.',
    contact: 'You can reach us via email at info@zimoratech.co.ke, call us at +254 (117) 411-547.',
    location: 'located in Ruiru, Kiambu',
    email: 'You can email us at info@zimoratech.co.ke for general inquiries.',
    phone: 'You can call us at: +254 117 411 547.',
    hours: 'Our business hours are: Monday - Friday: 9:00 AM - 6:00 PM, Saturday: 10:00 AM - 2:00 PM, Sunday: Closed.',
    process: 'Our process starts with understanding your needs, followed by planning, development, testing, and deployment. We maintain transparent communication throughout the project.',
    pricing: 'Our pricing varies based on project complexity and requirements. We offer competitive rates and provide detailed quotes after understanding your specific needs. Contact us for a personalized quote.',
    'why choose': 'You should choose Zimora Technologies for our client-focused development approach, modern and scalable technologies, clean and user-friendly designs, transparent communication, and reliable support and maintenance.',
    hello: `${getRandomPattern('greetings')} Welcome to Zimora Technologies! I'm excited to help you explore our digital solutions. What brings you here today?`,
    hi: `${getRandomPattern('greetings')} Great to connect with you! I'm here to help you learn about our services. What's on your mind?`,
    hey: 'Hey there! I\'m glad you reached out. How can I assist you with your digital needs today?',
    'good morning': 'Good morning! I hope you\'re having a great start to your day. How can I help you with our tech solutions?',
    'good afternoon': 'Good afternoon! Thanks for stopping by. What can I help you with today?',
    thanks: `${getRandomPattern('casual')} You're very welcome! Is there anything else I can help you with?`,
    'thank you': 'My pleasure! I\'m always here to help. What else would you like to know?',
    bye: `${getRandomPattern('casual')} It was great chatting with you! Feel free to reach out anytime. Have a wonderful day!`,
    goodbye: 'Goodbye for now! I am here whenever you need assistance with your digital projects. Take care!',
    'see you': 'See you later! Don\'t hesitate to come back if you need more help.',
    'how are you': 'I am doing fantastic, thanks for asking! I am always excited to help people like you discover great tech solutions. How are you doing today?',
    reply: `Thank you so much for reaching out! I really appreciate you taking time to connect with Zimora Technologies. ${getRandomPattern('helpful')} What specific area can I assist you with today - web development, digital marketing, or perhaps our custom solutions?`,
  };

  function getRandomPattern(type: keyof typeof conversationPatterns): string {
    const patterns = conversationPatterns[type];
    if (!patterns || patterns.length === 0) return '';
    return patterns[Math.floor(Math.random() * patterns.length)];
  }

  function addPersonalityToResponse(baseResponse: string): string {
    const random = Math.random();
    let enhancedResponse = baseResponse;

    if (random < personality.enthusiasm) {
      const enthusiasm = getRandomPattern('enthusiasm');
      enhancedResponse = enthusiasm + ' ' + enhancedResponse;
    }

    if (random < personality.casualness) {
      const casual = getRandomPattern('casual');
      enhancedResponse = enhancedResponse + ' ' + casual;
    }

    return enhancedResponse;
  }

  function getThinkingDelay(messageLength: number): number {
    const baseDelay = 800;
    const complexityDelay = Math.min(messageLength * 50, 2000);
    const randomVariation = Math.random() * 1000;
    return baseDelay + complexityDelay + randomVariation;
  }

  function extractTopics(message: string): string[] {
    const topics: string[] = [];
    const topicKeywords: Record<string, string[]> = {
      'web development': ['web', 'website', 'development', 'design', 'frontend', 'backend'],
      'digital marketing': ['marketing', 'seo', 'social media', 'advertising', 'promotion'],
      'e-commerce': ['ecommerce', 'e-commerce', 'shop', 'store', 'payment', 'shopping'],
      'hosting': ['hosting', 'server', 'domain', 'ssl', 'email'],
      'mobile': ['mobile', 'app', 'ios', 'android'],
      'pricing': ['price', 'cost', 'pricing', 'budget', 'quote'],
      'contact': ['contact', 'reach', 'email', 'phone', 'call'],
    };

    const lowerMessage = message.toLowerCase();
    for (const [topic, keywords] of Object.entries(topicKeywords)) {
      if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
        topics.push(topic);
      }
    }

    return topics;
  }

  function updateConversationHistory(userMessage: string, botResponse: string) {
    conversationHistory.current.push({
      userMessage,
      botResponse,
      timestamp: new Date().toISOString(),
      topics: extractTopics(userMessage),
    });

    if (conversationHistory.current.length > 10) {
      conversationHistory.current.shift();
    }

    updateUserProfile(userMessage);
  }

  function updateUserProfile(message: string) {
    const topics = extractTopics(message);

    topics.forEach((topic) => {
      if (!userProfile.current.interests.includes(topic)) {
        userProfile.current.interests.push(topic);
      }
    });

    userProfile.current.previousTopics = [
      ...new Set([...userProfile.current.previousTopics, ...topics]),
    ];
    userProfile.current.lastInteraction = new Date().toISOString();
  }

  function generateFollowUpQuestion(currentTopics: string[]): string | null {
    const followUps: Record<string, string[]> = {
      'web development': [
        'What type of website are you looking to create?',
        'Do you have any specific design preferences in mind?',
        'What features would be most important for your website?',
      ],
      'digital marketing': [
        'What are your main marketing goals?',
        'Who is your target audience?',
        'Have you tried any marketing strategies before?',
      ],
      'e-commerce': [
        'What kind of products will you be selling?',
        'Do you need help with payment gateway integration?',
        'How many products do you plan to list?',
      ],
      pricing: [
        "What's your approximate budget for this project?",
        'Would you like a detailed breakdown of our pricing?',
        'Are you looking for a one-time project or ongoing support?',
      ],
    };

    for (const topic of currentTopics) {
      if (followUps[topic]) {
        const questions = followUps[topic];
        return questions[Math.floor(Math.random() * questions.length)];
      }
    }

    return null;
  }

  function generateResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();

    if (conversationHistory.current.length > 0) {
      const lastTopic =
        userProfile.current.previousTopics[
          userProfile.current.previousTopics.length - 1
        ];
      if (lastTopic && extractTopics(userMessage).length === 0) {
        return (
          getRandomPattern('acknowledgments') +
          ', let me tell you more about ' +
          lastTopic +
          '. ' +
          getDetailedTopicInfo(lastTopic)
        );
      }
    }

    for (const [key, response] of Object.entries(knowledgeBase)) {
      if (message.includes(key)) {
        return response;
      }
    }

    if (message.includes('what') && message.includes('service')) {
      return (
        getRandomPattern('helpful') +
        ' We offer six main services: Web Development (business websites, real estate platforms, custom web systems), Web Application Development (custom web applications, admin panels, APIs), Digital Marketing (SEO, social media, brand positioning), Hosting & Domain Setup (domain registration, SSL, server configuration), E-commerce Solutions (custom development, payment integration), and Maintenance & Support (24/7 technical support, updates). Which service interests you most?'
      );
    }

    if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
      return (
        getRandomPattern('thinking') +
        ' Our pricing varies based on project complexity and requirements. We provide customized quotes after understanding your specific needs. ' +
        getRandomPattern('enthusiasm') +
        ' Would you like to schedule a consultation to discuss your project?'
      );
    }

    if (message.includes('project') || message.includes('portfolio') || message.includes('work')) {
      return (
        getRandomPattern('enthusiasm') +
        " We've worked on various projects including business websites, real estate platforms, e-commerce solutions, mobile applications, web applications, and digital marketing campaigns. You can view some of our featured projects on the Our Projects page. What type of project are you interested in?"
      );
    }

    if (message.includes('help') || message.includes('support') || message.includes('assist')) {
      return (
        getRandomPattern('helpful') +
        " I'm here to help! I can answer questions about our services (web development, web application development, digital marketing, hosting, e-commerce solutions), company details, contact information, technologies we use, and much more. What specific information would you like to know?"
      );
    }

    if (message.includes('confused') || message.includes('lost') || message.includes('unclear')) {
      return (
        getRandomPattern('acknowledgments') +
        ', I completely understand. Let me make this simpler for you. ' +
        getRandomPattern('helpful') +
        ' What specific challenge are you trying to solve with your business?'
      );
    }

    if (message.includes('excited') || message.includes('interested') || message.includes('looking forward')) {
      return (
        getRandomPattern('enthusiasm') +
        " I'm excited too! It sounds like you're ready to start something amazing. " +
        getRandomPattern('helpful') +
        ' What service caught your attention?'
      );
    }

    const acknowledgment = getRandomPattern('acknowledgments');
    const helpful = getRandomPattern('helpful');
    return (
      acknowledgment +
      ", I'm not sure I understand completely. " +
      helpful +
      ' I can help you with information about our services (web development, web application development, digital marketing, hosting, e-commerce solutions), company details, contact information, and technologies we use. Could you please rephrase your question or tell me more about what you\'re looking for?'
    );
  }

  function getDetailedTopicInfo(topic: string): string {
    const topicDetails: Record<string, string> = {
      'web development':
        'We create stunning, responsive websites that not only look great but also perform exceptionally well. Our team focuses on user experience and conversion optimization.',
      'digital marketing':
        'Our marketing strategies are data-driven and tailored to your specific industry. We help you reach your target audience effectively.',
      'e-commerce':
        'We build secure, scalable online stores with seamless payment integration and inventory management systems.',
      hosting:
        'We provide reliable hosting solutions with 99.9% uptime, daily backups, and excellent technical support.',
      pricing:
        'We offer flexible pricing models to fit different budgets, from startups to enterprise-level solutions.',
    };

    return (
      topicDetails[topic] ||
      'Let me provide you with more detailed information about this area.'
    );
  }

  // Voice features
  useEffect(() => {
    if (typeof window !== 'undefined') {
      speechSynthesisRef.current = window.speechSynthesis;
      
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        speechRecognitionRef.current = new SpeechRecognition();
        
        speechRecognitionRef.current.continuous = false;
        speechRecognitionRef.current.interimResults = true;
        speechRecognitionRef.current.maxAlternatives = 3;
        speechRecognitionRef.current.lang = 'en-US';

        let finalTranscript = '';
        let interimTranscript = '';

        speechRecognitionRef.current.onstart = () => {
          setIsListening(true);
          finalTranscript = '';
          interimTranscript = '';
        };

        speechRecognitionRef.current.onresult = (event: any) => {
          interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;

            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';

              if (isQuestion(finalTranscript.trim())) {
                setInput(finalTranscript.trim());
                speechRecognitionRef.current?.stop();
                setTimeout(() => handleSendMessage(), 500);
              }
            } else {
              interimTranscript += transcript;
            }
          }

          setInput(finalTranscript + interimTranscript);
        };

        speechRecognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);

          if (event.error === 'no-speech') {
            showNotification('No speech detected. Please try speaking clearly.');
          } else if (event.error === 'not-allowed') {
            showNotification('Microphone access denied. Please allow microphone access to use voice input.');
          } else if (event.error === 'network') {
            showNotification('Network error. Please check your internet connection.');
          } else if (event.error === 'audio-capture') {
            showNotification('No microphone found. Please connect a microphone.');
          }
        };

        speechRecognitionRef.current.onend = () => {
          setIsListening(false);

          if (finalTranscript.trim() && !isQuestion(finalTranscript.trim())) {
            setInput(finalTranscript.trim());
            setTimeout(() => handleSendMessage(), 500);
          }
        };
      }
    }

    return () => {
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
    };
  }, []);

  function isQuestion(text: string): boolean {
    const questionWords = [
      'what',
      'who',
      'where',
      'when',
      'why',
      'how',
      'which',
      'whose',
      'whom',
      'are',
      'is',
      'do',
      'does',
      'did',
      'can',
      'could',
      'would',
      'should',
      'will',
      'may',
      'might',
      'must',
      'shall',
      'tell',
      'explain',
      'describe',
      'show',
      'give',
      'help',
      'need',
      'want',
      'looking for',
      'searching',
      '?',
      '¿',
      '؟',
    ];

    const lowerText = text.toLowerCase();
    return (
      lowerText.includes('?') ||
      lowerText.includes('¿') ||
      lowerText.includes('؟') ||
      questionWords.some((word) => lowerText.includes(word))
    );
  }

  function toggleVoiceInput() {
    if (!speechRecognitionRef.current) {
      showNotification('Voice input is not supported in your browser.');
      return;
    }

    if (isListening) {
      speechRecognitionRef.current.stop();
    } else {
      speechRecognitionRef.current.start();
    }
  }

  function speakText(text: string) {
    if (!speechSynthesisRef.current || !voiceEnabled) return;

    speechSynthesisRef.current.cancel();

    const cleanText = cleanTextForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 0.9;

    const voices = speechSynthesisRef.current.getVoices();
    const femaleVoice =
      voices.find(
        (voice) =>
          voice.name.includes('Female') ||
          voice.name.includes('Samantha') ||
          voice.name.includes('Karen') ||
          voice.name.includes('Google US English Female')
      ) ||
      voices.find((voice) => voice.lang.includes('en')) ||
      voices[0];

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      showNotification('Voice synthesis error. Please try again.');
    };

    speechSynthesisRef.current.speak(utterance);
  }

  function cleanTextForSpeech(text: string): string {
    return text
      .replace(/Zimora Technologies/g, 'Zimora Technologies')
      .replace(/Alex Dev/g, 'Alex Dev')
      .replace(/\bCEO\b/g, 'C E O')
      .replace(/\bi\.e\.\b/g, 'that is')
      .replace(/\be\.g\.\b/g, 'for example')
      .replace(/\bIT\b/g, 'I T')
      .replace(/\bSEO\b/g, 'S E O')
      .replace(/\bUI\b/g, 'U I')
      .replace(/\bUX\b/g, 'U X')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function showNotification(message: string) {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  }

  function toggleVoice() {
    setVoiceEnabled(!voiceEnabled);
    showNotification(voiceEnabled ? 'Voice responses disabled' : 'Voice responses enabled');
    
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
    }
  }

  function toggleMode() {
    setConversationMode(conversationMode === 'voice' ? 'text' : 'voice');
    showNotification(`Switched to ${conversationMode === 'voice' ? 'text' : 'voice'} mode`);
  }

  function handleSendMessage() {
    const message = input.trim();
    if (!message) return;

    const newMessage: Message = {
      id: messages.length,
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);

    const thinkingDelay = getThinkingDelay(message.length);

    setTimeout(() => {
      setIsTyping(false);
      const response = generateResponse(message);
      const enhancedResponse = addPersonalityToResponse(response);

      const botMessage: Message = {
        id: messages.length + 1,
        text: enhancedResponse,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
      updateConversationHistory(message, enhancedResponse);

      const topics = extractTopics(message);
      if (Math.random() < 0.3 && topics.length > 0) {
        setTimeout(() => {
          const followUp = generateFollowUpQuestion(topics);
          if (followUp) {
            const followUpWithPersonality = getRandomPattern('thinking') + ' ' + followUp;
            const followUpMessage: Message = {
              id: messages.length + 2,
              text: followUpWithPersonality,
              sender: 'bot',
              timestamp: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, followUpMessage]);
          }
        }, 2000 + Math.random() * 2000);
      }

      if (conversationMode === 'voice' && voiceEnabled && !isSpeaking) {
        setTimeout(() => speakText(enhancedResponse), 500);
      }
    }, thinkingDelay);
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <>
      {/* Chatbox */}
      <div className={`chatbox-container ${isOpen ? 'active' : ''}`} id="chatbox">
        <div className="chatbox-header">
          <div className="chatbox-header-content">
            <div className="chatbox-avatar">
              <i className="fa-solid fa-robot"></i>
            </div>
            <div className="chatbox-info">
              <h4>Zimora Assistant</h4>
              <span className="chatbox-status">Online</span>
            </div>
          </div>
          <div className="chatbox-header-controls">
            <button
              className="mode-toggle-btn"
              onClick={toggleMode}
              title={conversationMode === 'voice' ? 'Voice mode - Click to switch to text' : 'Text mode - Click to switch to voice'}
            >
              <i className={`fa-solid ${conversationMode === 'voice' ? 'fa-microphone' : 'fa-keyboard'}`}></i>
            </button>
            {conversationMode === 'voice' && (
              <button
                className="voice-toggle-btn"
                onClick={toggleVoice}
                title={voiceEnabled ? 'Voice enabled - Click to disable' : 'Voice disabled - Click to enable'}
              >
                <i className={`fa-solid ${voiceEnabled ? 'fa-volume-up' : 'fa-volume-mute'}`}></i>
              </button>
            )}
            <button className="chatbox-close" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-times"></i>
            </button>
          </div>
        </div>

        <div className="chatbox-messages" id="chatboxMessages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}-message`}>
              <div className="message-avatar">
                <i className={`fa-solid ${message.sender === 'bot' ? 'fa-robot' : 'fa-user'}`}></i>
              </div>
              <div className="message-content">
                <p>{message.text}</p>
                {message.sender === 'bot' && conversationMode === 'voice' && (
                  <button
                    className="message-voice-btn"
                    onClick={() => speakText(message.text)}
                    title="Listen to message"
                  >
                    <i className="fa-solid fa-volume-up"></i>
                  </button>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message bot-message typing-indicator">
              <div className="message-avatar">
                <i className="fa-solid fa-robot"></i>
              </div>
              <div className="message-content">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbox-input-container">
          <div className="chatbox-input-wrapper">
            <input
              type="text"
              id="chatboxInput"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={isListening ? '🎤 Listening... Speak clearly' : 'Type your message...'}
              disabled={isListening}
            />
            {conversationMode === 'voice' && (
              <button
                className="voice-button"
                onClick={toggleVoiceInput}
                title={isListening ? 'Stop recording' : 'Click to speak'}
              >
                <i className={`fa-solid ${isListening ? 'fa-stop' : 'fa-microphone'}`}></i>
              </button>
            )}
            <button id="chatboxSend" onClick={handleSendMessage}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Chatbox Toggle Button */}
      <button className="chatbox-toggle" id="chatboxToggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle chatbot">
        <i className="fa-solid fa-comments"></i>
      </button>

      {/* Notification */}
      {notification && (
        <div className="voice-notification" style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#ff4d00',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          zIndex: 100000,
          fontSize: '14px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          animation: 'slideInRight 0.3s ease-out',
        }}>
          {notification}
        </div>
      )}
    </>
  );
}
