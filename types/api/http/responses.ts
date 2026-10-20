/** Standard JSON envelope returned by Portfolio Agent HTTP routes. */
import type { ApiResponseMetaData } from '@/types/api/shared/metadata';

export interface HttpResponse<T = unknown> {
    meta: ApiResponseMetaData;
    data: T;
}
