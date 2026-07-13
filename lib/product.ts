export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "AgentLedger",
  slug: "agentledger",
  tagline: "Cap and track AI-agent spend before finance is surprised.",
  description: "Log your agents and monthly budgets; get per-agent spend tracking and anomaly alerts. For engineering and finance leads deploying paid LLM agents and autonomous workflows.",
  toolTitle: "Track agent spend",
  resultLabel: "Spend report",
  ctaLabel: "Track",
  features: [
  "Per-agent budgets",
  "Spend alerts",
  "No heavy APM"
],
  inputs: [
  {
    "key": "agent",
    "label": "Agent name",
    "type": "input",
    "placeholder": "e.g. SupportBot"
  },
  {
    "key": "budget",
    "label": "Monthly budget (USD)",
    "type": "input",
    "placeholder": "e.g. 2000"
  },
  {
    "key": "spend",
    "label": "Spend so far (USD)",
    "type": "input",
    "placeholder": "e.g. 1500"
  }
] as InputField[],
  systemPrompt: "You are a finops assistant for AI teams. Given an agent name, monthly budget, and current spend, report utilization and flag budget risk.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "1 agent, $1k/mo tracked"
  },
  {
    "tier": "Pro",
    "price": "$39/mo",
    "desc": "10 agents, budget alerts"
  },
  {
    "tier": "Team",
    "price": "$89/mo",
    "desc": "Unlimited, finance export"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const name = inputs['agent'] || 'Agent'
  const budget = parseFloat(inputs['budget']) || 1000
  const spend = parseFloat(inputs['spend']) || 0
  const pct = budget > 0 ? Math.round(spend / budget * 100) : 0
  let out = 'AGENT SPEND - ' + name + '\n\n'
  out += 'Budget: $' + budget.toFixed(0) + '\n'
  out += 'Spend:  $' + spend.toFixed(0) + ' (' + pct + '%)\n'
  if (pct >= 90) out += 'ALERT: near or over budget.\n'
  else if (pct >= 70) out += 'WARN: watch this agent.\n'
  else out += 'OK: healthy.\n'
  out += '\n--- (Mock. Pro adds per-feature breakdown + anomaly alerts across agents.)'
  return out
}
}
