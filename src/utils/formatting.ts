// =============================================
// GODTIDE: BASTION SEA - UI Formatting Utils
// =============================================
// Consistent number display AND color theming
// across the entire UI. Use these everywhere.
// =============================================

/**
 * Format a resource value with comma separators.
 * 1250 -> "1,250"
 * 30 -> "30"
 */
export function formatNumber(value: number): string {
  return Math.floor(value).toLocaleString();
}

/**
 * Format bounty in millions. Consistent across all screens.
 * 5000000 -> "5M"
 * 12500000 -> "12.5M"
 * 250000000 -> "250M"
 * 0 -> "0"
 */
export function formatBounty(value: number): string {
  if (value <= 0) return '0';
  const millions = value / 1_000_000;
  if (millions >= 1) {
    // Show decimal only if fractional part is significant
    return millions % 1 === 0 ? `${millions.toFixed(0)}M` : `${millions.toFixed(1).replace(/\.0$/, '')}M`;
  }
  // Sub-million bounties (rare/early game)
  return formatNumber(value);
}

/**
 * Format sovereigns for display. Always comma-separated.
 * 15000 -> "15,000"
 */
export function formatSovereigns(value: number): string {
  return formatNumber(value);
}

// =============================================
// MORALE COLOR THEMING
// =============================================
// Consistent morale colors everywhere. Thresholds:
//   >= 60: green (healthy)
//   >= 30: amber (warning)
//   >= 15: orange (critical)
//   < 15:  red (rebellion)
// =============================================

/** Morale bar background color (Tailwind class) */
export function getMoraleBarColor(morale: number): string {
  if (morale >= 60) return 'bg-green-500';
  if (morale >= 30) return 'bg-amber-500';
  if (morale >= 15) return 'bg-orange-500';
  return 'bg-red-500';
}

/** Morale text color (Tailwind class) */
export function getMoraleTextColor(morale: number): string {
  if (morale >= 60) return 'text-green-400';
  if (morale >= 30) return 'text-amber-400';
  if (morale >= 15) return 'text-orange-400';
  return 'text-crimson-400';
}

/** Morale status label */
export function getMoraleLabel(morale: number): string {
  if (morale >= 80) return 'DEVOTED';
  if (morale >= 60) return 'STABLE';
  if (morale >= 30) return 'RESTLESS';
  if (morale >= 15) return 'CIVIL UNREST';
  if (morale > 0) return 'REVOLT';
  return 'REBELLION';
}
