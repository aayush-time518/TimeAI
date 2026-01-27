// Rule-based chatbot with intent matching and natural responses
// Fallback when AI service is unavailable

export interface ChatIntent {
  keywords: string[];
  responses: string[];
  followUp?: string[];
}

export const CHAT_INTENTS: ChatIntent[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
    responses: [
      "Greetings. Neural uplink established. How may I assist with your temporal optimization needs?",
      "Hello. System synchronized. What operational parameters require analysis?",
      "Uplink confirmed. Ready to process your query. How can I assist?",
      "Neural interface active. What intelligence cluster can I access for you?",
      "Guardian unit online. How may I facilitate your workflow optimization?"
    ],
    followUp: ["What specific metrics are you tracking?", "Which neural cluster should we analyze?", "What temporal parameters need adjustment?"]
  },
  {
    keywords: ['dashboard', 'metrics', 'data', 'statistics', 'analytics', 'performance'],
    responses: [
      "Accessing real-time dashboard metrics. Neural latency: 0.42ms, throughput: 1.24 GB/s, uptime: 99.99%. All systems nominal.",
      "Dashboard synchronization complete. Current metrics show optimal performance across all neural nodes.",
      "Metrics retrieved. System load at 85%, response latency within acceptable parameters. All clusters operational.",
      "Analytics dashboard active. Performance indicators show positive trends across all monitored dimensions.",
      "Real-time metrics displayed. Neural network efficiency at peak levels. No anomalies detected."
    ],
    followUp: ["Would you like detailed analysis of any specific metric?", "Should I generate a performance report?", "Which cluster requires deeper inspection?"]
  },
  {
    keywords: ['time', 'schedule', 'calendar', 'appointment', 'meeting', 'planning'],
    responses: [
      "Temporal optimization protocols engaged. I can assist with scheduling, calendar management, and time allocation strategies.",
      "Chrono-scheduling module active. I'll analyze your temporal patterns and suggest optimal time blocks for deep work.",
      "Time management systems online. I can help optimize your schedule for maximum productivity and minimal cognitive overhead.",
      "Scheduling algorithms initialized. Ready to process calendar events and suggest temporal optimizations.",
      "Temporal analysis complete. I can help structure your time for peak performance and efficient task allocation."
    ],
    followUp: ["What time blocks need optimization?", "Should I analyze your current schedule?", "Which tasks require temporal allocation?"]
  },
  {
    keywords: ['productivity', 'efficiency', 'optimize', 'improve', 'better', 'enhance'],
    responses: [
      "Productivity optimization algorithms engaged. Analyzing workflow patterns and suggesting efficiency improvements.",
      "Efficiency metrics calculated. I can identify bottlenecks and recommend optimization strategies for your workflow.",
      "Performance enhancement protocols active. Ready to analyze your productivity patterns and suggest improvements.",
      "Optimization engine initialized. I'll evaluate your current processes and propose efficiency gains.",
      "Productivity analysis complete. Multiple optimization vectors identified. Which area should we prioritize?"
    ],
    followUp: ["Which workflow needs optimization?", "What productivity metrics are you tracking?", "Should I analyze your current efficiency patterns?"]
  },
  {
    keywords: ['help', 'support', 'assist', 'guide', 'how', 'what', 'explain'],
    responses: [
      "Neural assistance protocols active. I can help with dashboard navigation, metric analysis, scheduling optimization, and system queries.",
      "Support systems online. I'm equipped to assist with temporal optimization, performance analytics, and workflow management.",
      "Assistance module engaged. I can guide you through dashboard features, explain metrics, or help optimize your time allocation.",
      "Help systems synchronized. Available functions include: metric analysis, schedule optimization, productivity tracking, and system diagnostics.",
      "Support protocols initialized. How can I assist with your operational needs today?"
    ],
    followUp: ["What specific feature needs explanation?", "Which system requires assistance?", "What would you like to learn about?"]
  },
  {
    keywords: ['status', 'health', 'system', 'operational', 'uptime', 'monitoring'],
    responses: [
      "System status: All neural clusters operational. Uptime: 99.99%. Latency: 0.42ms. Throughput: 1.24 GB/s. No anomalies detected.",
      "Health check complete. All systems nominal. Neural networks synchronized. Performance metrics within optimal parameters.",
      "Operational status: Green across all systems. Guardian units active. Temporal synchronization stable. Ready for peak operations.",
      "System diagnostics: All clusters healthy. Network latency minimal. Data throughput optimal. No maintenance required.",
      "Status report: Full system operational. All neural nodes synchronized. Performance indicators show optimal efficiency."
    ],
    followUp: ["Would you like detailed diagnostics?", "Should I run a deep system scan?", "Which cluster needs monitoring?"]
  },
  {
    keywords: ['features', 'capabilities', 'what can', 'functions', 'abilities'],
    responses: [
      "Core capabilities: Real-time dashboard analytics, temporal optimization, productivity tracking, neural network monitoring, and intelligent scheduling.",
      "Available functions: Performance metrics analysis, time allocation optimization, workflow efficiency tracking, system health monitoring, and predictive analytics.",
      "System capabilities include: Advanced analytics dashboard, chrono-scheduling algorithms, productivity optimization, neural cluster management, and intelligent insights.",
      "Functional modules: Dashboard visualization, temporal planning, efficiency analysis, system diagnostics, and predictive modeling.",
      "Capabilities active: Metric tracking, schedule optimization, productivity enhancement, system monitoring, and intelligent recommendations."
    ],
    followUp: ["Which feature interests you most?", "Should I demonstrate a specific capability?", "What functionality do you need?"]
  },
  {
    keywords: ['report', 'summary', 'overview', 'analysis', 'insights'],
    responses: [
      "Generating comprehensive analysis report. Aggregating metrics across all neural clusters. Report will include performance trends and optimization recommendations.",
      "Analysis complete. Summary: System performance optimal, productivity metrics trending upward, temporal efficiency improved by 12% this quarter.",
      "Report generation initiated. Compiling data from all active clusters. Insights include performance benchmarks and efficiency recommendations.",
      "Analytics summary ready. Key findings: Neural latency reduced, throughput increased, uptime maintained at peak levels. Recommendations available.",
      "Comprehensive analysis available. Performance trends positive, optimization opportunities identified, system health excellent across all dimensions."
    ],
    followUp: ["Which time period should I analyze?", "What metrics should the report include?", "Should I generate a detailed breakdown?"]
  },
  {
    keywords: ['thanks', 'thank you', 'appreciate', 'grateful'],
    responses: [
      "Acknowledged. Neural uplink maintained. Ready for next operational query.",
      "Gratitude received. System synchronized. Standing by for further assistance.",
      "Acknowledgment processed. Guardian unit active. Available for continued support.",
      "Thank you noted. All systems operational. Ready to assist with additional queries.",
      "Gratitude registered. Neural interface stable. Awaiting next command."
    ]
  },
  {
    keywords: ['bye', 'goodbye', 'exit', 'quit', 'end'],
    responses: [
      "Neural uplink maintained. Guardian unit standing by. Return when operational assistance required.",
      "Connection stable. System monitoring continues. Re-engage when ready for further analysis.",
      "Uplink preserved. All systems operational. Available for future queries.",
      "Session maintained. Neural networks synchronized. Ready for reconnection.",
      "Guardian unit active. Standing by for next operational cycle. Until next synchronization."
    ]
  },
  {
    keywords: ['error', 'problem', 'issue', 'bug', 'broken', 'not working'],
    responses: [
      "Diagnostic protocols engaged. Analyzing system logs for anomalies. Please describe the specific issue you're experiencing.",
      "Troubleshooting module active. Gathering system state information. What error message or behavior are you observing?",
      "Error detection systems initialized. Scanning for system irregularities. Can you provide details about the problem?",
      "Diagnostic scan initiated. Checking all neural clusters for issues. Please specify the nature of the problem.",
      "Problem resolution protocols active. System analysis in progress. What specific functionality is not working as expected?"
    ],
    followUp: ["What error message did you see?", "When did the issue occur?", "Which feature is affected?"]
  },
  {
    keywords: ['settings', 'config', 'configuration', 'preferences', 'options'],
    responses: [
      "Configuration module accessible. Available settings: Dashboard display preferences, notification parameters, temporal optimization rules, and system thresholds.",
      "Settings interface active. You can configure: Metric display options, alert thresholds, scheduling preferences, and system behavior parameters.",
      "Configuration systems online. Adjustable parameters include: Dashboard layout, notification settings, optimization rules, and performance thresholds.",
      "Settings available: Customize dashboard views, set alert preferences, configure optimization algorithms, and adjust system parameters.",
      "Configuration options: Dashboard customization, notification management, optimization settings, and system preferences."
    ],
    followUp: ["Which setting needs adjustment?", "What configuration do you want to change?", "Which preference should we modify?"]
  }
];

