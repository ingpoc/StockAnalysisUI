export const formatValue = (value, type) => {
  if (!value || value === '--' || value === 'NaN' || value === 'None') return '--';

  switch (type) {
    case 'currency': {
      const numValue = parseFloat(String(value).replace(/[₹,]/g, ''));
      if (isNaN(numValue)) return '--';
      
      // Format based on value range
      if (numValue >= 10000000) { // 1 Cr+
        return `₹${(numValue / 10000000).toFixed(2)}Cr`;
      } else if (numValue >= 100000) { // 1 L+
        return `₹${(numValue / 100000).toFixed(2)}L`;
      } else if (numValue >= 1000) { // 1K+
        return `₹${Math.round(numValue/1000)}K`;
      } else {
        return `₹${numValue.toFixed(2)}`;
      }
    }

    case 'percentage': {
      const numValue = parseFloat(String(value).replace(/[%,]/g, ''));
      if (isNaN(numValue)) return '--';
      // If it's a whole number, don't show decimals
      if (Number.isInteger(numValue)) {
        return `${numValue}%`;
      }
      return `${numValue.toFixed(1)}%`;
    }

    case 'number': {
      const numValue = parseFloat(String(value).replace(/,/g, ''));
      if (isNaN(numValue)) return '--';
      return new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 2,
        notation: 'compact'
      }).format(numValue);
    }

    case 'date':
      try {
        return new Date(value).toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch {
        return '--';
      }

    default:
      return value || '--';
  }
};

export const getGrowthClass = (value) => {
  if (!value || value === '--') return '';
  const numValue = parseFloat(String(value).replace(/[%,]/g, ''));
  if (isNaN(numValue)) return '';
  if (numValue > 0) return 'text-green-600 font-medium';
  if (numValue < 0) return 'text-red-600 font-medium';
  return '';
};

export const getRecommendationClass = (recommendation) => {
  if (!recommendation) return 'bg-gray-100 text-gray-800';
  
  switch (recommendation.toLowerCase()) {
    case 'buy':
    case 'strong buy':
    case 'strong performer':
      return 'bg-green-100 text-green-800';
    case 'sell':
    case 'strong sell':
      return 'bg-red-100 text-red-800';
    case 'hold':
    case 'neutral':
      return 'bg-yellow-100 text-yellow-800';
    case 'slowing down stock':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};