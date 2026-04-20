import { PREVIEW_LIMIT } from './constants';

export function createDashboardRoute(path, params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (value.length > 0) {
        searchParams.set(key, value.join(','));
      }

      return;
    }

    if (value) {
      searchParams.set(key, value);
    }
  });

  const query = searchParams.toString();
  return query ? `${path}?${query}` : path;
}

export function uniqueValues(values = []) {
  return Array.from(new Set(values.filter(Boolean)));
}

export function createKey(value = '') {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function toPercent(value, total) {
  return total === 0 ? 0 : Math.round((value / total) * 100);
}

export function formatPreview(values, limit = PREVIEW_LIMIT) {
  const unique = uniqueValues(values);

  if (unique.length === 0) {
    return '';
  }

  return unique.length <= limit
    ? unique.join(', ')
    : `${unique.slice(0, limit).join(', ')} +${unique.length - limit} more`;
}

export function sortByNewest(left, right) {
  return new Date(right.timestamp) - new Date(left.timestamp);
}