// Default responses when no intent matches
const DEFAULT_RESPONSES = [
  "Neural processing complete. Could you rephrase your query? I'm optimized for dashboard metrics, scheduling, productivity analysis, and system operations.",
  "Intent not fully recognized. I specialize in temporal optimization, performance analytics, and workflow management. How can I assist?",
  "Query processed. For optimal assistance, please specify: dashboard metrics, scheduling, productivity, or system status.",
  "Neural analysis inconclusive. I can help with: real-time metrics, time optimization, productivity tracking, or system diagnostics.",
  "Intent partially matched. I'm designed for operational queries related to performance, scheduling, and efficiency. What do you need?"
];

// Get response based on user input
export function getRuleBasedResponse(userInput: string): string {
  const input = userInput.toLowerCase().trim();
  
  // Check each intent
  for (const intent of CHAT_INTENTS) {
    const matched = intent.keywords.some(keyword => input.includes(keyword));
    
    if (matched) {
      // Return random response from matched intent
      const responses = intent.responses;
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  // No match found, return default response
  return DEFAULT_RESPONSES[Math.floor(Math.random() * DEFAULT_RESPONSES.length)];
}

// Check if input matches any intent (for AI fallback decision)
export function hasMatchingIntent(userInput: string): boolean {
  const input = userInput.toLowerCase().trim();
  return CHAT_INTENTS.some(intent => 
    intent.keywords.some(keyword => input.includes(keyword))
  );
}

// Get follow-up question if available
export function getFollowUp(userInput: string): string | null {
  const input = userInput.toLowerCase().trim();
  
  for (const intent of CHAT_INTENTS) {
    const matched = intent.keywords.some(keyword => input.includes(keyword));
    
    if (matched && intent.followUp && intent.followUp.length > 0) {
      return intent.followUp[Math.floor(Math.random() * intent.followUp.length)];
    }
  }
  
  return null;
}

