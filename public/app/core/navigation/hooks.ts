import { locationService } from '@grafana/runtime';
import { useLocation } from 'react-router-dom';

export type UseUrlParamsResult = [URLSearchParams, (params: Record<string, any>, replace?: boolean) => void];

/** @internal experimental */
export function useUrlParams(): UseUrlParamsResult {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const updateUrlParams = (params: Record<string, any>, replace?: boolean) => {
    if (replace) {
      locationService.replacePartial(params);
    } else {
      locationService.pushPartial(params);
    }
  };

  return [params, updateUrlParams];
}
